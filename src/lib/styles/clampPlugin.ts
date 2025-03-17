import plugin from 'tailwindcss/plugin';

const propertyMap: Record<string, string> = {
  p: 'padding',
  m: 'margin',
  w: 'width',
  h: 'height',
  text: 'fontSize',
  gap: 'gap',
};

interface PluginContext {
  matchUtilities: (
    utilities: Record<string, (value: string) => Record<string, string>>,
    options?: { values?: Record<string, string> },
  ) => void;
  theme: (path: string) => unknown;
}

function clampPlugin({ matchUtilities, theme }: PluginContext) {
  matchUtilities(
    {
      clamp(value: string) {
        const split = value.split('-');
        if (split.length !== 5) return {};

        const [minBreakpoint, maxBreakpoint, propertyKey, minValue, maxValue] =
          split;

        console.log('parsed values', {
          minBreakpoint,
          maxBreakpoint,
          propertyKey,
          minValue,
          maxValue,
        });

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

        const breakpoints = theme('screens') as Record<
          string,
          string | undefined
        >;
        const startRange = breakpoints[minBreakpoint];
        const endRange = breakpoints[maxBreakpoint];

        console.log('breakpoints', { startRange, endRange });

        if (!startRange || !endRange) return {};

        // Handle fontSize differently as it might be an object
        let startValue: string;
        let endValue: string;

        if (property === 'fontSize') {
          const fontSizes = theme('fontSize') as Record<
            string,
            string | [string, object]
          >;

          const startFont = fontSizes[minValue];
          const endFont = fontSizes[maxValue];

          console.log('fontSize values', { startFont, endFont });

          if (!startFont || !endFont) return {};

          // Handle both string and array formats for fontSize
          startValue = typeof startFont === 'string' ? startFont : startFont[0];
          endValue = typeof endFont === 'string' ? endFont : endFont[0];
        } else {
          const values = theme(property) as Record<string, string | undefined>;
          startValue = values[minValue] || '';
          endValue = values[maxValue] || '';
          if (!startValue || !endValue) return {};
        }

        console.log('property values', { startValue, endValue });

        if (!startValue || !endValue) return {};

        // Extract clean values (only numbers and units)
        const extractValue = (val: string) => {
          return val.replace(/\/\*.*?\*\//g, '').trim();
        };

        const cleanStartValue = extractValue(startValue);
        const cleanEndValue = extractValue(endValue);
        const cleanStartRange = extractValue(startRange);
        const cleanEndRange = extractValue(endRange);

        // Extract the numeric values for calculation
        const getNumericValue = (val: string) => {
          const numMatch = val.match(/^(\d*\.?\d+)/);
          return numMatch ? Number.parseFloat(numMatch[0]) : 0;
        };

        // Extract units
        const getUnit = (val: string) => {
          const unitMatch = val.match(/([a-z]+|%)/i);
          return unitMatch ? unitMatch[0] : '';
        };

        // Calculate the unitless difference for viewport range
        const startRangeNum = getNumericValue(cleanStartRange);
        const endRangeNum = getNumericValue(cleanEndRange);
        const viewportDiff = endRangeNum - startRangeNum;

        // Construct the properly formatted clamp function with unitless division
        const clampValue = `clamp(${cleanStartValue}, calc(${cleanStartValue} + ((${cleanEndValue} - ${cleanStartValue}) * (100vw - ${cleanStartRange}) / ${viewportDiff})), ${cleanEndValue})`;

        console.log('final value', {
          property,
          value: clampValue,
        });

        return {
          [property]: clampValue,
        };
      },
    },
    { values: {} },
  );
}

export default plugin(clampPlugin);
