export default {
  de: {
    value: 'de',
    name: 'German',
    localeFetch: () => import('react-intl/locale-data/de'),
  },
  fr: {
    value: 'fr',
    name: 'French',
    localeFetch: () => import('react-intl/locale-data/fr'),
  },
  en: {
    value: 'en',
    name: 'English',
    localeFetch: () => import('react-intl/locale-data/en'),
  },
  he: {
    value: 'he',
    name: 'Hebrew',
    localeFetch: () => import('react-intl/locale-data/he'),
  },
  sv: {
    value: 'sv',
    name: 'Swedish',
    localeFetch: () => import('react-intl/locale-data/sv'),
  },
};
