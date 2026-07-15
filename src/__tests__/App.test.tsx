import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App";

describe("App", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined)
      }
    });
    URL.createObjectURL = vi.fn(() => "blob:formatted");
    URL.revokeObjectURL = vi.fn();
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:formatted");
    vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => undefined);
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => undefined);
  });

  it("loads sample, formats, enables copy and download, then clears", async () => {
    render(<App />);

    const input = screen.getByLabelText("LaTeX source input");
    const output = screen.getByLabelText("Formatted LaTeX output");
    const copy = screen.getByRole("button", { name: "Copy" });
    const download = screen.getByRole("button", { name: "Download" });

    expect(copy).toBeDisabled();
    expect(download).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Sample" }));
    expect((input as HTMLTextAreaElement).value).toContain(String.raw`\begin{document}`);
    expect((input as HTMLTextAreaElement).value).toContain(String.raw`\item`);

    fireEvent.click(screen.getByRole("button", { name: "Format" }));
    expect(output).toHaveTextContent("\\begin{document}");
    expect(screen.getAllByText("Formatted").length).toBeGreaterThan(0);

    expect(copy).not.toBeDisabled();
    expect(download).not.toBeDisabled();

    fireEvent.click(copy);
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });

    fireEvent.click(download);
    expect(URL.createObjectURL).toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(input).toHaveValue("");
    expect(output).toHaveTextContent("Formatted output will appear here.");
  });

  it("shows diagnostics for empty input", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Format" }));

    expect(screen.getByText("Check diagnostics")).toBeInTheDocument();
    expect(screen.getByText("Paste LaTeX source before formatting.")).toBeInTheDocument();
  });

  it("applies indent size option", () => {
    render(<App />);
    const input = screen.getByLabelText("LaTeX source input");
    fireEvent.change(input, { target: { value: "\\begin{document}\n\\begin{itemize}\n\\item First\n\\end{itemize}\n\\end{document}" } });

    const select = screen.getByLabelText("Indent size:", { selector: "select" });
    fireEvent.change(select, { target: { value: "4" } });
    
    fireEvent.click(screen.getByRole("button", { name: "Format" }));
    
    const output = screen.getByLabelText("Formatted LaTeX output");
    expect(output.textContent).toContain("    \\item First");
  });

  it("applies wrap lines option", () => {
    render(<App />);
    const input = screen.getByLabelText("LaTeX source input");
    
    // Create a very long line > 100 chars
    const longLine = "word ".repeat(30).trim();
    fireEvent.change(input, { target: { value: "\\begin{document}\n" + longLine + "\n\\end{document}" } });

    const checkbox = screen.getByLabelText("Wrap long lines");
    fireEvent.click(checkbox);
    
    fireEvent.click(screen.getByRole("button", { name: "Format" }));
    
    const output = screen.getByLabelText("Formatted LaTeX output");
    // Should be wrapped to multiple lines
    const lines = output.textContent?.split("\n") || [];
    expect(lines.length).toBeGreaterThan(3);
  });

  it("applies unwrap (merge) lines option", () => {
    render(<App />);
    const input = screen.getByLabelText("LaTeX source input");
    fireEvent.change(input, { target: { value: "\\begin{document}\nThis is line one.\nThis is line two.\n\\end{document}" } });

    const checkbox = screen.getByLabelText("Merge (unwrap) lines");
    fireEvent.click(checkbox);
    
    fireEvent.click(screen.getByRole("button", { name: "Format" }));
    
    const output = screen.getByLabelText("Formatted LaTeX output");
    expect(output.textContent).toContain("  This is line one. This is line two.");
  });
});
