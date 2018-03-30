const fs = require('fs');
const prettier = require('prettier');
const forEach = require('lodash/forEach');
const map = require('lodash/map');

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
};
const TRANSLATIONS = {
  ENGLISH: {},
  FRENCH: {},
  GERMAN: {},
  SWEDISH: {},
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
