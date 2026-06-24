export type FormatOptions = {
  indentSize: number;
  wrapLines: boolean;
};

export type FormatResult = {
  ok: boolean;
  output: string;
  diagnostics: string[];
  changed: boolean;
};

const DEFAULT_OPTIONS: FormatOptions = {
  indentSize: 2,
  wrapLines: false
};

const PROTECTED_ENVIRONMENTS = new Set(["verbatim", "lstlisting", "minted"]);
const LIST_ENVIRONMENTS = new Set(["itemize", "enumerate", "description"]);

const beginPattern = /^\\begin\{([^}]+)\}/;
const endPattern = /^\\end\{([^}]+)\}/;

export function formatLatexSource(
  input: string,
  options: Partial<FormatOptions> = {}
): FormatResult {
  const settings = { ...DEFAULT_OPTIONS, ...options };
  const normalized = input.replace(/\r\n?/g, "\n").trim();
  const diagnostics = [
    "Best-effort formatter: advanced LaTeX formatting comes later."
  ];

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

  for (const rawLine of rawLines) {
    const line = rawLine.replace(/[ \t]+$/g, "");
    const trimmed = line.trim();

    if (!trimmed) {
      formattedLines.push("");
      continue;
    }

    if (protectedEnvironment) {
      formattedLines.push(line);
      if (trimmed === `\\end{${protectedEnvironment}}`) {
        protectedEnvironment = null;
      }
      continue;
    }

    const endMatch = trimmed.match(endPattern);
    if (endMatch) {
      depth = Math.max(0, depth - 1);
      const stackTop = environmentStack[environmentStack.length - 1];
      if (stackTop === endMatch[1]) {
        environmentStack.pop();
      }
    }

    const itemOffset =
      trimmed.startsWith("\\item") && isInsideList(environmentStack) ? 1 : 0;
    const indentDepth = Math.max(0, depth + itemOffset);
    formattedLines.push(`${" ".repeat(indentDepth * settings.indentSize)}${trimmed}`);

    const beginMatch = trimmed.match(beginPattern);
    if (beginMatch && !endMatch) {
      const environment = beginMatch[1];
      environmentStack.push(environment);

      if (PROTECTED_ENVIRONMENTS.has(environment)) {
        protectedEnvironment = environment;
      } else {
        depth += 1;
      }
    }
  }

  const output = settings.wrapLines
    ? formattedLines.map((line) => softWrapLine(line, 100)).join("\n")
    : formattedLines.join("\n");

  return {
    ok: true,
    output,
    diagnostics,
    changed: output !== normalized
  };
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
