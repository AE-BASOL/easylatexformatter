import { FormatOptions, FormatResult, FormatterEngine } from "./types";
import { RegexFormatterEngine } from "./adapters/RegexFormatterEngine";

export const SOFT_BREAK = '↵';

const DEFAULT_OPTIONS: FormatOptions = {
  indentSize: 2,
  wrapLines: false,
  unwrapLines: false
};

// The application uses an adapter pattern for the formatting engine.
// This allows us to swap RegexFormatterEngine with a full AST parser in the future
// without having to rewrite any UI or shell code.
let defaultEngine: FormatterEngine | null = null;

export function formatLatexSource(
  input: string,
  options: Partial<FormatOptions> = {}
): FormatResult {
  const settings = { ...DEFAULT_OPTIONS, ...options };
  
  if (!defaultEngine) {
    defaultEngine = new RegexFormatterEngine();
  }

  return defaultEngine.format(input, settings);
}

// Re-export shared types from this facade so existing code doesn't break
export type { FormatOptions, FormatResult, FormatterEngine };
