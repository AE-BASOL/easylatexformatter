import { describe, expect, it } from "vitest";
import { formatLatexSource } from "../lib/formatter";

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
    const result = formatLatexSource("\\section{Intro}   \nText   ");

    expect(result.output).toBe("\\section{Intro}\nText");
    expect(result.changed).toBe(true);
  });

  it("reports empty input without output", () => {
    const result = formatLatexSource("   ");

    expect(result.ok).toBe(false);
    expect(result.output).toBe("");
    expect(result.diagnostics[0]).toMatch(/Paste LaTeX source/);
  });

  it("preserves verbatim-like block content", () => {
    const result = formatLatexSource(String.raw`\begin{document}
\begin{verbatim}
    keep   this   spacing
\end{verbatim}
\end{document}`);

    expect(result.output).toContain("    keep   this   spacing");
  });

  it("includes best-effort limitation diagnostics", () => {
    const result = formatLatexSource("\\begin{document}\nText\n\\end{document}");

    expect(result.diagnostics).toContain(
      "Best-effort formatter: advanced LaTeX formatting comes later."
    );
  });
});
