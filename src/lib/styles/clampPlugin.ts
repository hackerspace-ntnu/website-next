import plugin from 'tailwindcss/plugin';

type PluginContext = {
  matchUtilities: (
    utilities: Record<string, (value: string) => Record<string, string>>,
    options?: { values?: Record<string, string> },
  ) => void;
  theme: (path: string) => unknown;
};

const propertyMap: Record<string, string[]> = {
  text: ['fontSize', 'lineHeight'],
  w: ['width'],
  h: ['height'],
  'max-w': ['maxWidth'],
  'max-h': ['maxHeight'],
  'min-w': ['minWidth'],
  'min-h': ['minHeight'],
  p: ['padding'],
  px: ['paddingLeft', 'paddingRight'],
  py: ['paddingTop', 'paddingBottom'],
  pt: ['paddingTop'],
  pb: ['paddingBottom'],
  pl: ['paddingLeft'],
  pr: ['paddingRight'],
  m: ['margin'],
  mx: ['marginLeft', 'marginRight'],
  my: ['marginTop', 'marginBottom'],
  mt: ['marginTop'],
  mb: ['marginBottom'],
  ml: ['marginLeft'],
  mr: ['marginRight'],
  gap: ['gap'],
};

function parseClampValue(value: string) {
  const match = value.match(
    /^([^-]+)-([^/]+)\/([^-]+)(?:-([^/]*)(?:\/([^-]*))?)?$/,
  );

  if (!match) return null;

  const [
    ,
    propertyKey,
    minValue,
    maxValue,
    minBreakpointRaw = 'sm',
    maxBreakpointRaw = 'xl',
  ] = match;

  const minBreakpoint = minBreakpointRaw === '' ? 'sm' : minBreakpointRaw;
  const maxBreakpoint = maxBreakpointRaw === '' ? 'xl' : maxBreakpointRaw;

  return {
    propertyKey,
    minValue,
    maxValue,
    minBreakpoint,
    maxBreakpoint,
  };
}

function generateClamp(
  minValueRem: string,
  maxValueRem: string,
  minBreakpointRem: string,
  maxBreakpointRem: string,
) {
  const minSizeRemValue = Number.parseFloat(minValueRem);
  const maxSizeRemValue = Number.parseFloat(maxValueRem);
  const minBreakpointRemValue = Number.parseFloat(minBreakpointRem);
  const maxBreakpointRemValue = Number.parseFloat(maxBreakpointRem);

  const slope =
    (maxSizeRemValue - minSizeRemValue) /
    (maxBreakpointRemValue - minBreakpointRemValue);

  const preferredValue = `${minSizeRemValue}rem + ${slope.toFixed(
    5,
  )} * (100vw - ${minBreakpointRemValue}rem)`;

  const minValue = Math.min(minSizeRemValue, maxSizeRemValue);
  const maxValue = Math.max(minSizeRemValue, maxSizeRemValue);

  return `clamp(${minValue}rem, calc(${preferredValue}), ${maxValue}rem)`;
}

function clampPlugin({ matchUtilities, theme }: PluginContext) {
  const spacing = theme('spacing') as Record<string, string>;
  const fontSizeTheme = theme('fontSize') as Record<
    string,
    [string, { lineHeight: string }]
  >;
  const breakpoints = theme('screens') as Record<string, string>;

  const cleanThemeObject = <T extends Record<string, unknown>>(
    obj: T,
  ): Omit<T, '__CSS_VALUES__'> => {
    const { __CSS_VALUES__, ...rest } = obj;
    return rest;
  };

  const cleanSpacing = cleanThemeObject(spacing);
  const cleanFontSizeTheme = cleanThemeObject(fontSizeTheme);
  const cleanBreakpoints = cleanThemeObject(breakpoints);

  matchUtilities(
    {
      clamp(value: string): Record<string, string> {
        const parsedValue = parseClampValue(value);
        if (!parsedValue) return {};

        const {
          propertyKey,
          minValue,
          maxValue,
          minBreakpoint,
          maxBreakpoint,
        } = parsedValue;

        if (
          !minBreakpoint ||
          !maxBreakpoint ||
          !propertyKey ||
          !minValue ||
          !maxValue
        )
          return {};

        const cssProperties = propertyMap[propertyKey] || [];

        if (propertyKey === 'text') {
          const fontSizeMin = cleanFontSizeTheme[minValue]?.[0];
          const fontSizeMax = cleanFontSizeTheme[maxValue]?.[0];
          const lineHeightMin = cleanFontSizeTheme[minValue]?.[1]?.lineHeight;
          const lineHeightMax = cleanFontSizeTheme[maxValue]?.[1]?.lineHeight;
          const minBreakpointRem = cleanBreakpoints[minBreakpoint];
          const maxBreakpointRem = cleanBreakpoints[maxBreakpoint];

          if (
            !fontSizeMin ||
            !fontSizeMax ||
            !lineHeightMin ||
            !lineHeightMax ||
            !minBreakpointRem ||
            !maxBreakpointRem
          ) {
            return {};
          }

          const fontSizeClamp = generateClamp(
            fontSizeMin,
            fontSizeMax,
            minBreakpointRem,
            maxBreakpointRem,
          );

          const lineHeightClamp = generateClamp(
            lineHeightMin,
            lineHeightMax,
            minBreakpointRem,
            maxBreakpointRem,
          );

          return {
            fontSize: fontSizeClamp,
            lineHeight: lineHeightClamp,
          };
        }
        const minValueRem = cleanSpacing[minValue];
        const maxValueRem = cleanSpacing[maxValue];
        const minBreakpointRem = cleanBreakpoints[minBreakpoint];
        const maxBreakpointRem = cleanBreakpoints[maxBreakpoint];

        if (
          !minValueRem ||
          !maxValueRem ||
          !minBreakpointRem ||
          !maxBreakpointRem
        ) {
          return {};
        }

        const clampValue = generateClamp(
          minValueRem,
          maxValueRem,
          minBreakpointRem,
          maxBreakpointRem,
        );

        const result: Record<string, string> = {};
        for (const cssProperty of cssProperties) {
          result[cssProperty] = clampValue;
        }
        return result;
      },
    },
    { values: {} },
  );
}

export default plugin(clampPlugin);
