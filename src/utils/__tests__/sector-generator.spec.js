import SectorGenerator from '../sector-generator';

const testSystems = {
  '0107': {
    name: 'Reonen',
    planets: {
      tebeisdiri: {
        name: 'Tebeisdiri',
        tags: ['dyingRace', 'revanchists'],
        techLevel: 'TL1',
        atmosphere: 'invasive',
        temperature: 'variableCold',
        biosphere: 'humanMiscible',
        population: 'billions',
      },
    },
    key: '0107',
    location: { x: 2, y: 8 },
  },
  '0708': {
    name: 'Anusle',
    planets: {
      isusat: {
        name: 'Isusat',
        tags: ['tyranny', 'robots'],
        techLevel: 'TL0',
        atmosphere: 'breathable',
        temperature: 'frozen',
        biosphere: 'microbial',
        population: 'severalMillion',
      },
    },
    key: '0708',
    location: { x: 8, y: 9 },
  },
  '0609': {
    name: 'Laedoninza',
    planets: {
      gegesodi: {
        name: 'Gegesodi',
        tags: ['tradeHub', 'psionicsAcademy'],
        techLevel: 'TL4+',
        atmosphere: 'breathable',
        temperature: 'temperate',
        biosphere: 'immiscible',
        population: 'hundredsOfMillions',
      },
    },
    key: '0609',
    location: { x: 7, y: 10 },
  },
  '0300': {
    name: 'Soince',
    planets: {
      mageabe: {
        name: 'Mageabe',
        tags: ['theocracy', 'mandarinate'],
        techLevel: 'TL4',
        atmosphere: 'thick',
        temperature: 'frozen',
        biosphere: 'remnant',
        population: 'hundredsOfMillions',
      },
    },
    key: '0300',
    location: { x: 4, y: 1 },
  },
  '0308': {
    name: 'Beorerrius',
    planets: {
      orxeri: {
        name: 'Orxeri',
        tags: ['shackledWorld', 'feralWorld'],
        techLevel: 'TL4',
        atmosphere: 'breathable',
        temperature: 'variableWarm',
        biosphere: 'microbial',
        population: 'lessThanMillion',
      },
    },
    key: '0308',
    location: { x: 4, y: 9 },
  },
  '0503': {
    name: 'Soarreor',
    planets: {
      reanso: {
        name: 'Reanso',
        tags: ['pleasureWorld', 'psionicsWorship'],
        techLevel: 'TL4',
        atmosphere: 'breathable',
        temperature: 'variableCold',
        biosphere: 'humanMiscible',
        population: 'lessThanMillion',
      },
      vebied: {
        name: 'Vebied',
        tags: ['holyWar', 'cyborgs'],
        techLevel: 'TL3',
        atmosphere: 'corrosiveInvasive',
        temperature: 'temperate',
        biosphere: 'microbial',
        population: 'lessThanMillion',
      },
    },
    key: '0503',
    location: { x: 6, y: 4 },
  },
  '0600': {
    name: 'Enesriange',
    planets: {
      vequceveve: {
        name: 'Vequceveve',
        tags: ['psionicsAcademy', 'terraformFailure'],
        techLevel: 'TL2',
        atmosphere: 'breathable',
        temperature: 'cold',
        biosphere: 'humanMiscible',
        population: 'lessThanMillion',
      },
      ribeis: {
        name: 'Ribeis',
        tags: ['coldWar', 'localSpecialty'],
        techLevel: 'TL3',
        atmosphere: 'corrosiveInvasive',
        temperature: 'variableCold',
        biosphere: 'humanMiscible',
        population: 'outpost',
      },
    },
    key: '0600',
    location: { x: 7, y: 1 },
  },
  '0009': {
    name: 'Anrala',
    planets: {
      ralasoatre: {
        name: 'Ralasoatre',
        tags: ['utopia', 'mandarinate'],
        techLevel: 'TL4',
        atmosphere: 'thick',
        temperature: 'cold',
        biosphere: 'none',
        population: 'outpost',
      },
    },
    key: '0009',
    location: { x: 1, y: 10 },
  },
  '0508': {
    name: 'Arveisrien',
    planets: {
      arxeesvexe: {
        name: 'Arxeesvexe',
        tags: ['doomedWorld', 'feralWorld'],
        techLevel: 'TL1',
        atmosphere: 'inert',
        temperature: 'temperate',
        biosphere: 'none',
        population: 'severalMillion',
      },
      aresen: {
        name: 'Aresen',
        tags: ['badlandsWorld', 'sectarians'],
        techLevel: 'TL2',
        atmosphere: 'thick',
        temperature: 'temperate',
        biosphere: 'microbial',
        population: 'lessThanMillion',
      },
      bicegeeror: {
        name: 'Bicegeeror',
        tags: ['pretechCultists', 'fallenHegemon'],
        techLevel: 'TL5',
        atmosphere: 'breathable',
        temperature: 'temperate',
        biosphere: 'hybrid',
        population: 'severalMillion',
      },
    },
    key: '0508',
    location: { x: 6, y: 9 },
  },
  '0608': {
    name: 'Gerive',
    planets: {
      tezaeratbi: {
        name: 'Tezaeratbi',
        tags: ['forbiddenTech', 'ritualCombat'],
        techLevel: 'TL2',
        atmosphere: 'corrosiveInvasive',
        temperature: 'variableWarm',
        biosphere: 'microbial',
        population: 'outpost',
      },
    },
    key: '0608',
    location: { x: 7, y: 9 },
  },
  '0103': {
    name: 'Mabienzais',
    planets: {
      bece: {
        name: 'Bece',
        tags: ['zombies', 'beastmasters'],
        techLevel: 'TL4',
        atmosphere: 'breathable',
        temperature: 'cold',
        biosphere: 'engineered',
        population: 'hundredsOfMillions',
      },
    },
    key: '0103',
    location: { x: 2, y: 4 },
  },
  '0607': {
    name: 'Zaisxe',
    planets: {
      beanin: {
        name: 'Beanin',
        tags: ['oceanicWorld', 'restrictiveLaws'],
        techLevel: 'TL3',
        atmosphere: 'corrosiveInvasive',
        temperature: 'variableCold',
        biosphere: 'humanMiscible',
        population: 'severalMillion',
      },
      getece: {
        name: 'Getece',
        tags: ['mandateBase', 'warlords'],
        techLevel: 'TL0',
        atmosphere: 'invasive',
        temperature: 'temperate',
        biosphere: 'engineered',
        population: 'severalMillion',
      },
      maleteesso: {
        name: 'Maleteesso',
        tags: ['forbiddenTech', 'hostileSpace'],
        techLevel: 'TL2',
        atmosphere: 'thick',
        temperature: 'cold',
        biosphere: 'engineered',
        population: 'billions',
      },
    },
    key: '0607',
    location: { x: 7, y: 8 },
  },
  '0703': {
    name: 'Usceala',
    planets: {
      esquatlaxe: {
        name: 'Esquatlaxe',
        tags: ['policeState', 'freakWeather'],
        techLevel: 'TL0',
        atmosphere: 'breathable',
        temperature: 'frozen',
        biosphere: 'remnant',
        population: 'outpost',
      },
      armaisbete: {
        name: 'Armaisbete',
        tags: ['area51', 'mandarinate'],
        techLevel: 'TL2',
        atmosphere: 'airlessThin',
        temperature: 'variableWarm',
        biosphere: 'remnant',
        population: 'hundredsOfMillions',
      },
    },
    key: '0703',
    location: { x: 8, y: 4 },
  },
  '0004': {
    name: 'Biinbiqudi',
    planets: {
      cequte: {
        name: 'Cequte',
        tags: ['alteredHumanity', 'postScarcity'],
        techLevel: 'TL5',
        atmosphere: 'invasive',
        temperature: 'cold',
        biosphere: 'hybrid',
        population: 'billions',
      },
    },
    key: '0004',
    location: { x: 1, y: 5 },
  },
  '0702': {
    name: 'Enrianince',
    planets: {
      enmaes: {
        name: 'Enmaes',
        tags: ['cyborgs', 'abandonedColony'],
        techLevel: 'TL2',
        atmosphere: 'corrosive',
        temperature: 'variableCold',
        biosphere: 'engineered',
        population: 'severalMillion',
      },
    },
    key: '0702',
    location: { x: 8, y: 3 },
  },
  '0707': {
    name: 'Direen',
    planets: {
      diistixeti: {
        name: 'Diistixeti',
        tags: ['zombies', 'badlandsWorld'],
        techLevel: 'TL5',
        atmosphere: 'corrosiveInvasive',
        temperature: 'temperate',
        biosphere: 'none',
        population: 'severalMillion',
      },
      abebe: {
        name: 'Abebe',
        tags: ['tabooTreasure', 'secretMasters'],
        techLevel: 'TL2',
        atmosphere: 'breathable',
        temperature: 'variableCold',
        biosphere: 'microbial',
        population: 'lessThanMillion',
      },
      bibirequre: {
        name: 'Bibirequre',
        tags: ['area51', 'formerWarriors'],
        techLevel: 'TL0',
        atmosphere: 'breathable',
        temperature: 'burning',
        biosphere: 'humanMiscible',
        population: 'billions',
      },
    },
    key: '0707',
    location: { x: 8, y: 8 },
  },
  '0603': {
    name: 'Araardiin',
    planets: {
      ceuste: {
        name: 'Ceuste',
        tags: ['feralWorld', 'preceptorArchive'],
        techLevel: 'TL4',
        atmosphere: 'airlessThin',
        temperature: 'variableCold',
        biosphere: 'none',
        population: 'outpost',
      },
    },
    key: '0603',
    location: { x: 7, y: 4 },
  },
  '0601': {
    name: 'Sotereenis',
    planets: {
      xelegebima: {
        name: 'Xelegebima',
        tags: ['badlandsWorld', 'outOfContact'],
        techLevel: 'TL5',
        atmosphere: 'breathable',
        temperature: 'temperate',
        biosphere: 'none',
        population: 'outpost',
      },
    },
    key: '0601',
    location: { x: 7, y: 2 },
  },
  '0407': {
    name: 'Usgeat',
    planets: {
      antila: {
        name: 'Antila',
        tags: ['freakGeology', 'psionicsWorship'],
        techLevel: 'TL3',
        atmosphere: 'breathable',
        temperature: 'cold',
        biosphere: 'none',
        population: 'failed',
      },
      quxete: {
        name: 'Quxete',
        tags: ['alteredHumanity', 'freakWeather'],
        techLevel: 'TL4',
        atmosphere: 'breathable',
        temperature: 'frozen',
        biosphere: 'humanMiscible',
        population: 'severalMillion',
      },
      ertibidiar: {
        name: 'Ertibidiar',
        tags: ['psionicsWorship', 'mandarinate'],
        techLevel: 'TL2',
        atmosphere: 'corrosiveInvasive',
        temperature: 'temperate',
        biosphere: 'humanMiscible',
        population: 'alien',
      },
    },
    key: '0407',
    location: { x: 5, y: 8 },
  },
  '0007': {
    name: 'Azadi',
    planets: {
      matied: {
        name: 'Matied',
        tags: ['terraformFailure', 'civilWar'],
        techLevel: 'TL1',
        atmosphere: 'breathable',
        temperature: 'warm',
        biosphere: 'microbial',
        population: 'severalMillion',
      },
    },
    key: '0007',
    location: { x: 1, y: 8 },
  },
  '0008': {
    name: 'Teerraxeso',
    planets: {
      xevere: {
        name: 'Xevere',
        tags: ['tabooTreasure', 'nightWorld'],
        techLevel: 'TL4',
        atmosphere: 'breathable',
        temperature: 'frozen',
        biosphere: 'humanMiscible',
        population: 'severalMillion',
      },
      bizaza: {
        name: 'Bizaza',
        tags: ['preceptorArchive', 'megacorps'],
        techLevel: 'TL2',
        atmosphere: 'breathable',
        temperature: 'temperate',
        biosphere: 'humanMiscible',
        population: 'severalMillion',
      },
    },
    key: '0008',
    location: { x: 1, y: 9 },
  },
  '0605': {
    name: 'Berizaveor',
    planets: {
      diededria: {
        name: 'Diededria',
        tags: ['xenophiles', 'localSpecialty'],
        techLevel: 'TL5',
        atmosphere: 'corrosive',
        temperature: 'variableCold',
        biosphere: 'none',
        population: 'hundredsOfMillions',
      },
    },
    key: '0605',
    location: { x: 7, y: 6 },
  },
  '0203': {
    name: 'Riatbe',
    planets: {
      esxere: {
        name: 'Esxere',
        tags: ['regionalHegemon', 'terraformFailure'],
        techLevel: 'TL4',
        atmosphere: 'invasive',
        temperature: 'warm',
        biosphere: 'humanMiscible',
        population: 'outpost',
      },
    },
    key: '0203',
    location: { x: 3, y: 4 },
  },
  '0500': {
    name: 'Enleinondi',
    planets: {
      orisbi: {
        name: 'Orisbi',
        tags: ['unbrakedAi', 'freakWeather'],
        techLevel: 'TL4',
        atmosphere: 'breathable',
        temperature: 'burning',
        biosphere: 'hybrid',
        population: 'severalMillion',
      },
      reaorti: {
        name: 'Reaorti',
        tags: ['robots', 'revanchists'],
        techLevel: 'TL2',
        atmosphere: 'airlessThin',
        temperature: 'frozen',
        biosphere: 'immiscible',
        population: 'lessThanMillion',
      },
      beesraerre: {
        name: 'Beesraerre',
        tags: ['megacorps', 'eugenicCult'],
        techLevel: 'TL3',
        atmosphere: 'breathable',
        temperature: 'temperate',
        biosphere: 'none',
        population: 'outpost',
      },
    },
    key: '0500',
    location: { x: 6, y: 1 },
  },
  '0202': {
    name: 'Maedle',
    planets: {
      anises: {
        name: 'Anises',
        tags: ['friendlyFoe', 'pretechCultists'],
        techLevel: 'TL4',
        atmosphere: 'breathable',
        temperature: 'frozen',
        biosphere: 'microbial',
        population: 'alien',
      },
      enxemaa: {
        name: 'Enxemaa',
        tags: ['shackledWorld', 'cheapLife'],
        techLevel: 'TL2',
        atmosphere: 'breathable',
        temperature: 'warm',
        biosphere: 'remnant',
        population: 'severalMillion',
      },
    },
    key: '0202',
    location: { x: 3, y: 3 },
  },
  '0301': {
    name: 'Raisena',
    planets: {
      rimare: {
        name: 'Rimare',
        tags: ['goldRush', 'megacorps'],
        techLevel: 'TL4',
        atmosphere: 'airlessThin',
        temperature: 'burning',
        biosphere: 'microbial',
        population: 'hundredsOfMillions',
      },
    },
    key: '0301',
    location: { x: 4, y: 2 },
  },
  '0206': {
    name: 'Leisriisqu',
    planets: {
      aresgetige: {
        name: 'Aresgetige',
        tags: ['tabooTreasure', 'fallenHegemon'],
        techLevel: 'TL4',
        atmosphere: 'corrosive',
        temperature: 'temperate',
        biosphere: 'immiscible',
        population: 'severalMillion',
      },
    },
    key: '0206',
    location: { x: 3, y: 7 },
  },
  '0302': {
    name: 'Leinen',
    planets: {
      oronra: {
        name: 'Oronra',
        tags: ['theocracy', 'goldRush'],
        techLevel: 'TL4',
        atmosphere: 'inert',
        temperature: 'temperate',
        biosphere: 'humanMiscible',
        population: 'outpost',
      },
      lexerixexe: {
        name: 'Lexerixexe',
        tags: ['restrictiveLaws', 'area51'],
        techLevel: 'TL1',
        atmosphere: 'breathable',
        temperature: 'variableWarm',
        biosphere: 'remnant',
        population: 'failed',
      },
      gebice: {
        name: 'Gebice',
        tags: ['nightWorld', 'desertWorld'],
        techLevel: 'TL2',
        atmosphere: 'thick',
        temperature: 'temperate',
        biosphere: 'humanMiscible',
        population: 'billions',
      },
    },
    key: '0302',
    location: { x: 4, y: 3 },
  },
  '0001': {
    name: 'Bizaza',
    planets: {
      quveis: {
        name: 'Quveis',
        tags: ['badlandsWorld', 'terraformFailure'],
        techLevel: 'TL3',
        atmosphere: 'thick',
        temperature: 'variableWarm',
        biosphere: 'hybrid',
        population: 'hundredsOfMillions',
      },
      tiquor: {
        name: 'Tiquor',
        tags: ['seismicInstability', 'majorSpaceyard'],
        techLevel: 'TL5',
        atmosphere: 'corrosiveInvasive',
        temperature: 'temperate',
        biosphere: 'humanMiscible',
        population: 'failed',
      },
      direge: {
        name: 'Direge',
        tags: ['cybercommunists', 'desertWorld'],
        techLevel: 'TL3',
        atmosphere: 'breathable',
        temperature: 'variableWarm',
        biosphere: 'engineered',
        population: 'lessThanMillion',
      },
    },
    key: '0001',
    location: { x: 1, y: 2 },
  },
  '0700': {
    name: 'Rea',
    planets: {
      biininoned: {
        name: 'Biininoned',
        tags: ['eugenicCult', 'greatWork'],
        techLevel: 'TL3',
        atmosphere: 'corrosiveInvasive',
        temperature: 'burning',
        biosphere: 'humanMiscible',
        population: 'billions',
      },
      remaer: {
        name: 'Remaer',
        tags: ['dyingRace', 'shackledWorld'],
        techLevel: 'TL2',
        atmosphere: 'corrosive',
        temperature: 'burning',
        biosphere: 'engineered',
        population: 'lessThanMillion',
      },
    },
    key: '0700',
    location: { x: 8, y: 1 },
  },
};

describe('SectorGenerator', () => {
  let config;
  beforeEach(() => {
    config = {
      columns: 8,
      rows: 10,
      seed: 'asdfghjkl',
    };
  });

  it('should have a randomly generated name', () => {
    const { name } = SectorGenerator(config);
    expect(name).toEqual('Edena Omega');
  });

  it('should pass the seed, rows, and columns through to the result', () => {
    const testSeed = 'lkjhgfdsa';
    const { seed, rows, columns } = SectorGenerator({
      ...config,
      seed: testSeed,
    });
    expect(seed).toEqual(testSeed);
    expect(rows).toEqual(10);
    expect(columns).toEqual(8);
  });

  it('should generate a sector full of systems from a seed', () => {
    const { systems } = SectorGenerator(config);
    expect(systems).toMatchObject(testSystems);
  });
});
