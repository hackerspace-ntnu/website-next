/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions & import("@trivago/prettier-plugin-sort-imports").PluginConfig} */
export default {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  jsxSingleQuote: true,
  importOrder: [
    '^[./]',
    '^@/(lib|styles)/(.*)$',
    '^@/hooks/(.*)$',
    '^@/components/(.*)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  tailwindFunctions: ['cx', 'cva'],
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
};
