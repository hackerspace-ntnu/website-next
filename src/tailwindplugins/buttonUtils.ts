import { PluginAPI, ThemeConfig } from 'tailwindcss/types/config';

interface TailwindColors {
  [key: string]: {
    [key: number]: string;
  };
}

const buttonUtils = ({ addUtilities, theme }: PluginAPI) => {
  const boxShadowUtilities = {} as ThemeConfig;

  // Get the colors defined in your Tailwind CSS configuration
  const colors = theme('colors', {}) as TailwindColors;

  // Generate boxShadow utility classes
  for (const colorName in colors) {
    const className = `.btn-${colorName}`;
    boxShadowUtilities[className] = {
      'postition': 'relative',
      'background-color': colors[colorName][600],
      'box-shadow': `0 8px 0 0 ${colors[colorName][800]}`,
    };
    boxShadowUtilities[`${className}-hover`] = {
      'background-color': colors[colorName][700],
    };
    boxShadowUtilities[`${className}-active`] = {
      'top': '4px',
      'background-color': colors[colorName][700],
      'box-shadow': `0 4px 0 0 ${colors[colorName][800]}`,
    };
  }

  // Define your plugin configuration with the 'variants' property
  addUtilities(boxShadowUtilities);
};

export default buttonUtils;