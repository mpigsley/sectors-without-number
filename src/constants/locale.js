export default {
  en: {
    value: 'en',
    name: 'English',
  },
  de: {
    value: 'de',
    name: 'German',
    localeFetch: () =>
      Promise.all([
        import(/* webpackChunkName: "german" */ 'lang/de'),
        import(/* webpackChunkName: "german-locale" */ 'react-intl/locale-data/de'),
      ]),
  },
  fr: {
    value: 'fr',
    name: 'French',
    localeFetch: () =>
      Promise.all([
        import(/* webpackChunkName: "french" */ 'lang/fr'),
        import(/* webpackChunkName: "french-locale" */ 'react-intl/locale-data/fr'),
      ]),
  },
  es: {
    value: 'es',
    name: 'Spanish',
    localeFetch: () =>
      Promise.all([
        import(/* webpackChunkName: "spanish" */ 'lang/es'),
        import(/* webpackChunkName: "spanish-locale" */ 'react-intl/locale-data/es'),
      ]),
  },
  he: {
    value: 'he',
    name: 'Hebrew',
    localeFetch: () =>
      Promise.all([
        import(/* webpackChunkName: "hebrew" */ 'lang/he'),
        import(/* webpackChunkName: "hebrew-locale" */ 'react-intl/locale-data/he'),
      ]),
  },
  ru: {
    value: 'ru',
    name: 'Russian',
    localeFetch: () =>
      Promise.all([
        import(/* webpackChunkName: "russian" */ 'lang/ru'),
        import(/* webpackChunkName: "russian-locale" */ 'react-intl/locale-data/ru'),
      ]),
  },
  sr: {
    value: 'sr',
    name: 'Latin',
    localeFetch: () =>
      Promise.all([
        import(/* webpackChunkName: "latin" */ 'lang/sr'),
        import(/* webpackChunkName: "latin-locale" */ 'react-intl/locale-data/sr'),
      ]),
  },
  sv: {
    value: 'sv',
    name: 'Swedish',
    localeFetch: () =>
      Promise.all([
        import(/* webpackChunkName: "swedish" */ 'lang/sv'),
        import(/* webpackChunkName: "swedish-locale" */ 'react-intl/locale-data/sv'),
      ]),
  },
};
