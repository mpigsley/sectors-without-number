export default {
  en: {
    value: 'en',
    name: 'English',
    localeFetch: () => import('react-intl/locale-data/en'),
  },
  fr: {
    value: 'fr',
    name: 'French',
    localeFetch: () => import('react-intl/locale-data/fr'),
  },
  de: {
    value: 'de',
    name: 'German',
    localeFetch: () => import('react-intl/locale-data/de'),
  },
  sv: {
    value: 'sv',
    name: 'Swedish',
    localeFetch: () => import('react-intl/locale-data/sv'),
  },
};
