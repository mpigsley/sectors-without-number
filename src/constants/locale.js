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
  he: {
    value: 'he',
    name: 'Hebrew',
    localeFetch: () =>
      Promise.all([import('lang/he'), import('react-intl/locale-data/he')]),
  },
  sv: {
    value: 'sv',
    name: 'Swedish',
    localeFetch: () =>
      Promise.all([import('lang/sv'), import('react-intl/locale-data/sv')]),
  },
};
