import { useMemo, useState } from "react";
import { formatLatexSource, SOFT_BREAK } from "./lib/formatter";

const sampleLatex = String.raw`\documentclass{article}
\begin{document}
\section{Sample}
\begin{itemize}
\item First point
\item Second point
\end{itemize}
\[
E = mc^2
\]
\end{document}`;

type StatusKind = "idle" | "success" | "info" | "warning" | "error";

export default function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [diagnostics, setDiagnostics] = useState<string[]>([
    "Best-effort formatter: advanced LaTeX formatting comes later."
  ]);
  const [status, setStatus] = useState("Ready");
  const [statusKind, setStatusKind] = useState<StatusKind>("idle");

  const hasOutput = output.trim().length > 0;

  const outputMeta = useMemo(() => {
    if (!hasOutput) {
      return "No formatted output yet";
    }

    const lineCount = output.split("\n").length;
    return `${lineCount} line${lineCount === 1 ? "" : "s"}`;
  }, [hasOutput, output]);

  function handleFormat() {
    const result = formatLatexSource(input);
    setDiagnostics(result.diagnostics);

    if (!result.ok) {
      setOutput("");
      setStatus("Check diagnostics");
      setStatusKind("error");
      return;
    }

    setOutput(result.output);
    setStatus(result.changed ? "Formatted" : "No changes");
    setStatusKind(result.changed ? "success" : "info");
  }

  async function handleCopy() {
    if (!hasOutput) {
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      setStatus("Copied");
      setStatusKind("success");
    } catch {
      setStatus("Check diagnostics");
      setStatusKind("error");
      setDiagnostics(["Clipboard copy failed. Select the output and copy manually."]);
    }
  }

  function handleDownload() {
    if (!hasOutput) {
      return;
    }

    const blob = new Blob([output], { type: "text/x-tex;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "formatted.tex";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    setStatus("Downloaded");
    setStatusKind("success");
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setDiagnostics(["Best-effort formatter: advanced LaTeX formatting comes later."]);
    setStatus("Ready");
    setStatusKind("idle");
  }

  function handleSoftBreakKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      const el = event.currentTarget;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const before = input.slice(0, start);
      const after = input.slice(end);
      const inserted = SOFT_BREAK + "\n";
      setInput(before + inserted + after);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + inserted.length;
      });
    }
  }

  function handleSample() {
    setInput(sampleLatex);
    setOutput("");
    setDiagnostics(["Sample loaded. Format to see best-effort indentation."]);
    setStatus("Sample loaded");
    setStatusKind("info");
  }

  return (
    <main className="app-shell">
      <section className="intro" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">LaTeX formatter</p>
          <h1 id="page-title">Easy LaTeX Formatter</h1>
        </div>
        <p className="intro-copy">
          Paste LaTeX source, format it with simple deterministic rules, then copy
          or download the result.
        </p>
      </section>

      <section className="toolbar" aria-label="Formatter actions">
        <button className="button button-primary" type="button" onClick={handleFormat}>
          Format
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={handleCopy}
          disabled={!hasOutput}
        >
          Copy
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={handleDownload}
          disabled={!hasOutput}
        >
          Download
        </button>
        <button className="button button-quiet" type="button" onClick={handleClear}>
          Clear
        </button>
        <button className="button button-quiet" type="button" onClick={handleSample}>
          Sample
        </button>
        <div className={`status status-${statusKind}`} role="status" aria-live="polite">
          {status}
        </div>
      </section>

      <section className="panel" aria-labelledby="input-title">
        <div className="panel-header">
          <h2 id="input-title">Input</h2>
          <span>{input.length} characters</span>
        </div>
        <textarea
          className="source-area"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleSoftBreakKeyDown}
          spellCheck={false}
          placeholder="Paste LaTeX source here… (Shift+Enter = soft break ↵, joined on format)"
          aria-label="LaTeX source input"
        />
      </section>

      <section className="panel" aria-labelledby="output-title">
        <div className="panel-header">
          <h2 id="output-title">Output</h2>
          <span>{outputMeta}</span>
        </div>
        <pre className="output-area" aria-label="Formatted LaTeX output">
          {output || "Formatted output will appear here."}
        </pre>
      </section>

      <section className="diagnostics" aria-labelledby="diagnostics-title">
        <h2 id="diagnostics-title">Diagnostics</h2>
        <ul>
          {diagnostics.map((diagnostic) => (
            <li key={diagnostic}>{diagnostic}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
