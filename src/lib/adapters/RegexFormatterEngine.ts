import { FormatterEngine, FormatOptions, FormatResult } from "../types";

export const SOFT_BREAK = '↵';

const PROTECTED_ENVIRONMENTS = new Set([
  "verbatim", "Verbatim", "lstlisting", "minted", 
  "BVerbatim", "LVerbatim", "alltt", 
  "tikzpicture", "pgfpicture", "forest"
]);

const LIST_ENVIRONMENTS = new Set(["itemize", "enumerate", "description"]);

const MATH_ENVIRONMENTS = new Set([
  "equation", "equation*", "align", "align*", "gather", "gather*",
  "multline", "multline*", "eqnarray", "eqnarray*"
]);

const beginPattern = /^\\begin\{([^}]+)\}/;
const endPattern = /^\\end\{([^}]+)\}/;

export class RegexFormatterEngine implements FormatterEngine {
  format(input: string, options: FormatOptions): FormatResult {
    // Join soft-break lines (Shift+Enter marker ↵ before \n) into single lines
    const joined = input.replace(new RegExp(SOFT_BREAK + "\\n", "g"), " ");
    // Collapse multiple consecutive blank lines into a single blank line
    const normalized = joined.replace(/\r\n?/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
    
    const diagnostics: string[] = [];

    if (!normalized) {
      return {
        ok: false,
        output: "",
        diagnostics: ["Paste LaTeX source before formatting."],
        changed: false
      };
    }

    const formattedLines: string[] = [];
    const rawLines = normalized.split("\n");
    let depth = 0;
    let protectedEnvironment: string | null = null;
    const environmentStack: string[] = [];
    let inPreamble = true;
    let inVirtualMath = false;

    for (const rawLine of rawLines) {
      const line = rawLine.replace(/[ \t]+$/g, ""); // Strip trailing whitespace
      const trimmed = line.trim();

      if (!trimmed) {
        formattedLines.push("");
        continue;
      }

      // Comment lines: keep at current depth, don't parse for environments
      if (trimmed.startsWith("%")) {
        const currentIndent = inPreamble ? 0 : depth;
        formattedLines.push(`${" ".repeat(currentIndent * options.indentSize)}${trimmed}`);
        continue;
      }

      if (protectedEnvironment) {
        formattedLines.push(line);
        if (trimmed === `\\end{${protectedEnvironment}}`) {
          protectedEnvironment = null;
          depth = Math.max(0, depth - 1);
          const stackTop = environmentStack[environmentStack.length - 1];
          if (stackTop === protectedEnvironment) {
            environmentStack.pop();
          }
        }
        continue;
      }

      let isEnd = false;
      let endEnvName = "";

      const endMatch = trimmed.match(endPattern);
      if (endMatch) {
        isEnd = true;
        endEnvName = endMatch[1];
      } else if (trimmed === "\\]" && inVirtualMath) {
        isEnd = true;
        endEnvName = "\\]";
      }

      if (isEnd) {
        depth = Math.max(0, depth - 1);
        const stackTop = environmentStack[environmentStack.length - 1];
        if (stackTop === endEnvName || (endEnvName === "\\]" && stackTop === "\\[")) {
          environmentStack.pop();
        }
        if (endEnvName === "\\]") {
          inVirtualMath = false;
        }
      }

      const itemOffset = trimmed.startsWith("\\item") && isInsideList(environmentStack) ? 1 : 0;
      
      // Preamble logic: keep lines at depth 0 until we see \begin{document}
      let indentDepth = Math.max(0, depth + itemOffset);
      if (inPreamble) {
        if (trimmed === "\\begin{document}") {
          inPreamble = false;
          indentDepth = 0;
        } else {
          indentDepth = 0;
        }
      }

      let shouldMerge = false;
      if (options.unwrapLines && !inVirtualMath && !protectedEnvironment && !isInsideMath(environmentStack)) {
        const currentIsStructural = trimmed.match(/^\\(begin|end|section|subsection|subsubsection|chapter|part|paragraph|subparagraph|\[|\]|item)/);
        if (!currentIsStructural && !trimmed.startsWith("%")) {
          const lastIndex = formattedLines.length - 1;
          if (lastIndex >= 0) {
            const lastFormatted = formattedLines[lastIndex].trim();
            const prevIsStructural = lastFormatted.match(/^\\(begin|end|section|subsection|subsubsection|chapter|part|paragraph|subparagraph|\[|\])/);
            if (lastFormatted && !lastFormatted.endsWith("\\\\") && !prevIsStructural) {
              shouldMerge = true;
            }
          }
        }
      }

      if (shouldMerge) {
        formattedLines[formattedLines.length - 1] += ` ${trimmed}`;
      } else {
        formattedLines.push(`${" ".repeat(indentDepth * options.indentSize)}${trimmed}`);
      }

      let isBegin = false;
      let beginEnvName = "";

      const beginMatch = trimmed.match(beginPattern);
      if (beginMatch && !endMatch) {
        isBegin = true;
        beginEnvName = beginMatch[1];
      } else if (trimmed === "\\[" && !endMatch && !inVirtualMath) {
        isBegin = true;
        beginEnvName = "\\[";
      }

      if (isBegin) {
        environmentStack.push(beginEnvName);
        if (beginEnvName === "\\[") {
          inVirtualMath = true;
          depth += 1;
        } else if (PROTECTED_ENVIRONMENTS.has(beginEnvName)) {
          protectedEnvironment = beginEnvName;
          depth += 1;
        } else {
          depth += 1;
        }
      }
    }

    if (depth !== 0 || environmentStack.length > 0 || inVirtualMath || protectedEnvironment) {
      diagnostics.push("Warning: unmatched environment block detected — check nesting.");
    }

    diagnostics.push("Formatted with deterministic LaTeX rules.");

    const output = options.wrapLines
      ? formattedLines.map((line) => softWrapLine(line, 100)).join("\n")
      : formattedLines.join("\n");

    return {
      ok: true,
      output,
      diagnostics,
      changed: output !== joined.replace(/\r\n?/g, "\n").trim()
    };
  }
}

function isInsideMath(environmentStack: string[]): boolean {
  return environmentStack.some((env) => MATH_ENVIRONMENTS.has(env));
}

function isInsideList(environmentStack: string[]): boolean {
  return environmentStack.some((environment) => LIST_ENVIRONMENTS.has(environment));
}

function softWrapLine(line: string, width: number): string {
  if (line.length <= width || line.trim().startsWith("%")) {
    return line;
  }

  const indent = line.match(/^\s*/)?.[0] ?? "";
  const words = line.trim().split(/\s+/);
  const wrapped: string[] = [];
  let current = indent;

  for (const word of words) {
    const next = current.trim() ? `${current} ${word}` : `${indent}${word}`;
    if (next.length > width && current.trim()) {
      wrapped.push(current);
      current = `${indent}${word}`;
    } else {
      current = next;
    }
  }

  if (current.trim()) {
    wrapped.push(current);
  }

  return wrapped.join("\n");
}
