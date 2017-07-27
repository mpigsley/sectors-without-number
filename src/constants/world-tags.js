export const worldTagKeys = {
  abandonedColony: 'abandonedColony',
  alienRuins: 'alienRuins',
  alteredHumanity: 'alteredHumanity',
  anarchists: 'anarchists',
  anthropomorphs: 'anthropomorphs',
  area51: 'area51',
  badlandsWorld: 'badlandsWorld',
  battleground: 'battleground',
  beastmasters: 'beastmasters',
  bubbleCities: 'bubbleCities',
  cheapLife: 'cheapLife',
  civilWar: 'civilWar',
  coldWar: 'coldWar',
  colonizedPopulation: 'colonizedPopulation',
  culturalPower: 'culturalPower',
  cybercommunists: 'cybercommunists',
  cyborgs: 'cyborgs',
  cyclicalDoom: 'cyclicalDoom',
  desertWorld: 'desertWorld',
  doomedWorld: 'doomedWorld',
  dyingRace: 'dyingRace',
  eugenicCult: 'eugenicCult',
  exchangeConsulate: 'exchangeConsulate',
  fallenHegemon: 'fallenHegemon',
  feralWorld: 'feralWorld',
  flyingCities: 'flyingCities',
  forbiddenTech: 'forbiddenTech',
  formerWarriors: 'formerWarriors',
  freakGeology: 'freakGeology',
  freakWeather: 'freakWeather',
  friendlyFoe: 'friendlyFoe',
  goldRush: 'goldRush',
  greatWork: 'greatWork',
  hatred: 'hatred',
  heavyIndustry: 'heavyIndustry',
  heavyMining: 'heavyMining',
  hivemind: 'hivemind',
  holyWar: 'holyWar',
  hostileBiosphere: 'hostileBiosphere',
  hostileSpace: 'hostileSpace',
  immortals: 'immortals',
  localSpecialty: 'localSpecialty',
  localTech: 'localTech',
  majorSpaceyard: 'majorSpaceyard',
  mandarinate: 'mandarinate',
  mandateBase: 'mandateBase',
  maneaters: 'maneaters',
  megacorps: 'megacorps',
  mercenaries: 'mercenaries',
  minimalContact: 'minimalContact',
  misandryMisogyny: 'misandryMisogyny',
  nightWorld: 'nightWorld',
  nomads: 'nomads',
  oceanicWorld: 'oceanicWorld',
  outOfContact: 'outOfContact',
  outpostWorld: 'outpostWorld',
  perimeterAgency: 'perimeterAgency',
  pilgrimageSite: 'pilgrimageSite',
  pleasureWorld: 'pleasureWorld',
  policeState: 'policeState',
  postScarcity: 'postScarcity',
  preceptorArchive: 'preceptorArchive',
  pretechCultists: 'pretechCultists',
  primitiveAliens: 'primitiveAliens',
  prisonPlanet: 'prisonPlanet',
  psionicsAcademy: 'psionicsAcademy',
  psionicsFear: 'psionicsFear',
  psionicsWorship: 'psionicsWorship',
  quarantinedWorld: 'quarantinedWorld',
  radioactiveWorld: 'radioactiveWorld',
  refugees: 'refugees',
  regionalHegemon: 'regionalHegemon',
  restrictiveLaws: 'restrictiveLaws',
  revanchists: 'revanchists',
  revolutionaries: 'revolutionaries',
  rigidCulture: 'rigidCulture',
  risingHegemon: 'risingHegemon',
  ritualCombat: 'ritualCombat',
  robots: 'robots',
  seagoingCities: 'seagoingCities',
  sealedMenace: 'sealedMenace',
  secretMasters: 'secretMasters',
  sectarians: 'sectarians',
  seismicInstability: 'seismicInstability',
  shackledWorld: 'shackledWorld',
  societalDespair: 'societalDespair',
  soleSupplier: 'soleSupplier',
  tabooTreasure: 'tabooTreasure',
  terraformFailure: 'terraformFailure',
  theocracy: 'theocracy',
  tombWorld: 'tombWorld',
  tradeHub: 'tradeHub',
  tyranny: 'tyranny',
  unbrakedAi: 'unbrakedAi',
  urbanizedSurface: 'urbanizedSurface',
  utopia: 'utopia',
  warlords: 'warlords',
  xenophiles: 'xenophiles',
  xenophobes: 'xenophobes',
  zombies: 'zombies',
};

