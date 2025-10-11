// Utility to convert a page match string to a regex pattern
// Page match string is of our own format where * is a wildcard and , separates options
function pageMatchToRegex(pageMatch: string) {
  // RegExp.escape escapes all special characters, while * and , are translated to regex equivalents
  // * -> \* -> .*
  // , -> \x2c -> |
  // Wrapped in ^(...)$ to match the entire path
  return `^(${RegExp.escape(pageMatch).replaceAll('\\*', '.*').replaceAll('\\x2c', '|')})$`;
}

export { pageMatchToRegex };
