export type FormatOptions = {
  indentSize: number;
  wrapLines: boolean;
  unwrapLines: boolean;
};

export type FormatResult = {
  ok: boolean;
  output: string;
  diagnostics: string[];
  changed: boolean;
};

export interface FormatterEngine {
  format(input: string, options: FormatOptions): FormatResult;
}
