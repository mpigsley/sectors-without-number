export default {
  en: {
    value: 'en',
    name: 'English',
  },
  de: {
    value: 'de',
    name: 'German',
    localeFetch: () => import(/* webpackChunkName: "german" */ 'lang/de.json'),
  },
  fr: {
    value: 'fr',
    name: 'French',
    localeFetch: () => import(/* webpackChunkName: "french" */ 'lang/fr.json'),
  },
  es: {
    value: 'es',
    name: 'Spanish',
    localeFetch: () => import(/* webpackChunkName: "spanish" */ 'lang/es.json'),
  },
  he: {
    value: 'he',
    name: 'Hebrew',
    localeFetch: () => import(/* webpackChunkName: "hebrew" */ 'lang/he.json'),
  },
  ru: {
    value: 'ru',
    name: 'Russian',
    localeFetch: () => import(/* webpackChunkName: "russian" */ 'lang/ru.json'),
  },
  sr: {
    value: 'sr',
    name: 'Latin',
    localeFetch: () => import(/* webpackChunkName: "latin" */ 'lang/sr.json'),
  },
  sv: {
    value: 'sv',
    name: 'Swedish',
    localeFetch: () => import(/* webpackChunkName: "swedish" */ 'lang/sv.json'),
  },
  pl: {
    value: 'pl',
    name: 'Polish',
    localeFetch: () => import(/* webpackChunkName: "polish" */ 'lang/pl.json'),
  },
};
