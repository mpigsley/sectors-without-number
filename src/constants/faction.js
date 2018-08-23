export const FACTION_GOALS = {
  military: 'military',
  commercial: 'commercial',
  coup: 'coup',
  seizure: 'seizure',
  influence: 'influence',
  blood: 'blood',
  peaceable: 'peaceable',
  destroy: 'destroy',
  inside: 'inside',
  valor: 'valor',
  wealth: 'wealth',
};

export const FACTION_TAGS = {
  colonists: 'colonists',
  deepRooted: 'deepRooted',
  eugenicsCult: 'eugenicsCult',
  exchangeConsulate: 'exchangeConsulate',
  fanatical: 'fanatical',
  imperialists: 'imperialists',
  machiavellian: 'machiavellian',
  mercenaryGroup: 'mercenaryGroup',
  perimeterAgency: 'perimeterAgency',
  pirates: 'pirates',
  planetaryGovernment: 'planetaryGovernment',
  plutocratic: 'plutocratic',
  preceptorArchive: 'preceptorArchive',
  psychicAcademy: 'psychicAcademy',
  savage: 'savage',
  scavengers: 'scavengers',
  secretive: 'secretive',
  technicalExpertise: 'technicalExpertise',
  theocratic: 'theocratic',
  warlike: 'warlike',
};

export const FACTION_ASSET_CATEGORIES = {
  cunning: 'cunning',
  force: 'force',
  wealth: 'wealth',
};

export const FACTION_ASSET_TYPES = {
  facility: 'facility',
  logisticsFacility: 'logisticsFacility',
  militaryUnit: 'militaryUnit',
  spaceship: 'spaceship',
  special: 'special',
  specialForces: 'specialForces',
  starship: 'starship',
  tactic: 'tactic',
};

export const FACTION_ASSET_NOTES = {
  planetaryApproval: 'planetaryApproval',
  specialAction: 'specialAction',
  specialFeatureCost: 'specialFeatureCost',
};

export const FACTION_ASSETS = {
  baseOfInfluence: {
    key: 'baseOfInfluence',
    categories: [
      FACTION_ASSET_CATEGORIES.cunning,
      FACTION_ASSET_CATEGORIES.force,
      FACTION_ASSET_CATEGORIES.wealth,
    ],
    rating: 1,
    hp: '*',
    cost: '*',
    techLevel: 0,
    type: FACTION_ASSET_TYPES.special,
    notes: [FACTION_ASSET_NOTES.specialFeatureCost],
  },
  blackmail: {
    key: 'blackmail',
    categories: [FACTION_ASSET_CATEGORIES.cunning],
    rating: 2,
    hp: 4,
    cost: 4,
    techLevel: 0,
    type: FACTION_ASSET_TYPES.tactic,
    attack: {
      attack: FACTION_ASSET_CATEGORIES.cunning,
      defense: FACTION_ASSET_CATEGORIES.cunning,
      damage: {
        dice: '1d4',
        add: 1,
      },
    },
    notes: [FACTION_ASSET_NOTES.specialFeatureCost],
  },
  boltholes: {
    key: 'boltholes',
    categories: [FACTION_ASSET_CATEGORIES.cunning],
    rating: 5,
    hp: 6,
    cost: 12,
    techLevel: 4,
    type: FACTION_ASSET_TYPES.logisticsFacility,
    counter: {
      dice: '2d4',
    },
    notes: [FACTION_ASSET_NOTES.specialFeatureCost],
  },
  bookOfSecrets: {
    key: 'bookOfSecrets',
    categories: [FACTION_ASSET_CATEGORIES.cunning],
    rating: 7,
    hp: 10,
    cost: 20,
    techLevel: 4,
    type: FACTION_ASSET_TYPES.tactic,
    counter: {
      dice: '2d8',
    },
    notes: [FACTION_ASSET_NOTES.specialFeatureCost],
  },
};
