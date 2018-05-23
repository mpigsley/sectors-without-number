export default {
  de: {
    value: 'de',
    name: 'German',
    localeFetch: () =>
      Promise.all([import('lang/de'), import('react-intl/locale-data/de')]),
  },
  fr: {
    value: 'fr',
    name: 'French',
    localeFetch: () =>
      Promise.all([import('lang/fr'), import('react-intl/locale-data/fr')]),
  },
  en: {
    value: 'en',
    name: 'English',
    localeFetch: () =>
      Promise.all([import('lang/en'), import('react-intl/locale-data/en')]),
  },
  es: {
    value: 'es',
    name: 'Spanish',
    localeFetch: () =>
      Promise.all([import('lang/es'), import('react-intl/locale-data/es')]),
  },
  he: {
    value: 'he',
    name: 'Hebrew',
    localeFetch: () =>
      Promise.all([import('lang/he'), import('react-intl/locale-data/he')]),
  },
  ru: {
    value: 'ru',
    name: 'Russian',
    localeFetch: () =>
      Promise.all([import('lang/ru'), import('react-intl/locale-data/ru')]),
  },
  sr: {
    value: 'sr',
    name: 'Latin',
    localeFetch: () =>
      Promise.all([import('lang/sr'), import('react-intl/locale-data/sr')]),
  },
  sv: {
    value: 'sv',
    name: 'Swedish',
    localeFetch: () =>
      Promise.all([import('lang/sv'), import('react-intl/locale-data/sv')]),
  },
};
