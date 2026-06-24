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
    expect(screen.getByText("Formatted")).toBeInTheDocument();

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
});
