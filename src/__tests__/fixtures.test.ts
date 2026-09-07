import { describe, expect, it } from "vitest";
import { formatLatexSource } from "../lib/formatter";

const fixtures = [
  {
    name: "Full document with preamble, math block, list, and verbatim blocks",
    input: `\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}
\\section{Test}
\\begin{itemize}
\\item A point
\\item Another point
\\end{itemize}
\\begin{verbatim}
code   is
protected
\\end{verbatim}
\\[
x = 1
\\]
\\end{document}`,
    expected: `\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}
  \\section{Test}
  \\begin{itemize}
      \\item A point
      \\item Another point
  \\end{itemize}
  \\begin{verbatim}
code   is
protected
\\end{verbatim}
  \\[
    x = 1
  \\]
\\end{document}`
  },
  {
    name: "Nested lists with comments",
    input: `\\begin{document}
\\begin{enumerate}
\\item Outer
% Comment
\\begin{itemize}
\\item Inner
\\end{itemize}
\\end{enumerate}
\\end{document}`,
    expected: `\\begin{document}
  \\begin{enumerate}
      \\item Outer
    % Comment
    \\begin{itemize}
        \\item Inner
    \\end{itemize}
  \\end{enumerate}
\\end{document}`
  },
  {
    name: "Unmatched blocks trigger warnings",
    input: `\\begin{document}
\\begin{itemize}
\\item No end`,
    expected: `\\begin{document}
  \\begin{itemize}
      \\item No end`
  }
];

describe("Formatter Fixtures", () => {
  for (const fixture of fixtures) {
    it(`formats "${fixture.name}" correctly`, () => {
      const result = formatLatexSource(fixture.input, { indentSize: 2, wrapLines: false });
      expect(result.output).toBe(fixture.expected);
      if (fixture.name === "Unmatched blocks trigger warnings") {
        expect(result.diagnostics).toContain("Warning: unmatched environment block detected — check nesting.");
      } else {
        expect(result.diagnostics).toContain("Formatted with deterministic LaTeX rules.");
      }
    });
  }
});
