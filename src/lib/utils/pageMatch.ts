import escapeStringRegexp from 'escape-string-regexp';

/**
 * Utility to convert a page match string to a regex pattern
 * Page match string is of our own format where * is a wildcard and , separates options
 * @param pageMatch string to escape
 * @returns escaped string
 */
function pageMatchToRegex(pageMatch: string) {
  // escapeStringRegexp escapes all special characters, while * and , are translated to regex equivalents
  // * -> \* -> .*
  // , -> \x2c -> |
  // Wrapped in ^(...)$ to match the entire path
  // TODO: Change to using RegExp.escape when it bacomes a part of the LTS version of Node.js
  return `^(${escapeStringRegexp(pageMatch).replaceAll('\\*', '.*').replaceAll(',', '|')})$`;
}

export { pageMatchToRegex };
