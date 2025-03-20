import plugin from 'tailwindcss/plugin';

type PluginContext = {
  matchUtilities: (
    utilities: Record<string, (value: string) => Record<string, string>>,
    options?: { values?: Record<string, string> },
  ) => void;
  theme: (path: string) => unknown;
};

const propertyMap: Record<string, string> = {
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  w: 'width',
  h: 'height',
  text: 'fontSize',
  gap: 'gap',
};

const themePropertyMap: Record<string, string> = {
  p: 'spacing',
  pt: 'spacing',
  pr: 'spacing',
  pb: 'spacing',
  pl: 'spacing',
  m: 'spacing',
  mt: 'spacing',
  mr: 'spacing',
  mb: 'spacing',
  ml: 'spacing',
  w: 'spacing',
  h: 'spacing',
  text: 'fontSize',
  gap: 'spacing',
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

  const preferredValue = `${minSizeRemValue}rem + ${slope.toFixed(5)} * (100vw - ${minBreakpointRemValue}rem)`;

  const minValue = Math.min(minSizeRemValue, maxSizeRemValue);
  const maxValue = Math.max(minSizeRemValue, maxSizeRemValue);

  return `clamp(${minValue}rem, calc(${preferredValue}), ${maxValue}rem)`;
}

function clampPlugin({ matchUtilities, theme }: PluginContext) {
  matchUtilities(
    {
      clamp(value: string) {
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

        const property = propertyMap[propertyKey];
        if (!property) return {};

        const themeProperty = themePropertyMap[propertyKey];
        if (!themeProperty) return {};

        const values = theme(themeProperty) as Record<
          string,
          string | undefined
        >;
        const minValueRem =
          typeof values[minValue] === 'string'
            ? values[minValue]
            : values[minValue]?.[0];

        const maxValueRem =
          typeof values[maxValue] === 'string'
            ? values[maxValue]
            : values[maxValue]?.[0];

        const breakpoints = theme('screens') as Record<
          string,
          string | undefined
        >;
        const minBreakpointRem = breakpoints[minBreakpoint];
        const maxBreakpointRem = breakpoints[maxBreakpoint];

        if (
          !minValueRem ||
          !maxValueRem ||
          !minBreakpointRem ||
          !maxBreakpointRem
        )
          return {};

        const clampValue = generateClamp(
          minValueRem,
          maxValueRem,
          minBreakpointRem,
          maxBreakpointRem,
        );

        return {
          [property]: clampValue,
        };
      },
    },
    { values: {} },
  );
}

export default plugin(clampPlugin);
