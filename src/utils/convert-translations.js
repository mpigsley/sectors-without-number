const fs = require('fs');
const { forEach, map } = require('lodash');
const prettier = require('prettier');

const ExportedFile = require('../../Sectors Without Number Translations.json');

const convertKey = key => key.toUpperCase().trim();
const convertTranslation = str =>
  str
    .replace('{singular noun}', '{entity}')
    .replace('{plural noun}', '{entities}')
    .replace('{number}', '{num}');
const LOCALE_BY_LANG = {
  ENGLISH: 'en',
  FRENCH: 'fr',
  GERMAN: 'de',
  SWEDISH: 'sv',
  HEBREW: 'he',
  LATIN: 'sr',
  SPANISH: 'es',
  RUSSIAN: 'ru',
};
const TRANSLATIONS = {
  ENGLISH: {},
  FRENCH: {},
  GERMAN: {},
  SWEDISH: {},
  HEBREW: {},
  LATIN: {},
  SPANISH: {},
  RUSSIAN: {},
};

// Compile objects
forEach(ExportedFile, list =>
  forEach(list, (translations, key) =>
    forEach(translations, (translation, language) => {
      const langKey = convertKey(language || '');
      if (TRANSLATIONS[langKey]) {
        TRANSLATIONS[langKey][key] = convertTranslation(translation);
      }
    }),
  ),
);

// Write objects
Promise.all(
  map(
    TRANSLATIONS,
    (obj, lang) =>
      new Promise((resolve, reject) => {
        fs.writeFile(
          `./src/lang/${LOCALE_BY_LANG[lang]}.json`,
          prettier.format(JSON.stringify(obj), { parser: 'json' }),
          'utf8',
          err => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          },
        );
      }),
  ),
)
  .then(() => {
    console.log('Complete!');
  })
  .catch(console.error);
