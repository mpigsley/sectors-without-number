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
    description: 'Whatever the original climate and atmosphere type, something horrible happened to this world. Biological, chemical, or nanotechnical weaponry has reduced it to a wretched hellscape. Some local life might still be able to survive on its blasted surface, usually at some dire cost in health or humanity.',
    enemies: [
      'mutated badlands fauna',
      'desperate local',
      'badlands raider chief',
    ],
    friends: [
      'native desparately wishing to escape the world',
      'scientist researching ecological repair methods',
      'ruin scavanger',
    ],
    complications: [
      'radiactivity',
      'bioweapon traces',
      'broken terrain',
      'sudden local plague',
    ],
    things: [
      'maltech research core',
      'functional pretech weaponry',
      'an uncontaminated well',
    ],
    places: [
      'untouched oasis',
      'ruined city',
      'salt flat',
    ],
  },
  [worldTagKeys.battleground]: {
    key: worldTagKeys.battleground,
    name: 'Battleground',
    description: 'The world is a battleground for two or more outside powers. They may be interstellar rivals, or groups operating out of orbitals or other system bodies. Something about the planet is valuable enough for them to fight over, but the natives are too weak to be anything but animate obstacles to the fight.',
    enemies: [
      'ruthless military commander',
      'looter pack chieftan',
      'traitorous collaborator',
    ],
    friends: [
      'native desperately seeking protection',
      'pragmatic military officer',
      'happless war orphan',
    ],
    complications: [
      'the war just endded as both sides are leaving',
      'the natives somehow brought this on themselves',
      'a small group of natives profit tremendously from the fighting',
    ],
    things: [
      'a cache of the resource the invaders seek',
      'abandoned prototype military gear',
      'precious spy intelligence lost by someone',
    ],
    places: [
      'artillery-pocked wasteland',
      'reeking refugee camp',
      'burnt-out shell of a city',
    ],
  },
  [worldTagKeys.beastmasters]: {
    key: worldTagKeys.beastmasters,
    name: 'Beastmasters',
    description: 'The natives have extremely close bonds with the local fauna, possibly having special means of communication and control through tech or gengineering. Local animal life plays a major role in their society, indusutry, or warfare, and new kinds of beasts may be bred to suit their purposes.',
    enemies: [
      'half-feral warlord of a beast swarm',
      'coldly in- human scientist',
      'altered beast with human intellect and furious malice',
    ],
    friends: [
      'native bonded with an adorable animal',
      'herder of very useful beasts',
      'animal-revering mystic',
    ],
    complications: [
      'the "animals" are very heavily gengineered humans',
      'the animals actuall run the society',
      'the animals have the same rights as humans',
    ],
    things: [
      'tech used to alter animal life',
      'a plague vial that could wipe out the animals',
      'a pretech device that can perform a wonder if operated by a beast',
    ],
    places: [
      'park designed as a comfortable home for beasts',
      'public plaza designed to acommodate animal companions',
      'factory full of animal workers',
    ],
  },
  [worldTagKeys.bubbleCities]: {
    key: worldTagKeys.bubbleCities,
    name: 'Bubble Cities',
    description: 'Whether due to a lack of atmosphere or an uninhabitable climate, the world’s cities exist within domes or pressurized buildings. In such sealed environments, techniques of surveillance and control can grow baroque and extreme.',
    enemies: [
      'native deading outsider contamination',
      'saboteur from another bubble city',
      'local official hostile to outsider ignorance of laws',
    ],
    friends: [
      'local rebel against the city officials',
      'maintenance chief in need of help',
      'surveyor seeking new building sites',
    ],
    complications: [
      'bubble rupture',
      'failing atmosphere reprocessor',
      'native revolt against officials',
      'all-seeing surveillance cameras',
    ],
    things: [
      'pretech habitat technology',
      'valuable industrial products',
      'master key codes to a city\'s security system',
    ],
    places: [
      'city power core',
      'surface of the bubble',
      'hydroponics complex',
      'warren-like hab block',
    ],
  },
  [worldTagKeys.cheapLife]: {
    key: worldTagKeys.cheapLife,
    name: 'Cheap Life',
    description: 'Human life is near-worthless on this world. Ubiquitous cloning, local conditions that ensure early death, a culture that reveres murder, or a social structure that utterly discounts the value of most human lives ensures that death is the likely outcome for any action that irritates someone consequential.',
    enemies: [
      'master assassin',
      'bloody-handed judge',
      'overseer of disposable clones',
    ],
    friends: [
      'endearing local whose life the PCs accidentally bought',
      'escapee from death seeking outside help',
      'reformer trying to change local mores',
    ],
    complications: [
      'radiation or local diseases ensure all locals die before twenty-five years of age',
      'tech ensures that death is just an annoyance',
      'locals are totally convinced of a blissful afterlife',
    ],
    things: [
      'device that revives or re-embodies the dead',
      'maltech engine fueled by human life',
      'priceless treasure held by a now dead owner',
    ],
    places: [
      'thronging execution ground',
      'extremely cursory cemetery',
      'factory full of lethal dangers that could be corrected easily',
    ],
  },
  [worldTagKeys.civilWar]: {
    key: worldTagKeys.civilWar,
    name: 'Civil War',
    description: 'The world is currently torn between at least two opposing factions, all of which claim legitimacy. The war may be the result of a successful rebel uprising against tyranny, or it might just be the result of schemers who plan to be the new masters once the revolution is complete.',
    enemies: [
      'faction commissar',
      'angry native',
      'conspiracy theorist who blames offwolders for the war',
      'deserter looking out for himself',
      'guerilla bandit cheiftan',
    ],
    friends: [
      'faction loyalist seeking aid',
      'native caught in the crossfire',
      'offworlder seeking passage off the planet',
    ],
    complications: [
      'the front rolls over the group',
      'famine strikes',
      'bandit infestations are in the way',
    ],
    things: [
      'ammo dump',
      'military cache',
      'treasure buried for after the war',
      'secret war plans',
    ],
    places: [
      'battle front',
      'bombed-out town',
      'rear-area red light zone',
      'propaganda broadcast tower',
    ],
  },
  [worldTagKeys.coldWar]: {
    key: worldTagKeys.coldWar,
    name: 'Cold War',
    description: 'Two or more great powers control the planet, and they have a hostility to each other that’s just barely less than open warfare. The hostility might be ideological in nature, or it might revolve around control of some local resource.',
    enemies: [
      'suspicious chief of intelligence',
      'native who thinks the outworlders are with the other side',
      'femme fatale',
    ],
    friends: [
      'apolitical information broker',
      'spy for the other side',
      'unjustly accused innocent',
      '"he\'s a bastard, but he\'s our bastard" official',
    ],
    complications: [
      'police sweep',
      'low-level skirmishing',
      '"red scare"',
    ],
    things: [
      'list of traitors in government',
      'secret military plans',
      'huge cache of weapons built up in preparation for war',
    ],
    places: [
      'seedy bar in a neutral area',
      'political rally',
      'isolated area where fighting is underway',
    ],
  },
  [worldTagKeys.colonizedPopulation]: {
    key: worldTagKeys.colonizedPopulation,
    name: 'Colonized Population',
    description: 'A neighboring world has successfully colonized this less-advanced or less-organized planet, and the natives aren’t happy about it. A puppet government may exist, but all real decisions are made by the local viceroy.',
    enemies: [
      'suspicious security personnel',
      'offworlder-hating natives',
      'local crime boss preying on rich offworlders',
    ],
    friends: [
      'native resistance leader',
      'colonial official seeking help',
      'native caught between the two sides',
    ],
    complications: [
      'natives won\'t talk to offworlders',
      'colonial represssion',
      'misunderstood local customs',
    ],
    things: [
      'relic of the resistance movement',
      'list of collaborators',
      'precious substance extracted by colonial labor',
    ],
    places: [
      'deep wilderness resistance camp',
      'city district off-limits to natives',
      'colonial labor site',
    ],
  },
  [worldTagKeys.culturalPower]: {
    key: worldTagKeys.culturalPower,
    name: 'Cultural Power',
    description: 'The world is a considerable cultural power in the sector, producing music, art, philosophy, or some similar intangible that their neighbors find irresistably attractive. Other worlds might have a profound degree of cultural cachet as the inheritor of some venerable artistic tradition.',
    enemies: [
      'murderously eccentric artist',
      'crazed fan',
      'failed artist with an obsessive grudge',
      'critic with a crusade to enact',
    ],
    friends: [
      'struggling young artist',
      'pupil of the artistic tradition',
      'scholar of the art',
      'offworlder hating the source of corrupting alien ways',
    ],
    complications: [
      'the art is slowly lethal to its masters',
      'the art ismentally or physically addictive',
      'the art is a fragment of ancient technical or military science',
    ],
    things: [
      'the instrument of a legendary master',
      'the only copy of a dead master\'s opus',
      'proof of intellectual property ownership',
    ],
    places: [
      'recording or performance studio',
      'public festival choked with tourists',
      'monument to the dead master of the art',
    ],
  },
  [worldTagKeys.cybercommunists]: {
    key: worldTagKeys.cybercommunists,
    name: 'Cybercommunists',
    description: 'On this world communism actually works, thanks to pretech computing devices and greater or lesser amounts of psychic precognition. Central planning nodes direct all production and employment on the world. Citizens in good standing have access to ample amounts of material goods for all needs and many wants. Instead of strife over wealth, conflicts erupt over political controls, cultural precepts, or control over the planning nodes. Many cybercommunist worlds show a considerable bias toward the private interests of those who run the planning nodes.',
    enemies: [
      'embittered rebel against perceived unfairness',
      'offworlder saboteur',
      'aspiring stalin-figure',
    ],
    friends: [
      'idealistic planning node tech',
      'cynical anti-corruption cop',
      'precognitive economist',
    ],
    complications: [
      'the pretech planning computers are breaking down',
      'the planning only works because the locals have been mentally or physically altered',
      'the planning computers can\'t handle the increasing population within the system',
    ],
    things: [
      'planning node computer',
      'wildly destabilizing commodity that can\'t be factored into plans',
      'a tremendous store of valuables made by accident',
    ],
    places: [
      'humming factory',
      'apartment block of perfectly equal flats',
      'mass demonstration of unity',
    ],
  },
  [worldTagKeys.cyborgs]: {
    key: worldTagKeys.cyborgs,
    name: 'Cyborgs',
    description: 'The planet\'s population makes heavy use of cybernetics, with many of the inhabitants possessing at least a cosmetic amount of chrome. This may be the result of a strong local cyber tech base, a religious injunction, or simply a necessary measure to survive the local conditions.',
    enemies: [
      'ambitious hacker of cyber implants',
      'cybertech oligarch',
      'researcher craving fresh offworlders',
      'cybered-up gang boss',
    ],
    friends: [
      'charity-woring implant physician',
      'idealistic young cyber researcher',
      'avant-garde activist',
    ],
    complications: [
      'the powerful and dangerous come here often for cutting-edge implants',
      'the cyber has some universal negative side-effect',
      'cyber and those implanted with it are forbidden to leave the planet as a tech security measure',
    ],
    things: [
      'unique prototype cyber implant',
      'secret research files',
      'a virus that debilitates cyborgs',
      'a cache of critically-needed therapeutic cyber',
    ],
    places: [
      'grimy slum chop-shop',
      'bloody lair of implant rippers',
      'stark plaza where everyone is seeing things through their augmented-reality cyber',
    ],
  },
  [worldTagKeys.cyclicalDoom]: {
    key: worldTagKeys.cyclicalDoom,
    name: 'Cyclical Doom',
    description: 'The world regularly suffers some apocalyptic catastrophe that wipes out organized civilization on it. The local culture is aware of this cycle and has traditions to ensure a fragment of civilization survives into the next era, but these traditions don\'t always work properly, and sometimes dangerous fragments of the past emerge.',
    enemies: [
      'offwolder seeking to trigger the apocalypse early for profit',
      'local recklessly taking advantage or preparation stores',
      'demagogue claiming the cycle is merely a myth of the authorities',
    ],
    friends: [
      'harried official working to prepare',
      'offworlder studying the cylcles',
      'local threatened by perils of the cycle\'s initial stages',
    ],
    complications: [
      'the cycles really are a myth of the authorities',
      'the cycles are controlled by alien constructs',
      'an outside power is interfering wiht preparation',
    ],
    things: [
      'a lost cache of ancien treasures',
      'tech or archives that will pinpoint the cycle\'s timing',
      'keycodes to bypass an ancient vault\'s security',
    ],
    places: [
      'lethally-defended vault of forgotten secrets',
      'starport crowded with panicked refugees',
      'town existing in the shadow of some monstrous monument to a former upheaval',
    ],
  },
  [worldTagKeys.desertWorld]: {
    key: worldTagKeys.desertWorld,
    name: 'Desert World',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.doomedWorld]: {
    key: worldTagKeys.doomedWorld,
    name: 'Doomed World',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.dyingRace]: {
    key: worldTagKeys.dyingRace,
    name: 'Dying Race',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.eugenicCult]: {
    key: worldTagKeys.eugenicCult,
    name: 'Eugenic Cult',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.exchangeConsulate]: {
    key: worldTagKeys.exchangeConsulate,
    name: 'Exchange Consulate',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.fallenHegemon]: {
    key: worldTagKeys.fallenHegemon,
    name: 'Fallen Hegemon',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.feralWorld]: {
    key: worldTagKeys.feralWorld,
    name: 'Feral World',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.flyingCities]: {
    key: worldTagKeys.flyingCities,
    name: 'Flying Cities',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.forbiddenTech]: {
    key: worldTagKeys.forbiddenTech,
    name: 'Forbidden Tech',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.formerWarriors]: {
    key: worldTagKeys.formerWarriors,
    name: 'Former Warriors',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.freakGeology]: {
    key: worldTagKeys.freakGeology,
    name: 'Freak Geology',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.freakWeather]: {
    key: worldTagKeys.freakWeather,
    name: 'Freak Weather',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.friendlyFoe]: {
    key: worldTagKeys.friendlyFoe,
    name: 'Friendly Foe',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.goldRush]: {
    key: worldTagKeys.goldRush,
    name: 'Gold Rush',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.greatWork]: {
    key: worldTagKeys.greatWork,
    name: 'Great Work',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.hatred]: {
    key: worldTagKeys.hatred,
    name: 'Hatred',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.heavyIndustry]: {
    key: worldTagKeys.heavyIndustry,
    name: 'Heavy Industry',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.heavyMining]: {
    key: worldTagKeys.heavyMining,
    name: 'Heavy Mining',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.hivemind]: {
    key: worldTagKeys.hivemind,
    name: 'Hivemind',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.holyWar]: {
    key: worldTagKeys.holyWar,
    name: 'Holy War',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.hostileBiosphere]: {
    key: worldTagKeys.hostileBiosphere,
    name: 'Hostile Biosphere',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.hostileSpace]: {
    key: worldTagKeys.hostileSpace,
    name: 'Hostile Space',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.immortals]: {
    key: worldTagKeys.immortals,
    name: 'Immortals',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.localSpecialty]: {
    key: worldTagKeys.localSpecialty,
    name: 'Local Specialty',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.localTech]: {
    key: worldTagKeys.localTech,
    name: 'Local Tech',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.majorSpaceyard]: {
    key: worldTagKeys.majorSpaceyard,
    name: 'Major Spaceyard',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.mandarinate]: {
    key: worldTagKeys.mandarinate,
    name: 'Mandarinate',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.mandateBase]: {
    key: worldTagKeys.mandateBase,
    name: 'Mandate Base',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.maneaters]: {
    key: worldTagKeys.maneaters,
    name: 'Maneaters',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.megacorps]: {
    key: worldTagKeys.megacorps,
    name: 'Megacorps',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.mercenaries]: {
    key: worldTagKeys.mercenaries,
    name: 'Mercenaries',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.minimalContact]: {
    key: worldTagKeys.minimalContact,
    name: 'Minimal Contact',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.misandryMisogyny]: {
    key: worldTagKeys.misandryMisogyny,
    name: 'Misandry/Misogyny',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.nightWorld]: {
    key: worldTagKeys.nightWorld,
    name: 'Night World',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.nomads]: {
    key: worldTagKeys.nomads,
    name: 'Nomads',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.oceanicWorld]: {
    key: worldTagKeys.oceanicWorld,
    name: 'Oceanic World',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.outOfContact]: {
    key: worldTagKeys.outOfContact,
    name: 'Out of Contact',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.outpostWorld]: {
    key: worldTagKeys.outpostWorld,
    name: 'Outpost World',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.perimeterAgency]: {
    key: worldTagKeys.perimeterAgency,
    name: 'Perimeter Agency',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.pilgrimageSite]: {
    key: worldTagKeys.pilgrimageSite,
    name: 'Pilgrimage Site',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.pleasureWorld]: {
    key: worldTagKeys.pleasureWorld,
    name: 'Pleasure World',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.policeState]: {
    key: worldTagKeys.policeState,
    name: 'Police State',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.postScarcity]: {
    key: worldTagKeys.postScarcity,
    name: 'Post-Scarcity',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.preceptorArchive]: {
    key: worldTagKeys.preceptorArchive,
    name: 'Preceptor Archive',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.pretechCultists]: {
    key: worldTagKeys.pretechCultists,
    name: 'Pretech Cultists',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.primitiveAliens]: {
    key: worldTagKeys.primitiveAliens,
    name: 'Primitive Aliens',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.prisonPlanet]: {
    key: worldTagKeys.prisonPlanet,
    name: 'Prison Planet',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.psionicsAcademy]: {
    key: worldTagKeys.psionicsAcademy,
    name: 'Psionics Academy',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.psionicsFear]: {
    key: worldTagKeys.psionicsFear,
    name: 'Psionics Fear',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.psionicsWorship]: {
    key: worldTagKeys.psionicsWorship,
    name: 'Psionics Worship',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.quarantinedWorld]: {
    key: worldTagKeys.quarantinedWorld,
    name: 'Quarantined World',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.radioactiveWorld]: {
    key: worldTagKeys.radioactiveWorld,
    name: 'Radioactive World',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.refugees]: {
    key: worldTagKeys.refugees,
    name: 'Refugees',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.regionalHegemon]: {
    key: worldTagKeys.regionalHegemon,
    name: 'Regional Hegemon',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.restrictiveLaws]: {
    key: worldTagKeys.restrictiveLaws,
    name: 'Restrictive Laws',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.revanchists]: {
    key: worldTagKeys.revanchists,
    name: 'Revanchists',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.revolutionaries]: {
    key: worldTagKeys.revolutionaries,
    name: 'Revolutionaries',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.rigidCulture]: {
    key: worldTagKeys.rigidCulture,
    name: 'Rigid Culture',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.risingHegemon]: {
    key: worldTagKeys.risingHegemon,
    name: 'Rising Hegemon',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.ritualCombat]: {
    key: worldTagKeys.ritualCombat,
    name: 'Ritual Combat',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.robots]: {
    key: worldTagKeys.robots,
    name: 'Robots',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.seagoingCities]: {
    key: worldTagKeys.seagoingCities,
    name: 'Seagoing Cities',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.sealedMenace]: {
    key: worldTagKeys.sealedMenace,
    name: 'Sealed Menace',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.secretMasters]: {
    key: worldTagKeys.secretMasters,
    name: 'Secret Masters',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.sectarians]: {
    key: worldTagKeys.sectarians,
    name: 'Sectarians',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.seismicInstability]: {
    key: worldTagKeys.seismicInstability,
    name: 'Seismic Instability',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.shackledWorld]: {
    key: worldTagKeys.shackledWorld,
    name: 'Shackled World',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.societalDespair]: {
    key: worldTagKeys.societalDespair,
    name: 'Societal Despair',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.soleSupplier]: {
    key: worldTagKeys.soleSupplier,
    name: 'Sole Supplier',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.tabooTreasure]: {
    key: worldTagKeys.tabooTreasure,
    name: 'Taboo Treasure',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.terraformFailure]: {
    key: worldTagKeys.terraformFailure,
    name: 'Terraform Failure',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.theocracy]: {
    key: worldTagKeys.theocracy,
    name: 'Theocracy',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.tombWorld]: {
    key: worldTagKeys.tombWorld,
    name: 'Tomb World',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.tradeHub]: {
    key: worldTagKeys.tradeHub,
    name: 'Trade Hub',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.tyranny]: {
    key: worldTagKeys.tyranny,
    name: 'Tyranny',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.unbrakedAi]: {
    key: worldTagKeys.unbrakedAi,
    name: 'Unbraked AI',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.urbanizedSurface]: {
    key: worldTagKeys.urbanizedSurface,
    name: 'Urbanized Surface',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.utopia]: {
    key: worldTagKeys.utopia,
    name: 'Utopia',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.warlords]: {
    key: worldTagKeys.warlords,
    name: 'Warlords',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.xenophiles]: {
    key: worldTagKeys.xenophiles,
    name: 'Xenophiles',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.xenophobes]: {
    key: worldTagKeys.xenophobes,
    name: 'Xenophobes',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
  [worldTagKeys.zombies]: {
    key: worldTagKeys.zombies,
    name: 'Zombies',
    description: '',
    enemies: [
      ''
    ],
    friends: [
      ''
    ],
    complications: [
      ''
    ],
    things: [
      ''
    ],
    places: [
      ''
    ],
  },
};
