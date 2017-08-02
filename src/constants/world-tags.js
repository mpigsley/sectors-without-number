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
    description: 'The world may have a breathable atmosphere and a human-tolerable temperature range, but it is an arid, stony waste outside of a few places made habitable by human effort. The deep wastes are largely unexplored and inhabited by outcasts and worse.',
    enemies: [
      'raider cheiftain',
      'crazed hermit',
      'angry isolationist',
      'paranoid mineral prospector',
      'strange desert beast',
    ],
    friends: [
      'native guide',
      'research biologist',
      'aspiring teraformer',
    ],
    complications: [
      'sandstorms',
      'water supply failuer',
      'native warfare over water rights',
    ],
    things: [
      'enormous water reservoir',
      'map of hidden wells',
      'pretech rainmaking equipment',
    ],
    places: [
      'oasis',
      '"The Empty Quarter" of the desert',
      'hidden underground cistern',
    ],
  },
  [worldTagKeys.doomedWorld]: {
    key: worldTagKeys.doomedWorld,
    name: 'Doomed World',
    description: 'The world is doomed, and the locals may or may not know it. Some cosmic catastrophe looms before them, and the locals have no realistic way to get everyone to safety. To the extent that the public is aware, society is disintegrating into a combination of religious fervor, abject hedonism, and savage violence.',
    enemies: [
      'crazed prophet of false salvation',
      'ruthless leader seking ot flee with their treasures',
      'cynical ship captain selling a one-way trip into hard vacuum as espace ot another world',
    ],
    friends: [
      'appealing waif or family head seeking escape',
      'offworld relief coordinator',
      'harried law officer',
    ],
    complications: [
      'the doom is false or won\'t actually kill everyone',
      'the doom was intentionally triggered by someone',
      'mass escape is possible if warring groups can somehow be brought to cooperate',
    ],
    things: [
      'clearance for a ship to leave the planet',
      'a cache of priceless cultural artifacts',
      'the life savings of someone trying to buy passage out',
      'data that would prove to the public the end is nigh',
    ],
    places: [
      'open square beneath a sky angry with a foretaste of the impending doom',
      'orgiastic celebration involving sex and murder in equal parts',
      'holy site full of desperate petitioners to the diving',
    ],
  },
  [worldTagKeys.dyingRace]: {
    key: worldTagKeys.dyingRace,
    name: 'Dying Race',
    description: 'The inhabitants of this world are dying out, and they know it. Through environmental toxins, hostile bio-weapons, or sheer societal despair, the culture cannot replenish its numbers. Members seek mean- ing in their own strange goals or peculiar faiths, though a few might struggle to find some way to reverse their slow yet inevitable doom.',
    enemies: [
      'hostile outsider who wants the locals dead',
      'offwolder seeking to take advantage of their weakened state',
      'invaders eager to push the locals out of their former lands',
    ],
    friends: [
      'one of the few youth amonth the population',
      'determined and hopeful reformer',
      'researcher seeking a new method of reproduction',
    ],
    complications: [
      'the dying culture\'s values were monstrous',
      'the race\'s death is somehow necessary to prevent some grand catastrophe',
      'the race is somehow convined they deserve this fate',
    ],
    things: [
      'extremely valuable reproductive tech',
      'treasured artifacts of the former age',
      'bioweapon used on the race',
    ],
    places: [
      'city streets devoid of pedestrians',
      'mighty edifice now crumbling with disrepair',
      'small dwelling full of people ina town now othewise empty',
    ],
  },
  [worldTagKeys.eugenicCult]: {
    key: worldTagKeys.eugenicCult,
    name: 'Eugenic Cult',
    description: 'Even in the days before the Silence, major improvement of the human genome always seemed to come with unacceptable side-effects. Some worlds host secret cults that perpetuate these improvements regardless of the cost, and a few planets have been taken over entirely by the cults.',
    enemies: [
      'eugenic superiority fanatic',
      'mentally unstable hom superior',
      'mad eugenic scientist',
    ],
    friends: [
      'eugenic propagandist',
      'biotechnical investigator',
      'local seeking revenge on cult',
    ],
    complications: [
      'the altered cultists look human',
      'the locals are terrified of any unusual physical appearance',
      'the genetic modifications, and drawbacks, are contagious with long exposure',
    ],
    things: [
      'serum that induces the alterations',
      'elixir that reverses the alteration',
      'pretech biotechnical databanks',
      'list of secret cult sympathizers',
    ],
    places: [
      'eugenic breeding pit',
      'isolated settlement of altered humans',
      'public placeinfiltrated by cult sympathizers',
    ],
  },
  [worldTagKeys.exchangeConsulate]: {
    key: worldTagKeys.exchangeConsulate,
    name: 'Exchange Consulate',
    description: 'The Exchange of Light once served as the largest, most trusted banking and diplomatic service in human space. Even after the Silence, some worlds retain a functioning Exchange Consulate where banking services and arbitration can be arranged.',
    enemies: [
      'corrupt exchange official',
      'indebted native who thinks the players are exchange agents',
      'exchange official dunning the players for debts occured',
    ],
    friends: [
      'consul in need of offworld help',
      'local banker seeking to hurt his competition',
      'exchange diplomat',
    ],
    complications: [
      'the local consulate has been corrupted',
      'the consulate is cut off from its funds',
      'a powerful debtor refuses to pay',
    ],
    things: [
      'exchange vault codes',
      'wealth hidden to conceal it from a bankruptcy judgement',
      'location of forgotten vault',
    ],
    places: [
      'consulate meeting chamber',
      'meeting site between factious disputants',
      'exchange vault',
    ],
  },
  [worldTagKeys.fallenHegemon]: {
    key: worldTagKeys.fallenHegemon,
    name: 'Fallen Hegemon',
    description: 'At some point in the past, this world was a hegemonic power over some or all of the sector, thanks to superior tech, expert diplomacy, the weakness of their neighbors, or inherited Mandate legitimacy. Some kind of crash or revolt broke their power, however, and now the world is littered with the wreckage of former glory.',
    enemies: [
      'bitter pretender to a meaningless throne',
      'resentful official dreaming of empire',
      'vengeful offworlder seeing to punish their old rulers',
    ],
    friends: [
      'realistic local leader trying to hold things together',
      'scholar of past glories',
      'refugee from an overthrown colonial enclave',
    ],
    complications: [
      'the hegemon\'s rule was enlightened and fair',
      'it collapsed due to its own internal strife rather than external resistance',
      'it pretends that nothing has happened to its power',
      'it\'s been counter-colonized by vengeful outsiders',
    ],
    things: [
      'precious insignia of former rule',
      'relic tech important to its power',
      'plundered colonial artifact',
    ],
    places: [
      'palace far too grand for its current occupant',
      'oversized spaceport now in disrepair',
      'boulevard lined with monuments to past glories',
    ],
  },
  [worldTagKeys.feralWorld]: {
    key: worldTagKeys.feralWorld,
    name: 'Feral World',
    description: 'In the long, isolated night of the Silence, some worlds have experienced total moral and cultural collapse. Whatever remains has been twisted beyond recognition into assorted death cults, xenophobic fanaticism, horrific cultural practices, or other behavior unacceptable on more enlightened worlds. These worlds are almost invariably quarantined by other planets.',
    enemies: [
      'decadent noble',
      'mad cultist',
      'xenophobic local',
      'cannibal chief',
      'maltech researcher',
    ],
    friends: [
      'trapped outworlder',
      'aspiring reformer',
      'native wanting to avoid traditional flensing',
    ],
    complications: [
      'horrific local "celebration"',
      'inexplicable and repugnant social rules',
      'taboo zones and people',
    ],
    things: [
      'terribly misused piece of pretech',
      'wealth accumulated through brutal evildoing',
      'valuable possesion owned by luckless outworlder victim',
    ],
    places: [
      'atrocity amphitheater',
      'traditional torture parlor',
      'ordinary location twisted into something terrible',
    ],
  },
  [worldTagKeys.flyingCities]: {
    key: worldTagKeys.flyingCities,
    name: 'Flying Cities',
    description: 'Perhaps the world is a gas giant, or plagued with unendurable storms at lower levels of the atmosphere. For whatever reason, the cities of this world fly above the surface of the planet. Perhaps they remain stationary, or perhaps they move from point to point in search of resources.',
    enemies: [
      'rival city pilot',
      'tech thief attempting to steal outworld gear',
      'saboteur or scavenger plundering the city\'s tech',
    ],
    friends: [
      'maintenance tech in need of help',
      'city defence force pilot',
      'meteorological researcher',
    ],
    complications: [
      'sudden storms',
      'drastic altitude loss',
      'rival city attacks',
      'vital machinery breaks down',
    ],
    things: [
      'precious reined atmostpheric gases',
      'pretech grav engine plans',
      'meteorological codex predicting future storms',
    ],
    places: [
      'underside of the city',
      'the one calm place on the planet\'s surface',
      'catwalks stretching over unimaginable gulfs below',
    ],
  },
  [worldTagKeys.forbiddenTech]: {
    key: worldTagKeys.forbiddenTech,
    name: 'Forbidden Tech',
    description: 'Some group on this planet fabricates or uses maltech. Unbraked AIs doomed to metastasize into insanity, nation-destroying nanowarfare particles, slow-burn DNA corruptives, genetically engineered slaves, or something worse still. The planet’s larger population may or may not be aware of the danger in their midst.',
    enemies: [
      'mad scientist',
      'maltech buyer from offworld',
      'security enforcer',
    ],
    friends: [
      'victim of maltech',
      'permieter agent',
      'investigative reporter',
      'conventional arms merchant',
    ],
    complications: [
      'the maltech is being fabricated by an unbraked AI',
      'the government depends on revenue from maltech sales to offworlders',
      'citizens insist that it\'s not really maltech',
    ],
    things: [
      'maltech research data',
      'the maltech itself',
      'precious pretech equipment used to create it',
    ],
    places: [
      'horrific laboratory',
      'hellscape sculpted by the maltech\'s use',
      'government building meeting room',
    ],
  },
  [worldTagKeys.formerWarriors]: {
    key: worldTagKeys.formerWarriors,
    name: 'Former Warriors',
    description: 'The locals of this world were once famed for their martial prowess. They may have simply had a very militaristic culture, or were genetically engineered for combat, or developed high-tech weaponry, or had brilliant leadership. Those days are past, however, either due to crushing defeat, external restrictions, or a cultural turn toward peace.',
    enemies: [
      'unreformed warlord leader',
      'bitter mercenary chief',
      'victim of their warfare seeking revenge',
    ],
    friends: [
      'partisan of the new peaceful ways',
      'outsider desperate for military aid',
      'martial genius repressed by the new dispensation',
    ],
    complications: [
      'neighboring worlds want them pacified or dead',
      'they only ever used their arts in self-defense',
      'the source of their gifts has been "turned off" in a reversible way',
    ],
    things: [
      'war trophy taken from a defeated foe',
      'key to re-activating their martial ways',
      'secret cache of high-tech military gear',
    ],
    places: [
      'cemetery of dead heroes',
      'memorial hall now left to dust and silence',
      'monument plaza dedicated to the new culture',
    ],
  },
  [worldTagKeys.freakGeology]: {
    key: worldTagKeys.freakGeology,
    name: 'Freak Geology',
    description: 'The geology or geography of this world is simply freakish. Perhaps it’s composed entirely of enormous mountain ranges, or regular bands of land and sea, or the mineral structures all fragment into perfect cubes. The locals have learned to deal with it and their culture will be shaped by its requirements.',
    enemies: [
      'crank xenogeologist',
      'cultist who believes it\'s the work of aliens',
    ],
    friends: [
      'research scientist',
      'prospector',
      'artist',
    ],
    complications: [
      'local conditions that no one remembers to tell offworlders about',
      'lethal weather',
      'seismic activity',
    ],
    things: [
      'unique crystal formations',
      'hidden veins of a major precious mineral strike',
      'deed to a location of great natural beauty',
    ],
    places: [
      'atop a bizarrre geological formation',
      'tourist resort catering to offworlders',
    ],
  },
  [worldTagKeys.freakWeather]: {
    key: worldTagKeys.freakWeather,
    name: 'Freak Weather',
    description: 'The planet is plagued with some sort of bizarre or hazardous weather pattern. Perhaps city-flattening storms regularly scourge the surface, or the world’s sun never pierces its thick banks of clouds.',
    enemies: [
      'criminal using the weather as a cover',
      'weather cultists convinced the offworlders are responsible for some disaster',
      'native predators dependent on the weather',
    ],
    friends: [
      'meteorological researcher',
      'holodoc crew wanting shots of the weather',
    ],
    complications: [
      'the weather itself',
      'malfuncitoning pretech teraforming engines that cause the weather',
    ],
    things: [
      'wind-scoured deposits of precious minerals',
      'holorecords of a spectacularly and rare weather pattern',
      'maturally-sculpted objects of intricate beauty',
    ],
    places: [
      'eye of the storm',
      'the one sunlit place',
      'terraforming control room',
    ],
  },
  [worldTagKeys.friendlyFoe]: {
    key: worldTagKeys.friendlyFoe,
    name: 'Friendly Foe',
    description: 'Some hostile alien race or malevolent cabal has a branch or sect on this world that is actually quite friendly toward outsiders. For whatever internal reason, they are willing to negotiate and deal honestly with strangers, and appear to lack the worst impulses of their fellows.',
    enemies: [
      'driven hater of all their kind',
      'internal malcontent bent on creature conflict',
      'secret master who seeks to lure trust',
    ],
    friends: [
      'well-meaning bug-eyed monster',
      'principled eugenics cultist',
      'suspicious investigator',
    ],
    complications: [
      'the group actually is a sharmless anbenevolent as they seem',
      'the group offers a vital service at the cost of moral compromise',
      'the group still feels bonds of affiliation with their hostile brethren',
    ],
    things: [
      'forbidden xenotech',
      'eugenic biotech template',
      'evidence to convince others of their kind they are right',
    ],
    places: [
      'repurposed maltech laboratory',
      'alien conclave building',
      'widely-feared starship interior',
    ],
  },
  [worldTagKeys.goldRush]: {
    key: worldTagKeys.goldRush,
    name: 'Gold Rush',
    description: 'Gold, silver, and other conventional precious minerals are common and cheap now that asteroid mining is practical for most worlds. But some minerals and compounds remain precious and rare, and this world has recently been discovered to have a supply of them. People from across the sector have come to strike it rich.',
    enemies: [
      'paranoid prospector',
      'aspiring mining tycoon',
      'rapacious merchant',
    ],
    friends: [
      'claim-jumped miner',
      'native alien',
      'curious tourist',
    ],
    complications: [
      'the strike is a hoax',
      'the strike is of a dangerous toxic substance',
      'export of the mineral is prohibited by the planetary government',
      'the native aliens live around the strike\'s location',
    ],
    things: [
      'cases of the refined element',
      'pretech mining equipment',
      'a dead prospector\'s claim deed',
    ],
    places: [
      'secret mine',
      'native alien village',
      'processing plant',
      'boom town',
    ],
  },
  [worldTagKeys.greatWork]: {
    key: worldTagKeys.greatWork,
    name: 'Great Work',
    description: 'The locals are obsessed with completing a massive project, one that has consumed them for generations. It might be the completion of a functioning spaceyard, a massive solar power array, a network of terraforming engines, or the universal conversion of their neighbors to their own faith. The purpose of their entire civilization is to progress and some day complete the work.',
    enemies: [
      'local planning to sacrifice the PCs for the work',
      'local who thinks the PCs threten the work',
      'obsessive zealot ready to destroy someone or something important to the PCs for the sake of the work',
    ],
    friends: [
      'outsider studying the work',
      'local with a more temperate attitude',
      'supplier of work materials',
    ],
    complications: [
      'the work is totally hopeless',
      'different factions disagree on what the work is',
      'an outside power is determined to thwart the work',
    ],
    things: [
      'vital supplies for th work',
      'plans that have been lost',
      'tech that greatly speeds the work',
    ],
    places: [
      'a bustling work site',
      'ancestral worker housing',
      'local community made only semi-livable by the demands of the work',
    ],
  },
  [worldTagKeys.hatred]: {
    key: worldTagKeys.hatred,
    name: 'Hatred',
    description: 'For whatever reason, this world’s populace has a burning hatred for the inhabitants of a neighboring system. Perhaps this world was colonized by exiles, or there was a recent interstellar war, or ideas of racial or religious superiority have fanned the hatred. Regardless of the cause, the locals view their neighbor and any sympathizers with loathing.',
    enemies: [
      'native conviced that the offworlders are agents of Them',
      'cynical politician in need of scapegoats',
    ],
    friends: [
      'intelligence agent needing catspaws',
      'holodoc producers needing "an inside look"',
      'unlucky offworlder from the hated system',
    ],
    complications: [
      'the characters are wearing or using items from the hated world',
      'the characters are known to have done business there',
      'the characters "look like" the hated others',
    ],
    things: [
      'proof of Their evildoings',
      'reward for turning in enemy agents',
      'relic stolen by Them years ago',
    ],
    places: [
      'war crimes museum',
      'atrocity site',
      'captured and decommissioned spacehsip kept as a trophy',
    ],
  },
  [worldTagKeys.heavyIndustry]: {
    key: worldTagKeys.heavyIndustry,
    name: 'Heavy Industry',
    description: 'With interstellar transport so limited in the bulk it can move, worlds have to be largely self-sufficient in industry. Some worlds are more sufficient than others, however, and this planet has a thriving manufacturing sector capable of producing large amounts of goods appropriate to its tech level. The locals may enjoy a correspondingly higher lifestyle, or the products might be devoted towards vast projects for the aggrandizement of the rulers.',
    enemies: [
      'tycoon monopolist',
      'industrial spy',
      'malcontent revolutionary',
    ],
    friends: [
      'aspiring entrepreneur',
      'worker union leader',
      'ambitious inventor',
    ],
    complications: [
      'the factories are toxic',
      'the resources extractable at their tech level are running out',
      'the masses required the factory output for survival',
      'the industries\' major output is being obsoleted by offworld tech',
    ],
    things: [
      'confidential industrial data',
      'secret union membership lists',
      'ownership shares in an industrial complex',
    ],
    places: [
      'factory floor',
      'union meeting hall',
      'toxic waste dump',
      'R&D complex',
    ],
  },
  [worldTagKeys.heavyMining]: {
    key: worldTagKeys.heavyMining,
    name: 'Heavy Mining',
    description: 'This world has large stocks of valuable minerals, usually necessary for local industry, life support, or refinement into loads small enough to export off- world. Major mining efforts are necessary to extract the minerals, and many natives work in the industry.',
    enemies: [
      'Mine boss',
      'tunnel saboteur',
      'subterranean predators',
    ],
    friends: [
      'hermit prospector',
      'offworld investigator',
      'miner\'s union representative',
    ],
    complications: [
      'the refinery equipment breaks down',
      'tunnel collapse',
      'silicate life forms growing in the miner\'s lungs',
    ],
    things: [
      'the mother lode',
      'smuggled case of refined mineral',
      'silicate faked crystalline mineral samples',
    ],
    places: [
      'vertical mine face',
      'tailing piles',
      'roaring smelting complex',
    ],
  },
  [worldTagKeys.hivemind]: {
    key: worldTagKeys.hivemind,
    name: 'Hivemind',
    description: 'Natives of this world exist in a kind of mental gestalt, sharing thoughts and partaking of a single identity. Powerful pretech, exotic psionics, alien influence, or some other cause has left the world sharing one identity. Individual members may have greater or lesser degrees of effective coordination with the whole.',
    enemies: [
      'a hivemind that wants to assimilate outsiders',
      'a hivemind that has no respect for unoined life',
      'a hivemind that fears and hates unjoined life',
    ],
    friends: [
      'a scholar studying the hivemind',
      'a person severed from the gestalt',
      'a relative of someone who has been assimilated',
    ],
    complications: [
      'the hivemind only functions on this world',
      'the hivemind has strict range limits',
      'the hivemind has different personality factions',
      'the hivemind only happens at particular times',
      'the world is made of semi-sentient drones and a single AI',
    ],
    things: [
      'vital tech for maintaining the mind',
      'precious treasure held by now-assimilated outsider',
      'tech that "blinds" the hivemind ot the tech\'s users',
    ],
    places: [
      'barely tolerable living cells for individuals',
      'workside where individuals casually die in their labors',
      'community with absolutely no social or group-gathering facilities',
    ],
  },
  [worldTagKeys.holyWar]: {
    key: worldTagKeys.holyWar,
    name: 'Holy War',
    description: 'A savage holy war is raging on this world, either between factions of locals or as a united effort against the pagans of some neighboring world. This war might involve a conventional religion, or it might be the result of a branding campaign, political ideology, artistic movement, or any other cause that people use as a substitute for traditional religion.',
    enemies: [
      'blood-mad pontiff',
      'coldly cynical secular leader',
      'totalitarian political demagogue',
    ],
    friends: [
      'desperate peacemaker',
      'hard-pressed refugee of the fighting',
      'peaceful religious leader who lost the internal debate',
    ],
    complications: [
      'the targets of the war really are doing something diabolically horrible',
      'the holy war is just a mask for a very traditional casus belli',
      'the leaders don\'t want the war won but only prolonged',
      'both this world and the target of the war are religious-obsessed',
    ],
    things: [
      'sacred relic of the faith',
      'a captured blasphemer under a death sentence',
      'plunder seized in battle',
    ],
    places: [
      'massive holy structure',
      'razed community of infidels',
      'vast shrine to the martyrs dead in war',
    ],
  },
  [worldTagKeys.hostileBiosphere]: {
    key: worldTagKeys.hostileBiosphere,
    name: 'Hostile Biosphere',
    description: 'The world is teeming with life, and it hates humans. Perhaps the life is xenoallergenic, forcing filter masks and tailored antiallergens for survival. It could be the native predators are huge and fearless, or the toxic flora ruthlessly outcompetes earth crops.',
    enemies: [
      'local fauna',
      'nature cultist',
      'native aliens',
      'calous labor overseer',
    ],
    friends: [
      'xenobiologist',
      'tourist on safari',
      'grizzled local guide',
    ],
    complications: [
      'filter masks fail',
      'parasitic alien infestation',
      'crop greenhouses lose bio-integrity',
    ],
    things: [
      'valuable native biological extract',
      'abandoned colony vault',
      'remains of an unsuccessful expedition',
    ],
    places: [
      'deceptively peacful glade',
      'steaming polychrome jungle',
      'nightfall when surrounded by Things',
    ],
  },
  [worldTagKeys.hostileSpace]: {
    key: worldTagKeys.hostileSpace,
    name: 'Hostile Space',
    description: 'The system in which the world exists is a dangerous neighborhood. Something about the system is perilous to inhabitants, either through meteor swarms, stellar radiation, hostile aliens in the asteroid belt, or periodic comet clouds.',
    enemies: [
      'alien raid leader',
      'meteor-launching terrorists',
      'paranoid local leader',
    ],
    friends: [
      'astronomic researcher',
      'local defense commander',
      'early warning monitor agent',
    ],
    complications: [
      'the natives believe the danger is divine chastisement',
      'the natives blame outworlders for the danger',
      'the native elite profit from the danger in some way',
    ],
    things: [
      'early warning of a raid or impact',
      'abandoned riches in a disaster zone',
      'key to a secure bunker',
    ],
    places: [
      'city watching an approaching asteroid',
      'village burnt in an alien raid',
      'massive ancient crater',
    ],
  },
  [worldTagKeys.immortals]: {
    key: worldTagKeys.immortals,
    name: 'Immortals',
    description: 'Natives of this world are effectively immortal. They may have been gengineered for tremendous lifespans, or have found some local anagathic, or be cyborg life forms, or be so totally convinced of reincarnation that death is a cultural irrelevance. Any immortality technique is likely applicable only to them, or else it\'s apt to be a massive draw to outside imperialists.',
    enemies: [
      'outsider determined to steal immortality',
      'smug local convinced of their immortal wisdom to rule all',
      'offworlder seeking the world\'s ruin before it becomes a threat to all',
    ],
    friends: [
      'curious longevity researcher',
      'thrill-seeking local',
    ],
    complications: [
      'immortality requires doing something that outsiders can\'t or won\'t willingly do',
      'the immortality ends if they leave the world',
      'death is the punishment for even minor crimes',
      'immortals must die or go offworld after a certain span',
      'immortality has brutal side-effects',
    ],
    things: [
      'immortality drug',
      'masterwork of an ageless artisan',
      'toxin that only affects immortals',
    ],
    places: [
      'community with no visible children',
      'unchanging structure of obvious ancient age',
      'cultural performance relying on a century of in-jokes',
    ],
  },
  [worldTagKeys.localSpecialty]: {
    key: worldTagKeys.localSpecialty,
    name: 'Local Specialty',
    description: 'The world may be sophisticated or barely capable of steam engines, but either way it produces something rare and precious to the wider galaxy. It might be some pharmaceutical extract produced by a secret recipe, a remarkably popular cultural product, or even gengineered humans uniquely suited for certain work.',
    enemies: [
      'monopolist',
      'offworlder seeking prohibition of the specialty',
      'native who views the specialty as sacred',
    ],
    friends: [
      'spy searching for the source',
      'artisan seeking protection',
      'exporter with problems',
    ],
    complications: [
      'the specialty is repugnant in nature',
      'the crafters refuse to sell to offworlders',
      'the specialty is made in a remote, dangerous place',
      'the crafters don\'t make the specialty any more',
    ],
    things: [
      'the specialty itself',
      'the secret recipe',
      'sample of a new improved variety',
    ],
    places: [
      'secret manufactory',
      'hidden cache',
      'artistic competition for best artisan',
    ],
  },
  [worldTagKeys.localTech]: {
    key: worldTagKeys.localTech,
    name: 'Local Tech',
    description: 'The locals can create a particular example of ex- tremely high tech, possibly even something that ex- ceeds pretech standards. They may use unique local resources to do so, or have stumbled on a narrow scientific breakthrough, or still have a functional experimental manufactory.',
    enemies: [
      'keeper of the tech',
      'offworld industrialist',
      'automated defenses that suddenly come alive',
      'native alien mentors',
    ],
    friends: [
      'curious offworld scientist',
      'eager tech buyer',
      'native in need of technical help',
    ],
    complications: [
      'the tech is unreliable',
      'the tech only works on this world',
      'the tech hs poorly-understood side effects',
      'the tech is alien in nature',
    ],
    things: [
      'the tech itself',
      'an unclaimed payment for a large shipment',
      'the secret blueprints for its construction',
      'an ancient alien R&D database',
    ],
    places: [
      'alien factory',
      'lethal R&D center',
      'tech brokerage vault',
    ],
  },
  [worldTagKeys.majorSpaceyard]: {
    key: worldTagKeys.majorSpaceyard,
    name: 'Major Spaceyard',
    description: 'Most worlds of tech level 4 or greater have the necessary tech and orbital facilities to build spike drives and starships. This world is blessed with a major spaceyard facility, either inherited from before the Silence or painstakingly constructed in more recent decades. It can build even capital-class hulls, and do so more quickly and cheaply than its neighbors.',
    enemies: [
      'enemy saboteur',
      'industrial spy',
      'scheming construction tycoon',
      'aspiring ship hijacker',
    ],
    friends: [
      'captain stuck in drydock',
      'maintenance chief',
      'mad innovator',
    ],
    complications: [
      'the spaceyard is an alien relic',
      'the spaceyard is burning out from overuse',
      'the spaceyard is alive',
      'the spaceyard relies on maltech to function',
    ],
    things: [
      'intellectual property-locked pretech blueprints',
      'override keys for activating old pretech facilities',
      'a purchased but unclaimed spaceship',
    ],
    places: [
      'hidden shipyard bay',
      'surface of a partially-complete ship',
      'ship scrap graveyard',
    ],
  },
  [worldTagKeys.mandarinate]: {
    key: worldTagKeys.mandarinate,
    name: 'Mandarinate',
    description: 'The planet is ruled by an intellectual elite chosen via ostensibly neutral examinations or tests. The values this system selects for may or may not have anything to do with actual practical leadership skills, and the examinations may be more or less corruptible.',
    enemies: [
      'corrupt test administrator',
      'incompetent but highly-rated graduate',
      'ruthless leader of a clan of high-testing relations',
    ],
    friends: [
      'crusader for test reform',
      'talented but poorly-connected graduate',
      'genius who tests badly',
    ],
    complications: [
      'the test is totally unrelated to necessary governing skills',
      'the test was very pertinent in the past but tech or culture has changes',
      'the test is for a skill that is vital to maintaining society but irrelevant to day-to-day governance',
      'the test is a sham and passage is based on wealth or influence',
    ],
    things: [
      'answer key to the next test',
      'lost essay of incredible merit',
      'proof of cheating',
    ],
    places: [
      'massive structure full of test-taking cubicles',
      'school filled with desperate students',
      'ornate government building decorated with scholarly quotes and academic images',
    ],
  },
  [worldTagKeys.mandateBase]: {
    key: worldTagKeys.mandateBase,
    name: 'Mandate Base',
    description: 'The Terran Mandate retained its control over this world for much longer than usual, and the world may still consider itself a true inheritor of Mandate legitimacy. Most of these worlds have or had superior technology, but they may still labor under the burden of ancient restrictive tech or monitoring systems designed to prevent them from rebelling.',
    enemies: [
      'deranged mandate monitoring AI',
      'aspiring sector ruler',
      'demagogue preaching local superiority over "traitorous rebel worlds"',
    ],
    friends: [
      'idealistic do-gooder local',
      'missionary for advanced mandate tech',
      'outsider seeking lost data from Mandate records',
    ],
    complications: [
      'the monitoring system forces the locals to behave in aggressive ways toward "rebel" worlds',
      'the monitoring system severely hiders offworld use of their tech',
      'the original colonists are all dead and have been replaced by outsiders who don\'t understand all the details',
    ],
    things: [
      'ultra-advanced pretech',
      'Mandate military gear',
      'databank containing precious tech schematics',
    ],
    places: [
      'faded Mandate offices still in use',
      'vault containing ancient pretech',
      'carefully-maintained monument to Mandate glory',
    ],
  },
  [worldTagKeys.maneaters]: {
    key: worldTagKeys.maneaters,
    name: 'Maneaters',
    description: 'The locals are cannibals, either out of necessity or out of cultural preference. Some worlds may actually eat human flesh, while others simply require the rendering of humans into important chemicals or pharmaceutical compounds, perhaps to prolong the lives of ghoul overlords. This cannibalism plays a major role in their society.',
    enemies: [
      'ruthless ghoul leader',
      'chieftan of a ravenous tribe',
      'sophisticated degenerate preaching the splendid authenticity of cannibalism',
    ],
    friends: [
      'sympathetic local fleeing the fork',
      'escapee from a pharmaceutical rendering plant',
      'reformer seeking to break the custom or its necessity',
    ],
    complications: [
      'local food or environmental conditions make human consumption grimly necessary',
      'the locals farm human beings',
      'outsiders are expected to join in the custom',
      'the custom is totally unnecessary but jealously maintained by the people',
    ],
    things: [
      'belongings of a recent meal',
      'an offworlder VIP due for the menu',
      'a toxin that makes human flesh lethal to consumers',
    ],
    places: [
      'hideous human abattoir',
      'extremely civilized restaurant',
      'funeral-home-cum-kitchen',
    ],
  },
  [worldTagKeys.megacorps]: {
    key: worldTagKeys.megacorps,
    name: 'Megacorps',
    description: 'The world is dominated by classic cyberpunk-esque megacorporations, each one far more important than the vestigial national remnants that encompass them. These megacorps are usually locked in a cold war, trading and dealing with each other even as they try to strike in deniable ways. An over-council of corporations usually acts to bring into line any that get excessively overt in their activities.',
    enemies: [
      'megalomaniacal executive',
      'underling looking to use the PCs as catspaws',
      'ruthless mercenary who wants what the PCs have',
    ],
    friends: [
      'victim of megacorp scheming',
      'offworlder merchant in far over their head',
      'local reformer struggling to cope with megacorp indifference',
    ],
    complications: [
      'the megacorps are the only source of something vital to life on this world',
      'an autonomous Mandate system acts to punish excessively overt violence',
      'the megacorps are struggling against much more horrible national governments',
    ],
    things: [
      'blackmail on a megacorp exec',
      'keycodes to critical corp secrets',
      'proof of corp responsibility for a heinously unacceptable public atrocity',
      'data on a vital new product line coming out soon',
    ],
    places: [
      'a place plastered in megacorp ads',
      'a public plaza discreetly branded',
      'private corp military base',
    ],
  },
  [worldTagKeys.mercenaries]: {
    key: worldTagKeys.mercenaries,
    name: 'Mercenaries',
    description: 'The world is either famous for its mercenary bands or it is plagued by countless groups of condottieri in service to whatever magnate can afford to pay or bribe them adequately.',
    enemies: [
      'moral mercenary leader',
      'rich offworlder trying to buy rule of the world',
      'mercenary press gang chief forcing locals into service',
    ],
    friends: [
      'young and idealistic mercenary chief',
      'harried leader of enfeebled national army',
      'offworlder trying to hire help for a noble cause',
    ],
    complications: [
      'the mercenaries area ll that stand between the locals and a hungry imperial power',
      'the mercenaries are remnants of a former offial army',
      'the mercenaries hardly ever actually fight as compared to taking bribes to walk away',
    ],
    things: [
      'lost mercenary payroll shipment',
      'forbidden military tech',
      'proof of a band\'s impending treachery against their employers',
    ],
    places: [
      'shabby camp of undisciplined mercs',
      'burnt-out village occupied by mercenaries',
      'luxurious and exceedingly well-defended merc leader villa',
    ],
  },
  [worldTagKeys.minimalContact]: {
    key: worldTagKeys.minimalContact,
    name: 'Minimal Contact',
    description: 'The locals refuse most contact with offworlders. Only a small, quarantined treaty port is provided for offworld trade, and ships can expect an exhaustive search for contraband. Local governments may be trying to keep the very existence of interstellar trade a secret from their populations, or they may simply consider offworlders too dangerous or repugnant to be allowed among the population.',
    enemies: [
      'customs official',
      'xenophobic natives',
      'existing merchant who doesn\'t like competition',
    ],
    friends: [
      'aspiring tourist',
      'anthropological researcher',
      'offworld thief',
      'religious missionary',
    ],
    complications: [
      'the locals carry a disease harmless to them and lethal to outsiders',
      'the locals hide dark purposes from offworlders',
      'the locals have something desperately needed but won\'t bring it into the treaty port',
    ],
    things: [
      'contraband trade goods',
      'security perimeter codes',
      'black market local products',
    ],
    places: [
      'treaty port bar',
      'black market zone',
      'secret smuggler landing site',
    ],
  },
  [worldTagKeys.misandryMisogyny]: {
    key: worldTagKeys.misandryMisogyny,
    name: 'Misandry/Misogyny',
    description: 'The culture on this world holds a particular gender in contempt. Members of that gender are not permitted positions of formal power, and may be restricted in their movements and activities. Some worlds may go so far as to scorn both traditional genders, using gengineering techniques to hybridize or alter conventional human biology.',
    enemies: [
      'cultural fundamentalist',
      'cultural missionary to outworlders',
      'local rebel driven to pointless and meaningless violence',
    ],
    friends: [
      'oppressed native',
      'research scientist',
      'offworld emancipationist',
      'local reformer',
    ],
    complications: [
      'the oppressed gender is restive against the customs',
      'the oppressed gender largely supports the customs',
      'the customs relate to some physical quality of the world',
      'the oppressed gender has had maltech gengineering done to "tame" them',
    ],
    things: [
      'aerosol reversion formula for undoing genginerring docility',
      'hidden history of the world',
      'pretech gengineering equipment',
    ],
    places: [
      'shrine to the virtues of the favored gender',
      'security center for controlling the oppressed',
      'gengineering lab',
    ],
  },
  [worldTagKeys.nightWorld]: {
    key: worldTagKeys.nightWorld,
    name: 'Night World',
    description: 'The world is plunged into eternal darkness. The only life on this planet derives its energy from other sources, such as geothermal heat, extremely volatile chemical reactions in the planet\'s soil, or light in a non-visible spectrum. Most flora and fauna is voraciously eager to consume other life.',
    enemies: [
      'monstrous thing from the night',
      'offworlder finding the obscurity of the world convenient for dark purposes',
      'mad scientist experimenting with local life',
    ],
    friends: [
      'curious offworlder researcher',
      'hard-pressed colony leader',
      'high priest of a sect that finds religious significance in the night',
    ],
    complications: [
      'daylight comes as a cataclysmic event at very long intervals',
      'light causes very dangerous reactions to native life or chemicals here',
      'the locals have been gengineered to exist without light',
    ],
    things: [
      'rare chemicals created in the darkness',
      'light source usable on this world',
      'smuggler cache hidden here in ages past',
    ],
    places: [
      'formlessly pitch-black wilderness',
      'sea without a sun',
      'location defined by sounds or smells',
    ],
  },
  [worldTagKeys.nomads]: {
    key: worldTagKeys.nomads,
    name: 'Nomads',
    description: 'Most of the natives of this world are nomadic, usually following a traditional cycle of movement through the lands they possess. Promises of rich plunder or local environmental perils can force these groups to strike out against neighbors. Other groups are forced to move constantly due to unpredictable dangers that crop up on the planet.',
    enemies: [
      'desperate tribal leader who needs what the PCs have',
      'ruthless raider chieftain',
      'leader seeking to weld the nomads into an army',
    ],
    friends: [
      'free-spirited young nomad',
      'dreamer imagining a stable life',
      'offwolder enamoured of the life',
    ],
    complications: [
      'an irresistably lethal swarm of native life forces locals to move regularly',
      'ancient defense systems destroy too-long-stationary communities',
      'local chemical patches require careful balancing of exposure times to avoid side effects',
    ],
    things: [
      'cache of rare and precious resource',
      'plunder seized by a tribal raid',
      'tech that makes a place safe for long-term inhabitation',
    ],
    places: [
      'temporary nomad camp',
      'oasis or resource reserve',
      'trackless waste that kills the unprepared',
    ],
  },
  [worldTagKeys.oceanicWorld]: {
    key: worldTagKeys.oceanicWorld,
    name: 'Oceanic World',
    description: 'The world is entirely or almost entirely covered with liquid water. Habitations might be floating cities, or might cling precariously to the few rocky atolls jutting up from the waves, or are planted as bubbles on promontories deep beneath the stormy surface. Survival depends on aquaculture. Planets with inedible alien life rely on gengineered Terran sea crops.',
    enemies: [
      'pirate raider',
      'violent "salvager" gang',
      'tentacled sea monster',
    ],
    friends: [
      'daredevil fishermen',
      'sea hermit',
      'sapient native life',
    ],
    complications: [
      'the liquid flux confuses grav engines too badly for them to function on this world',
      'sea is corrosive or toxic',
      'the seas are wracked by regular storms',
    ],
    things: [
      'buried pirate treasure',
      'location of enormous schools of fish',
      'pretech water purification equipment',
    ],
    places: [
      'the only island on the planet',
      'floating spaceport',
      'deck of storm-swept ship',
      'undersea bubble city',
    ],
  },
  [worldTagKeys.outOfContact]: {
    key: worldTagKeys.outOfContact,
    name: 'Out of Contact',
    description: 'The natives have been entirely out of contact with the greater galaxy for centuries or longer. Perhaps the original colonists were seeking to hide from the rest of the universe, or the Silence destroyed any means of communication. It may have been so long that human origins on other worlds have regressed into a topic for legends. The players might be on the first offworld ship to land since the First Wave of colonization a thousand years ago.',
    enemies: [
      'fearful local ruler',
      'zealous native cleric',
      'sinister power that has kept the world isolated',
    ],
    friends: [
      'scheming native noble',
      'heretical theologian',
      'UFO cultist native',
    ],
    complications: [
      'automated defenses fire on ships that try to take off',
      'the natives want to stay out of contact',
      'the natives are highly vulnerable to offworld diseases',
      'the native language is completely unlike any known to the group',
    ],
    things: [
      'ancient pretech equipment',
      'terran relic brought from earth',
      'logs of the original colonists',
    ],
    places: [
      'long-lost colonial landing site',
      'court of the local ruler',
      'ancient defense battery controls',
    ],
  },
  [worldTagKeys.outpostWorld]: {
    key: worldTagKeys.outpostWorld,
    name: 'Outpost World',
    description: 'The world is only a tiny outpost of human habitation planted by an offworld corporation or government. Perhaps the staff is there to serve as a refueling and repair stop for passing ships, or to oversee an automated mining and refinery complex. They might be there to study ancient ruins, or simply serve as a listening and monitoring post for traffic through the system. The outpost is likely well-equipped with defenses against casual piracy.',
    enemies: [
      'space-mad outpost staffer',
      'outpost commander who wants it to stay undiscovered',
      'undercover saboteur',
    ],
    friends: [
      'lonely staffer',
      'fixated researcher',
      'overtaxed maintenance chief',
    ],
    complications: [
      'the alien ruin defense systems are waking up',
      'atmospheric disturbances trap the group inside the outpost for a month',
      'pirates raid the outpost',
      'the crew have become cnverts to a strange set of beliefs',
    ],
    things: [
      'alien relics',
      'vital scientific data',
      'secret corporate exploitation plans',
    ],
    places: [
      'grimy recreation room',
      'refueling station',
      'the only building on the planet',
      'a "starport" of swept bare rock',
    ],
  },
  [worldTagKeys.perimeterAgency]: {
    key: worldTagKeys.perimeterAgency,
    name: 'Perimeter Agency',
    description: 'Before the Silence, the Perimeter was a Terran-sponsored organization charged with rooting out use of maltech- technology banned in human space as too dangerous for use or experimentation. Unbraked AIs, gengineered slave species, nanotech replicators, weapons of planetary destruction... the Perimeter hunted down experimenters with a great indifference to planetary laws. Most Perimeter Agencies collapsed during the Silence, but a few managed to hold on to their mission, though modern Perimeter agents often find more work as conventional spies.',
    enemies: [
      'renegade agency director',
      'maltech researcher',
      'paranoid intelligence chief',
    ],
    friends: [
      'agent in need of help',
      'support staffer',
      '"unjustly" targeted researcher',
    ],
    complications: [
      'the local agency has gone rogue and now uses maltech',
      'the Agency archives have been compromised',
      'the Agency has been targeted by a maltech-using organization',
      'the Agency\'s existance is unkonwn to the locals',
    ],
    things: [
      'agency maltech research archives',
      'agency pretech spec-ops gear',
      'file of blackmail on local politicians',
    ],
    places: [
      'interrogation room',
      'smoky bar',
      'maltech laboratory',
      'secret agency base',
    ],
  },
  [worldTagKeys.pilgrimageSite]: {
    key: worldTagKeys.pilgrimageSite,
    name: 'Pilgrimage Site',
    description: 'The world is noted for an important spiritual or historical location, and might be the sector headquar- ters for a widespread religion or political movement. The site attracts wealthy pilgrims from throughout nearby space, and those with the money necessary to manage interstellar travel can be quite generous to the site and its keepers. The locals tend to be fiercely protective of the place and its reputation, and some places may forbid the entrance of those not suitably pious or devout.',
    enemies: [
      'saboteur devoted to a rival rival belief',
      'bitter reformer who resents the current leadership',
      'swindler conning the pilgrims',
    ],
    friends: [
      'protector of the holy site',
      'naive offworlder pilgrim',
      'outsider wanting to learn the sanctum\'s inner secrets',
    ],
    complications: [
      'the site is actually a fake',
      'the site is run by corrupt and venal keepers',
      'a natural disaster threatens the site',
    ],
    things: [
      'ancient relic guarded at the site',
      'proof of the site\'s inauthenticity',
      'precious offerings from a pilgrim',
    ],
    places: [
      'incense-scented sanctum',
      'teeming crowd of pilgrims',
      'imposing holy structure',
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