export default {
  [worldTagKeys.abandonedColony]: {
    key: worldTagKeys.abandonedColony,
    name: 'Abandoned Colony',
    description: 'The world once hosted a colony, whether human or otherwise, until some crisis or natural disaster drove the inhabitants away or killed them off. The colony might have been mercantile in nature, an expedition to extract valuable local resources, or it might have been a reclusive cabal of zealots. The remains of the colony are usually in ruins, and might still be dangerous from the aftermath of whatever destroyed it in the first place.',
    enemies: [
      'crazed survivors',
      'ruthless plunderers of the ruins',
      'automated defense system',
    ],
    friends: [
      'inquisitive stellar archaeologist',
      'heir to the colony\'s property',
      'local wanting the place cleaned out and made safe',
    ],
    complications: [
      'the local government wants the ruins to remain a secret',
      'the locals claim ownership of it',
      'the colony is crumbling and dangerous to navigate',
    ],
    things: [
      'long-lost property deeds',
      'relic stolen by the colonists when they left',
      'historical record of the colonization attempt',
    ],
    places: [
      'decaying habitation block, Vine-coverered town',
      'vine-covered town square',
      'structure buried by an ancient landslide',
    ],
  },
  [worldTagKeys.alienRuins]: {
    key: worldTagKeys.alienRuins,
    name: 'Alien Ruins',
    description: 'The world has significant alien ruins present. The locals may or may not permit others to investigate the ruins, and may make it difficult to remove any objects of value without substantial payment. Any surviving ruins with worthwhile salvage almost certainly have some defense or hazard to explain their unplundered state.',
    enemies: [
      'customs inspector',
      'worshipper of the ruins',
      'hidden alien survivor',
    ],
    friends: [
      'curious scholar',
      'avaricious local resident',
      'interstellar smuggler',
    ],
    complications: [
      'traps in the ruins',
      'remote location',
      'paranoid customs officials',
    ],
    things: [
      'precious alien artifacts',
      'objects left with the remains of a prior unsuccessful expedition',
      'untranslated alien texts',
      'untouched hidden ruins',
    ],
    places: [
      'undersea ruin',
      'orbital ruin',
      'perfectly preserved alien building',
      'alien mausoleum',
    ],
  },
  [worldTagKeys.alteredHumanity]: {
    key: worldTagKeys.alteredHumanity,
    name: 'Altered Humanity',
    description: 'The humans on this world are visibly and drastically different from normal humanity. They may have additional limbs, new sensory organs, or other significant changes. Were these from ancestral eugenic manipulation, strange stellar mutations, or from an environmental toxin unique to this world?',
    enemies: [
      'biochauvinist local',
      'local experimenter',
      'mentally unstable mutant',
    ],
    friends: [
      'local seeking a "cure"',
      'curious xenophiliac',
      'anthropological researcher',
    ],
    complications: [
      'alteratin is contageious',
      'alteration is necessary for long-term survival',
      'locals fear and mistrust non-local humans',
    ],
    things: [
      'original pretech mutagenic equipment',
      'valuable biological byproduct from the mutants',
      '"cure" for the altered genes',
      'record of the original colonial genotypes',
    ],
    places: [
      'abandoned eugenics laboratory',
      'an environment requireing the mutation for survival',
      'a sacred site where the first local was transformed',
    ],
  },
  [worldTagKeys.anarchists]: {
    key: worldTagKeys.anarchists,
    name: 'Anarchists',
    description: 'Rather than being an incidental anarchy of struggling tribes and warring factions, this world actually has a functional society with no centralized authority. Authority might be hyperlocalized to extended families, specific religious parishes, or voluntary associations. Some force is preventing an outside group or internal malcontents from coalescing into a power capable of imposing its rule on the locals; this force might be an ancient pretech defense system, a benevolent military AI, or the sheer obscurity and isolation of the culture.',
    enemies: [
      'offworlder imperialist',
      'reformer seeking to impose "good government"',
      'exploiter taking advantage of the lack of centralized resistance',
    ],
    friends: [
      'proud missionary for anarchy',
      'casual local free spirit',
      'curious offworlder political scientist',
    ],
    complications: [
      'the anarchistic structure is compelled by an external power',
      'the anarchy is enabled by curently abundant resources',
      'the protecting force that shelters the anarchy is waning',
    ],
    things: [
      'a macguffin that would let the possessor enforce their rule on others',
      'a vital resource needed to preserve general liberty',
      'tech forbidden as disruptive to the social order',
    ],
    places: [
      'community of similar-sized homes',
      'isolated clan homestead',
      'automated mining site',
    ],
  },
  [worldTagKeys.anthropomorphs]: {
    key: worldTagKeys.anthropomorphs,
    name: 'Anthropomorphs',
    description: 'The locals were originally human, but at some point became anthropomorphic, either as an ancient furry colony, a group of animal-worshiping sectarians, or gengineers who just happened to find animal elements most convenient for surviving on the world. Depending on the skill of the original gengineers, their feral forms may or may not work as well as their original human bodies, or may come with drawbacks inherited from their animal elements.',
    enemies: [
      'anthro-supremacist local',
      'native driven by feral urges',
      'outside exploiter who sees the locals as subhuman creatures',
    ],
    friends: [
      'fascinated genetic researcher',
      'diplomat trained to deal with normals',
      'local needing outside help',
    ],
    complications: [
      'the locals consider their shapes a curse from their foolish ancestors',
      'society is ordered according to animal forms',
      'the locals view normal humans as repulsive or inferior',
    ],
    things: [
      'pretech gengineering tech',
      'a "cure" that may not be wanted',
      'sacred feral totem',
    ],
    places: [
      'shrine to a feral deity',
      'nature preserve suited to an animal type',
      'living site built to take advantage of animal traits',
    ],
  },
  [worldTagKeys.area51]: {
    key: worldTagKeys.area51,
    name: 'Area 51',
    description: 'The world’s government is fully aware of their local stellar neighbors, but the common populace has no idea about it, and the government means to keep it that way. Trade with government officials in remote locations is possible, but any attempt to clue the commoners in on the truth will be met with lethal reprisals.',
    enemies: [
      'suspicious government minder',
      'free merchant who likes his local monopoly',
      'local who wants a specimen for dissection',
    ],
    friends: [
      'crusading offworld investigator',
      'conspiracy-thoerist local',
      'idealistic government reformer',
    ],
    complications: [
      'the government has a good reason to keep the truth concealed',
      'the government ruthlessly opresses the natives',
      'the government is actually composed of off worlders',
    ],
    things: [
      'elaborate spy devices',
      'memory erasure tech',
      'possessions of the last offworlder who decided to spread the truth',
    ],
    places: [
      'desert airfield',
      'deep subterranean bunker',
      'hidden mountain valley',
    ],
  },
  [worldTagKeys.badlandsWorld]: {
    key: worldTagKeys.badlandsWorld,
    name: 'Badlands World',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.battleground]: {
    key: worldTagKeys.battleground,
    name: 'Battleground',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.beastmasters]: {
    key: worldTagKeys.beastmasters,
    name: 'Beastmasters',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.bubbleCities]: {
    key: worldTagKeys.bubbleCities,
    name: 'Bubble Cities',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.cheapLife]: {
    key: worldTagKeys.cheapLife,
    name: 'Cheap Life',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.civilWar]: {
    key: worldTagKeys.civilWar,
    name: 'Civil War',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.coldWar]: {
    key: worldTagKeys.coldWar,
    name: 'Cold War',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.colonizedPopulation]: {
    key: worldTagKeys.colonizedPopulation,
    name: 'Colonized Population',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.culturalPower]: {
    key: worldTagKeys.culturalPower,
    name: 'Cultural Power',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.cybercommunists]: {
    key: worldTagKeys.cybercommunists,
    name: 'Cybercommunists',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.cyborgs]: {
    key: worldTagKeys.cyborgs,
    name: 'Cyborgs',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.cyclicalDoom]: {
    key: worldTagKeys.cyclicalDoom,
    name: 'Cyclical Doom',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.desertWorld]: {
    key: worldTagKeys.desertWorld,
    name: 'Desert World',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.doomedWorld]: {
    key: worldTagKeys.doomedWorld,
    name: 'Doomed World',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.dyingRace]: {
    key: worldTagKeys.dyingRace,
    name: 'Dying Race',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.eugenicCult]: {
    key: worldTagKeys.eugenicCult,
    name: 'Eugenic Cult',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.exchangeConsulate]: {
    key: worldTagKeys.exchangeConsulate,
    name: 'Exchange Consulate',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.fallenHegemon]: {
    key: worldTagKeys.fallenHegemon,
    name: 'Fallen Hegemon',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.feralWorld]: {
    key: worldTagKeys.feralWorld,
    name: 'Feral World',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.flyingCities]: {
    key: worldTagKeys.flyingCities,
    name: 'Flying Cities',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.forbiddenTech]: {
    key: worldTagKeys.forbiddenTech,
    name: 'Forbidden Tech',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.formerWarriors]: {
    key: worldTagKeys.formerWarriors,
    name: 'Former Warriors',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.freakGeology]: {
    key: worldTagKeys.freakGeology,
    name: 'Freak Geology',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.freakWeather]: {
    key: worldTagKeys.freakWeather,
    name: 'Freak Weather',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.friendlyFoe]: {
    key: worldTagKeys.friendlyFoe,
    name: 'Friendly Foe',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.goldRush]: {
    key: worldTagKeys.goldRush,
    name: 'Gold Rush',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.greatWork]: {
    key: worldTagKeys.greatWork,
    name: 'Great Work',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.hatred]: {
    key: worldTagKeys.hatred,
    name: 'Hatred',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.heavyIndustry]: {
    key: worldTagKeys.heavyIndustry,
    name: 'Heavy Industry',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.heavyMining]: {
    key: worldTagKeys.heavyMining,
    name: 'Heavy Mining',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.hivemind]: {
    key: worldTagKeys.hivemind,
    name: 'Hivemind',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.holyWar]: {
    key: worldTagKeys.holyWar,
    name: 'Holy War',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.hostileBiosphere]: {
    key: worldTagKeys.hostileBiosphere,
    name: 'Hostile Biosphere',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.hostileSpace]: {
    key: worldTagKeys.hostileSpace,
    name: 'Hostile Space',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.immortals]: {
    key: worldTagKeys.immortals,
    name: 'Immortals',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.localSpecialty]: {
    key: worldTagKeys.localSpecialty,
    name: 'Local Specialty',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.localTech]: {
    key: worldTagKeys.localTech,
    name: 'Local Tech',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.majorSpaceyard]: {
    key: worldTagKeys.majorSpaceyard,
    name: 'Major Spaceyard',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.mandarinate]: {
    key: worldTagKeys.mandarinate,
    name: 'Mandarinate',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.mandateBase]: {
    key: worldTagKeys.mandateBase,
    name: 'Mandate Base',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.maneaters]: {
    key: worldTagKeys.maneaters,
    name: 'Maneaters',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.megacorps]: {
    key: worldTagKeys.megacorps,
    name: 'Megacorps',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.mercenaries]: {
    key: worldTagKeys.mercenaries,
    name: 'Mercenaries',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.minimalContact]: {
    key: worldTagKeys.minimalContact,
    name: 'Minimal Contact',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.misandryMisogyny]: {
    key: worldTagKeys.misandryMisogyny,
    name: 'Misandry/Misogyny',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.nightWorld]: {
    key: worldTagKeys.nightWorld,
    name: 'Night World',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.nomads]: {
    key: worldTagKeys.nomads,
    name: 'Nomads',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.oceanicWorld]: {
    key: worldTagKeys.oceanicWorld,
    name: 'Oceanic World',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.outOfContact]: {
    key: worldTagKeys.outOfContact,
    name: 'Out of Contact',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.outpostWorld]: {
    key: worldTagKeys.outpostWorld,
    name: 'Outpost World',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.perimeterAgency]: {
    key: worldTagKeys.perimeterAgency,
    name: 'Perimeter Agency',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.pilgrimageSite]: {
    key: worldTagKeys.pilgrimageSite,
    name: 'Pilgrimage Site',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.pleasureWorld]: {
    key: worldTagKeys.pleasureWorld,
    name: 'Pleasure World',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.policeState]: {
    key: worldTagKeys.policeState,
    name: 'Police State',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.postScarcity]: {
    key: worldTagKeys.postScarcity,
    name: 'Post-Scarcity',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.preceptorArchive]: {
    key: worldTagKeys.preceptorArchive,
    name: 'Preceptor Archive',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.pretechCultists]: {
    key: worldTagKeys.pretechCultists,
    name: 'Pretech Cultists',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.primitiveAliens]: {
    key: worldTagKeys.primitiveAliens,
    name: 'Primitive Aliens',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.prisonPlanet]: {
    key: worldTagKeys.prisonPlanet,
    name: 'Prison Planet',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.psionicsAcademy]: {
    key: worldTagKeys.psionicsAcademy,
    name: 'Psionics Academy',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.psionicsFear]: {
    key: worldTagKeys.psionicsFear,
    name: 'Psionics Fear',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.psionicsWorship]: {
    key: worldTagKeys.psionicsWorship,
    name: 'Psionics Worship',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.quarantinedWorld]: {
    key: worldTagKeys.quarantinedWorld,
    name: 'Quarantined World',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.radioactiveWorld]: {
    key: worldTagKeys.radioactiveWorld,
    name: 'Radioactive World',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.refugees]: {
    key: worldTagKeys.refugees,
    name: 'Refugees',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.regionalHegemon]: {
    key: worldTagKeys.regionalHegemon,
    name: 'Regional Hegemon',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.restrictiveLaws]: {
    key: worldTagKeys.restrictiveLaws,
    name: 'Restrictive Laws',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.revanchists]: {
    key: worldTagKeys.revanchists,
    name: 'Revanchists',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.revolutionaries]: {
    key: worldTagKeys.revolutionaries,
    name: 'Revolutionaries',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.rigidCulture]: {
    key: worldTagKeys.rigidCulture,
    name: 'Rigid Culture',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.risingHegemon]: {
    key: worldTagKeys.risingHegemon,
    name: 'Rising Hegemon',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.ritualCombat]: {
    key: worldTagKeys.ritualCombat,
    name: 'Ritual Combat',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.robots]: {
    key: worldTagKeys.robots,
    name: 'Robots',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.seagoingCities]: {
    key: worldTagKeys.seagoingCities,
    name: 'Seagoing Cities',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.sealedMenace]: {
    key: worldTagKeys.sealedMenace,
    name: 'Sealed Menace',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.secretMasters]: {
    key: worldTagKeys.secretMasters,
    name: 'Secret Masters',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.sectarians]: {
    key: worldTagKeys.sectarians,
    name: 'Sectarians',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.seismicInstability]: {
    key: worldTagKeys.seismicInstability,
    name: 'Seismic Instability',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.shackledWorld]: {
    key: worldTagKeys.shackledWorld,
    name: 'Shackled World',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.societalDespair]: {
    key: worldTagKeys.societalDespair,
    name: 'Societal Despair',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.soleSupplier]: {
    key: worldTagKeys.soleSupplier,
    name: 'Sole Supplier',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.tabooTreasure]: {
    key: worldTagKeys.tabooTreasure,
    name: 'Taboo Treasure',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.terraformFailure]: {
    key: worldTagKeys.terraformFailure,
    name: 'Terraform Failure',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.theocracy]: {
    key: worldTagKeys.theocracy,
    name: 'Theocracy',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.tombWorld]: {
    key: worldTagKeys.tombWorld,
    name: 'Tomb World',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.tradeHub]: {
    key: worldTagKeys.tradeHub,
    name: 'Trade Hub',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.tyranny]: {
    key: worldTagKeys.tyranny,
    name: 'Tyranny',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.unbrakedAi]: {
    key: worldTagKeys.unbrakedAi,
    name: 'Unbraked AI',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.urbanizedSurface]: {
    key: worldTagKeys.urbanizedSurface,
    name: 'Urbanized Surface',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.utopia]: {
    key: worldTagKeys.utopia,
    name: 'Utopia',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.warlords]: {
    key: worldTagKeys.warlords,
    name: 'Warlords',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.xenophiles]: {
    key: worldTagKeys.xenophiles,
    name: 'Xenophiles',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.xenophobes]: {
    key: worldTagKeys.xenophobes,
    name: 'Xenophobes',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
  [worldTagKeys.zombies]: {
    key: worldTagKeys.zombies,
    name: 'Zombies',
    description: '',
    enemies: [
      '',
    ],
    friends: [
      '',
    ],
    complications: [
      '',
    ],
    things: [
      '',
    ],
    places: [
      '',
    ],
  },
};
