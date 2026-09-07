import { describe, expect, it } from "vitest";
import { formatLatexSource, SOFT_BREAK } from "../lib/formatter";

describe("formatLatexSource", () => {
  it("indents nested document and list environments", () => {
    const result = formatLatexSource(String.raw`\begin{document}
\begin{itemize}
\item First
\item Second
\end{itemize}
\end{document}`);

    expect(result.ok).toBe(true);
    expect(result.output).toContain(String.raw`  \begin{itemize}`);
    expect(result.output).toContain(String.raw`    \item First`);
    expect(result.output).toContain(String.raw`\end{document}`);
  });

  it("cleans trailing whitespace", () => {
    const result = formatLatexSource("\\begin{document}\n\\section{Intro}   \nText   \n\\end{document}");
    expect(result.output).toContain("\\section{Intro}\n  Text");
    expect(result.changed).toBe(true);
  });

  it("reports empty input without output", () => {
    const result = formatLatexSource("   ");
    expect(result.ok).toBe(false);
    expect(result.output).toBe("");
    expect(result.diagnostics[0]).toMatch(/Paste LaTeX source/);
  });

  it("preserves verbatim-like block content and tikzpicture", () => {
    const result = formatLatexSource(String.raw`\begin{document}
\begin{verbatim}
    keep   this   spacing
\end{verbatim}
\begin{tikzpicture}
  \draw (0,0) -- (1,1);
\end{tikzpicture}
\end{document}`);

    expect(result.output).toContain("    keep   this   spacing");
    expect(result.output).toContain("  \\draw (0,0) -- (1,1);");
  });

  it("joins soft-break lines (Shift+Enter marker) into a single line", () => {
    const input = `\\begin{document}\nsender encapsulates a secret${SOFT_BREAK}\nusing the receiver's public key\n\\end{document}`;
    const result = formatLatexSource(input);

    expect(result.ok).toBe(true);
    expect(result.output).toContain("  sender encapsulates a secret using the receiver's public key");
  });

  it("preserves hard line breaks (regular Enter) across soft-break join pass", () => {
    const input = `\\begin{document}\nfirst line\nsecond line\n\\end{document}`;
    const result = formatLatexSource(input);

    expect(result.output).toContain("  first line");
    expect(result.output).toContain("  second line");
  });

  it("includes deterministic rules diagnostic on success", () => {
    const result = formatLatexSource("\\begin{document}\nText\n\\end{document}");
    expect(result.diagnostics).toContain("Formatted with deterministic LaTeX rules.");
  });

  it("indents display math environments", () => {
    const result = formatLatexSource(String.raw`\begin{document}
\begin{equation}
E = mc^2
\end{equation}
\[
a^2 + b^2 = c^2
\]
\end{document}`);
    expect(result.output).toContain(String.raw`  \begin{equation}`);
    expect(result.output).toContain(String.raw`    E = mc^2`);
    expect(result.output).toContain(String.raw`  \end{equation}`);
    expect(result.output).toContain(String.raw`  \[`);
    expect(result.output).toContain(String.raw`    a^2 + b^2 = c^2`);
    expect(result.output).toContain(String.raw`  \]`);
  });

  it("handles comment lines correctly", () => {
    const result = formatLatexSource(String.raw`\begin{document}
\begin{itemize}
% This is a comment
\item Item
\end{itemize}
\end{document}`);
    expect(result.output).toContain(String.raw`  % This is a comment`);
  });

  it("collapses multiple consecutive blank lines", () => {
    const result = formatLatexSource("\\begin{document}\nLine 1\n\n\n\nLine 2\n\\end{document}");
    expect(result.output).toContain("  Line 1\n\n  Line 2");
  });

  it("keeps preamble lines at depth 0", () => {
    const result = formatLatexSource(String.raw`\documentclass{article}
\usepackage{amsmath}

\begin{document}
\section{Intro}
\end{document}`);
    expect(result.output).toContain(`\\usepackage{amsmath}`);
    // section intro is inside document, depth 1
    expect(result.output).toContain(`  \\section{Intro}`);
  });

  it("detects unmatched environment blocks", () => {
    const result = formatLatexSource("\\begin{document}\n\\begin{itemize}\n\\item incomplete");
    expect(result.diagnostics).toContain("Warning: unmatched environment block detected — check nesting.");
  });
});
