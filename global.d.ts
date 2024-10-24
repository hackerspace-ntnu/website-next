// Use type safe message keys with `next-intl`
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
type Messages = typeof import('./messages/en.json');
// eslint-disable-next-line @typescript-eslint/no-empty-interface
declare interface IntlMessages extends Messages {}
