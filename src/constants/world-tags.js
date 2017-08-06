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
    description:
      'The world once hosted a colony, whether human or otherwise, until some crisis or natural disaster drove the inhabitants away or killed them off. The colony might have been mercantile in nature, an expedition to extract valuable local resources, or it might have been a reclusive cabal of zealots. The remains of the colony are usually in ruins, and might still be dangerous from the aftermath of whatever destroyed it in the first place.',
    enemies: [
      'crazed survivors',
      'ruthless plunderers of the ruins',
      'automated defense system',
    ],
    friends: [
      'inquisitive stellar archaeologist',
      "heir to the colony's property",
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
    description:
      'The world has significant alien ruins present. The locals may or may not permit others to investigate the ruins, and may make it difficult to remove any objects of value without substantial payment. Any surviving ruins with worthwhile salvage almost certainly have some defense or hazard to explain their unplundered state.',
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
    description:
      'The humans on this world are visibly and drastically different from normal humanity. They may have additional limbs, new sensory organs, or other significant changes. Were these from ancestral eugenic manipulation, strange stellar mutations, or from an environmental toxin unique to this world?',
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
    description:
      'Rather than being an incidental anarchy of struggling tribes and warring factions, this world actually has a functional society with no centralized authority. Authority might be hyperlocalized to extended families, specific religious parishes, or voluntary associations. Some force is preventing an outside group or internal malcontents from coalescing into a power capable of imposing its rule on the locals; this force might be an ancient pretech defense system, a benevolent military AI, or the sheer obscurity and isolation of the culture.',
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
    description:
      'The locals were originally human, but at some point became anthropomorphic, either as an ancient furry colony, a group of animal-worshiping sectarians, or gengineers who just happened to find animal elements most convenient for surviving on the world. Depending on the skill of the original gengineers, their feral forms may or may not work as well as their original human bodies, or may come with drawbacks inherited from their animal elements.',
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
    description:
      "The world's government is fully aware of their local stellar neighbors, but the common populace has no idea about it, and the government means to keep it that way. Trade with government officials in remote locations is possible, but any attempt to clue the commoners in on the truth will be met with lethal reprisals.",
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
    description:
      'Whatever the original climate and atmosphere type, something horrible happened to this world. Biological, chemical, or nanotechnical weaponry has reduced it to a wretched hellscape. Some local life might still be able to survive on its blasted surface, usually at some dire cost in health or humanity.',
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
    places: ['untouched oasis', 'ruined city', 'salt flat'],
  },
  [worldTagKeys.battleground]: {
    key: worldTagKeys.battleground,
    name: 'Battleground',
    description:
      'The world is a battleground for two or more outside powers. They may be interstellar rivals, or groups operating out of orbitals or other system bodies. Something about the planet is valuable enough for them to fight over, but the natives are too weak to be anything but animate obstacles to the fight.',
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
    description:
      'The natives have extremely close bonds with the local fauna, possibly having special means of communication and control through tech or gengineering. Local animal life plays a major role in their society, indusutry, or warfare, and new kinds of beasts may be bred to suit their purposes.',
    enemies: [
      'half-feral warlord of a beast swarm',
      'coldly inhuman scientist',
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
    description:
      "Whether due to a lack of atmosphere or an uninhabitable climate, the world's cities exist within domes or pressurized buildings. In such sealed environments, techniques of surveillance and control can grow baroque and extreme.",
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
      "master key codes to a city's security system",
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
    description:
      'Human life is near-worthless on this world. Ubiquitous cloning, local conditions that ensure early death, a culture that reveres murder, or a social structure that utterly discounts the value of most human lives ensures that death is the likely outcome for any action that irritates someone consequential.',
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
    description:
      'The world is currently torn between at least two opposing factions, all of which claim legitimacy. The war may be the result of a successful rebel uprising against tyranny, or it might just be the result of schemers who plan to be the new masters once the revolution is complete.',
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
    description:
      "Two or more great powers control the planet, and they have a hostility to each other that's just barely less than open warfare. The hostility might be ideological in nature, or it might revolve around control of some local resource.",
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
    complications: ['police sweep', 'low-level skirmishing', '"red scare"'],
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
    description:
      "A neighboring world has successfully colonized this less-advanced or less-organized planet, and the natives aren't happy about it. A puppet government may exist, but all real decisions are made by the local viceroy.",
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
      "natives won't talk to offworlders",
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
    description:
      'The world is a considerable cultural power in the sector, producing music, art, philosophy, or some similar intangible that their neighbors find irresistably attractive. Other worlds might have a profound degree of cultural cachet as the inheritor of some venerable artistic tradition.',
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
      "the only copy of a dead master's opus",
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
    description:
      'On this world communism actually works, thanks to pretech computing devices and greater or lesser amounts of psychic precognition. Central planning nodes direct all production and employment on the world. Citizens in good standing have access to ample amounts of material goods for all needs and many wants. Instead of strife over wealth, conflicts erupt over political controls, cultural precepts, or control over the planning nodes. Many cybercommunist worlds show a considerable bias toward the private interests of those who run the planning nodes.',
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
      "the planning computers can't handle the increasing population within the system",
    ],
    things: [
      'planning node computer',
      "wildly destabilizing commodity that can't be factored into plans",
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
    description:
      "The planet's population makes heavy use of cybernetics, with many of the inhabitants possessing at least a cosmetic amount of chrome. This may be the result of a strong local cyber tech base, a religious injunction, or simply a necessary measure to survive the local conditions.",
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
    description:
      "The world regularly suffers some apocalyptic catastrophe that wipes out organized civilization on it. The local culture is aware of this cycle and has traditions to ensure a fragment of civilization survives into the next era, but these traditions don't always work properly, and sometimes dangerous fragments of the past emerge.",
    enemies: [
      'offwolder seeking to trigger the apocalypse early for profit',
      'local recklessly taking advantage or preparation stores',
      'demagogue claiming the cycle is merely a myth of the authorities',
    ],
    friends: [
      'harried official working to prepare',
      'offworlder studying the cylcles',
      "local threatened by perils of the cycle's initial stages",
    ],
    complications: [
      'the cycles really are a myth of the authorities',
      'the cycles are controlled by alien constructs',
      'an outside power is interfering wiht preparation',
    ],
    things: [
      'a lost cache of ancien treasures',
      "tech or archives that will pinpoint the cycle's timing",
      "keycodes to bypass an ancient vault's security",
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
    description:
      'The world may have a breathable atmosphere and a human-tolerable temperature range, but it is an arid, stony waste outside of a few places made habitable by human effort. The deep wastes are largely unexplored and inhabited by outcasts and worse.',
    enemies: [
      'raider cheiftain',
      'crazed hermit',
      'angry isolationist',
      'paranoid mineral prospector',
      'strange desert beast',
    ],
    friends: ['native guide', 'research biologist', 'aspiring teraformer'],
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
    description:
      'The world is doomed, and the locals may or may not know it. Some cosmic catastrophe looms before them, and the locals have no realistic way to get everyone to safety. To the extent that the public is aware, society is disintegrating into a combination of religious fervor, abject hedonism, and savage violence.',
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
      "the doom is false or won't actually kill everyone",
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
    description:
      'The inhabitants of this world are dying out, and they know it. Through environmental toxins, hostile bio-weapons, or sheer societal despair, the culture cannot replenish its numbers. Members seek meaning in their own strange goals or peculiar faiths, though a few might struggle to find some way to reverse their slow yet inevitable doom.',
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
      "the dying culture's values were monstrous",
      "the race's death is somehow necessary to prevent some grand catastrophe",
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
    description:
      'Even in the days before the Silence, major improvement of the human genome always seemed to come with unacceptable side-effects. Some worlds host secret cults that perpetuate these improvements regardless of the cost, and a few planets have been taken over entirely by the cults.',
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
    description:
      'The Exchange of Light once served as the largest, most trusted banking and diplomatic service in human space. Even after the Silence, some worlds retain a functioning Exchange Consulate where banking services and arbitration can be arranged.',
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
    description:
      'At some point in the past, this world was a hegemonic power over some or all of the sector, thanks to superior tech, expert diplomacy, the weakness of their neighbors, or inherited Mandate legitimacy. Some kind of crash or revolt broke their power, however, and now the world is littered with the wreckage of former glory.',
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
      "the hegemon's rule was enlightened and fair",
      'it collapsed due to its own internal strife rather than external resistance',
      'it pretends that nothing has happened to its power',
      "it's been counter-colonized by vengeful outsiders",
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
    description:
      'In the long, isolated night of the Silence, some worlds have experienced total moral and cultural collapse. Whatever remains has been twisted beyond recognition into assorted death cults, xenophobic fanaticism, horrific cultural practices, or other behavior unacceptable on more enlightened worlds. These worlds are almost invariably quarantined by other planets.',
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
    description:
      'Perhaps the world is a gas giant, or plagued with unendurable storms at lower levels of the atmosphere. For whatever reason, the cities of this world fly above the surface of the planet. Perhaps they remain stationary, or perhaps they move from point to point in search of resources.',
    enemies: [
      'rival city pilot',
      'tech thief attempting to steal outworld gear',
      "saboteur or scavenger plundering the city's tech",
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
      "the one calm place on the planet's surface",
      'catwalks stretching over unimaginable gulfs below',
    ],
  },
  [worldTagKeys.forbiddenTech]: {
    key: worldTagKeys.forbiddenTech,
    name: 'Forbidden Tech',
    description:
      "Some group on this planet fabricates or uses maltech. Unbraked AIs doomed to metastasize into insanity, nation-destroying nanowarfare particles, slow-burn DNA corruptives, genetically engineered slaves, or something worse still. The planet's larger population may or may not be aware of the danger in their midst.",
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
      "citizens insist that it's not really maltech",
    ],
    things: [
      'maltech research data',
      'the maltech itself',
      'precious pretech equipment used to create it',
    ],
    places: [
      'horrific laboratory',
      "hellscape sculpted by the maltech's use",
      'government building meeting room',
    ],
  },
  [worldTagKeys.formerWarriors]: {
    key: worldTagKeys.formerWarriors,
    name: 'Former Warriors',
    description:
      'The locals of this world were once famed for their martial prowess. They may have simply had a very militaristic culture, or were genetically engineered for combat, or developed high-tech weaponry, or had brilliant leadership. Those days are past, however, either due to crushing defeat, external restrictions, or a cultural turn toward peace.',
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
    description:
      "The geology or geography of this world is simply freakish. Perhaps it's composed entirely of enormous mountain ranges, or regular bands of land and sea, or the mineral structures all fragment into perfect cubes. The locals have learned to deal with it and their culture will be shaped by its requirements.",
    enemies: [
      'crank xenogeologist',
      "cultist who believes it's the work of aliens",
    ],
    friends: ['research scientist', 'prospector', 'artist'],
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
    description:
      "The planet is plagued with some sort of bizarre or hazardous weather pattern. Perhaps city-flattening storms regularly scourge the surface, or the world's sun never pierces its thick banks of clouds.",
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
    description:
      'Some hostile alien race or malevolent cabal has a branch or sect on this world that is actually quite friendly toward outsiders. For whatever internal reason, they are willing to negotiate and deal honestly with strangers, and appear to lack the worst impulses of their fellows.',
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
    description:
      'Gold, silver, and other conventional precious minerals are common and cheap now that asteroid mining is practical for most worlds. But some minerals and compounds remain precious and rare, and this world has recently been discovered to have a supply of them. People from across the sector have come to strike it rich.',
    enemies: [
      'paranoid prospector',
      'aspiring mining tycoon',
      'rapacious merchant',
    ],
    friends: ['claim-jumped miner', 'native alien', 'curious tourist'],
    complications: [
      'the strike is a hoax',
      'the strike is of a dangerous toxic substance',
      'export of the mineral is prohibited by the planetary government',
      "the native aliens live around the strike's location",
    ],
    things: [
      'cases of the refined element',
      'pretech mining equipment',
      "a dead prospector's claim deed",
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
    description:
      'The locals are obsessed with completing a massive project, one that has consumed them for generations. It might be the completion of a functioning spaceyard, a massive solar power array, a network of terraforming engines, or the universal conversion of their neighbors to their own faith. The purpose of their entire civilization is to progress and some day complete the work.',
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
    description:
      "For whatever reason, this world's populace has a burning hatred for the inhabitants of a neighboring system. Perhaps this world was colonized by exiles, or there was a recent interstellar war, or ideas of racial or religious superiority have fanned the hatred. Regardless of the cause, the locals view their neighbor and any sympathizers with loathing.",
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
    description:
      'With interstellar transport so limited in the bulk it can move, worlds have to be largely self-sufficient in industry. Some worlds are more sufficient than others, however, and this planet has a thriving manufacturing sector capable of producing large amounts of goods appropriate to its tech level. The locals may enjoy a correspondingly higher lifestyle, or the products might be devoted towards vast projects for the aggrandizement of the rulers.',
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
      "the industries' major output is being obsoleted by offworld tech",
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
    description:
      'This world has large stocks of valuable minerals, usually necessary for local industry, life support, or refinement into loads small enough to export offworld. Major mining efforts are necessary to extract the minerals, and many natives work in the industry.',
    enemies: ['Mine boss', 'tunnel saboteur', 'subterranean predators'],
    friends: [
      'hermit prospector',
      'offworld investigator',
      "miner's union representative",
    ],
    complications: [
      'the refinery equipment breaks down',
      'tunnel collapse',
      "silicate life forms growing in the miner's lungs",
    ],
    things: [
      'the mother lode',
      'smuggled case of refined mineral',
      'silicate faked crystalline mineral samples',
    ],
    places: ['vertical mine face', 'tailing piles', 'roaring smelting complex'],
  },
  [worldTagKeys.hivemind]: {
    key: worldTagKeys.hivemind,
    name: 'Hivemind',
    description:
      'Natives of this world exist in a kind of mental gestalt, sharing thoughts and partaking of a single identity. Powerful pretech, exotic psionics, alien influence, or some other cause has left the world sharing one identity. Individual members may have greater or lesser degrees of effective coordination with the whole.',
    enemies: [
      'a hivemind that wants to assimilate outsiders',
      'a hivemind that has no respect for unjoined life',
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
    description:
      'A savage holy war is raging on this world, either between factions of locals or as a united effort against the pagans of some neighboring world. This war might involve a conventional religion, or it might be the result of a branding campaign, political ideology, artistic movement, or any other cause that people use as a substitute for traditional religion.',
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
      "the leaders don't want the war won but only prolonged",
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
    description:
      'The world is teeming with life, and it hates humans. Perhaps the life is xenoallergenic, forcing filter masks and tailored antiallergens for survival. It could be the native predators are huge and fearless, or the toxic flora ruthlessly outcompetes earth crops.',
    enemies: [
      'local fauna',
      'nature cultist',
      'native aliens',
      'calous labor overseer',
    ],
    friends: ['xenobiologist', 'tourist on safari', 'grizzled local guide'],
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
    description:
      'The system in which the world exists is a dangerous neighborhood. Something about the system is perilous to inhabitants, either through meteor swarms, stellar radiation, hostile aliens in the asteroid belt, or periodic comet clouds.',
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
    description:
      "Natives of this world are effectively immortal. They may have been gengineered for tremendous lifespans, or have found some local anagathic, or be cyborg life forms, or be so totally convinced of reincarnation that death is a cultural irrelevance. Any immortality technique is likely applicable only to them, or else it's apt to be a massive draw to outside imperialists.",
    enemies: [
      'outsider determined to steal immortality',
      'smug local convinced of their immortal wisdom to rule all',
      "offworlder seeking the world's ruin before it becomes a threat to all",
    ],
    friends: ['curious longevity researcher', 'thrill-seeking local'],
    complications: [
      "immortality requires doing something that outsiders can't or won't willingly do",
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
    description:
      'The world may be sophisticated or barely capable of steam engines, but either way it produces something rare and precious to the wider galaxy. It might be some pharmaceutical extract produced by a secret recipe, a remarkably popular cultural product, or even gengineered humans uniquely suited for certain work.',
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
      "the crafters don't make the specialty any more",
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
    description:
      'The locals can create a particular example of extremely high tech, possibly even something that exceeds pretech standards. They may use unique local resources to do so, or have stumbled on a narrow scientific breakthrough, or still have a functional experimental manufactory.',
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
    places: ['alien factory', 'lethal R&D center', 'tech brokerage vault'],
  },
  [worldTagKeys.majorSpaceyard]: {
    key: worldTagKeys.majorSpaceyard,
    name: 'Major Spaceyard',
    description:
      'Most worlds of tech level 4 or greater have the necessary tech and orbital facilities to build spike drives and starships. This world is blessed with a major spaceyard facility, either inherited from before the Silence or painstakingly constructed in more recent decades. It can build even capital-class hulls, and do so more quickly and cheaply than its neighbors.',
    enemies: [
      'enemy saboteur',
      'industrial spy',
      'scheming construction tycoon',
      'aspiring ship hijacker',
    ],
    friends: ['captain stuck in drydock', 'maintenance chief', 'mad innovator'],
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
    description:
      'The planet is ruled by an intellectual elite chosen via ostensibly neutral examinations or tests. The values this system selects for may or may not have anything to do with actual practical leadership skills, and the examinations may be more or less corruptible.',
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
    description:
      'The Terran Mandate retained its control over this world for much longer than usual, and the world may still consider itself a true inheritor of Mandate legitimacy. Most of these worlds have or had superior technology, but they may still labor under the burden of ancient restrictive tech or monitoring systems designed to prevent them from rebelling.',
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
      "the original colonists are all dead and have been replaced by outsiders who don't understand all the details",
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
    description:
      'The locals are cannibals, either out of necessity or out of cultural preference. Some worlds may actually eat human flesh, while others simply require the rendering of humans into important chemicals or pharmaceutical compounds, perhaps to prolong the lives of ghoul overlords. This cannibalism plays a major role in their society.',
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
    description:
      'The world is dominated by classic cyberpunk-esque megacorporations, each one far more important than the vestigial national remnants that encompass them. These megacorps are usually locked in a cold war, trading and dealing with each other even as they try to strike in deniable ways. An over-council of corporations usually acts to bring into line any that get excessively overt in their activities.',
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
    description:
      'The world is either famous for its mercenary bands or it is plagued by countless groups of condottieri in service to whatever magnate can afford to pay or bribe them adequately.',
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
      "proof of a band's impending treachery against their employers",
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
    description:
      'The locals refuse most contact with offworlders. Only a small, quarantined treaty port is provided for offworld trade, and ships can expect an exhaustive search for contraband. Local governments may be trying to keep the very existence of interstellar trade a secret from their populations, or they may simply consider offworlders too dangerous or repugnant to be allowed among the population.',
    enemies: [
      'customs official',
      'xenophobic natives',
      "existing merchant who doesn't like competition",
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
      "the locals have something desperately needed but won't bring it into the treaty port",
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
    description:
      'The culture on this world holds a particular gender in contempt. Members of that gender are not permitted positions of formal power, and may be restricted in their movements and activities. Some worlds may go so far as to scorn both traditional genders, using gengineering techniques to hybridize or alter conventional human biology.',
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
    description:
      "The world is plunged into eternal darkness. The only life on this planet derives its energy from other sources, such as geothermal heat, extremely volatile chemical reactions in the planet's soil, or light in a non-visible spectrum. Most flora and fauna is voraciously eager to consume other life.",
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
    description:
      'Most of the natives of this world are nomadic, usually following a traditional cycle of movement through the lands they possess. Promises of rich plunder or local environmental perils can force these groups to strike out against neighbors. Other groups are forced to move constantly due to unpredictable dangers that crop up on the planet.',
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
    description:
      'The world is entirely or almost entirely covered with liquid water. Habitations might be floating cities, or might cling precariously to the few rocky atolls jutting up from the waves, or are planted as bubbles on promontories deep beneath the stormy surface. Survival depends on aquaculture. Planets with inedible alien life rely on gengineered Terran sea crops.',
    enemies: [
      'pirate raider',
      'violent "salvager" gang',
      'tentacled sea monster',
    ],
    friends: ['daredevil fishermen', 'sea hermit', 'sapient native life'],
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
    description:
      'The natives have been entirely out of contact with the greater galaxy for centuries or longer. Perhaps the original colonists were seeking to hide from the rest of the universe, or the Silence destroyed any means of communication. It may have been so long that human origins on other worlds have regressed into a topic for legends. The players might be on the first offworld ship to land since the First Wave of colonization a thousand years ago.',
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
    description:
      'The world is only a tiny outpost of human habitation planted by an offworld corporation or government. Perhaps the staff is there to serve as a refueling and repair stop for passing ships, or to oversee an automated mining and refinery complex. They might be there to study ancient ruins, or simply serve as a listening and monitoring post for traffic through the system. The outpost is likely well-equipped with defenses against casual piracy.',
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
    description:
      'Before the Silence, the Perimeter was a Terran-sponsored organization charged with rooting out use of maltech technology banned in human space as too dangerous for use or experimentation. Unbraked AIs, gengineered slave species, nanotech replicators, weapons of planetary destruction... the Perimeter hunted down experimenters with a great indifference to planetary laws. Most Perimeter Agencies collapsed during the Silence, but a few managed to hold on to their mission, though modern Perimeter agents often find more work as conventional spies.',
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
      "the Agency's existance is unknown to the locals",
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
    description:
      'The world is noted for an important spiritual or historical location, and might be the sector headquarters for a widespread religion or political movement. The site attracts wealthy pilgrims from throughout nearby space, and those with the money necessary to manage interstellar travel can be quite generous to the site and its keepers. The locals tend to be fiercely protective of the place and its reputation, and some places may forbid the entrance of those not suitably pious or devout.',
    enemies: [
      'saboteur devoted to a rival rival belief',
      'bitter reformer who resents the current leadership',
      'swindler conning the pilgrims',
    ],
    friends: [
      'protector of the holy site',
      'naive offworlder pilgrim',
      "outsider wanting to learn the sanctum's inner secrets",
    ],
    complications: [
      'the site is actually a fake',
      'the site is run by corrupt and venal keepers',
      'a natural disaster threatens the site',
    ],
    things: [
      'ancient relic guarded at the site',
      "proof of the site's inauthenticity",
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
    description:
      'This world provides delights either rare or impermissible elsewhere. Matchless local beauty, stunningly gengineered natives, a wide variety of local drugs, carnal pleasures unacceptable on other worlds, or some other rare delight is readily available here. Most worlds are fully aware of the value of their offerings, and the prices they demand can be in credits or in less tangible recompense.',
    enemies: [
      'purveyor of evil delights',
      'local seeking to control others with addictions',
      'offworlder exploiter of native resources',
    ],
    friends: [
      "tourist who's in too deep",
      'native seeking a more meaningful life elsewhere',
      'offworld entertainer looking for training here',
    ],
    complications: [
      'a deeply repugnant pleasure is offered here by a culture that sees nothing wrong with it',
      'certain pleasures here are dangerously addictive',
      'the prices here can involve enaslavement or death',
      'the world has been seized and exploited by an imperial power',
    ],
    things: [
      'forbidden drug',
      'a contract for some unspeakable payment',
      'powerful tech repurposed for hedonistic ends',
    ],
    places: [
      'breathtaking natural feature',
      'artful but decadent salon',
      'grimy den of desperate vice',
    ],
  },
  [worldTagKeys.policeState]: {
    key: worldTagKeys.policeState,
    name: 'Police State',
    description:
      "The world is a totalitarian police state. Any sign of disloyalty to the planet's rulers is punished severely, and suspicion riddles society. Some worlds might operate by Soviet-style informers and indoctrination, while more technically sophisticated worlds might rely on omnipresent cameras or braked AI “guardian angels”. Outworlders are apt to be treated as a necessary evil at best, and “disappeared” if they become troublesome.",
    enemies: [
      'secret police chief',
      'scapegoating official',
      'treacherous native informer',
    ],
    friends: [
      'rebel leader',
      'offworld agitator',
      'imprisoned victim',
      'crime boss',
    ],
    complications: [
      'the natives largely believe in the righteousness of the state',
      'the police state is automated and its "rulers" can\'t shut it off',
      'the leaders forment a pogrom against "offworlder spies"',
    ],
    things: [
      'list of police informers',
      'weath taken from "enemies of the state"',
      "Dear Leaders's private stash",
    ],
    places: [
      'military parade',
      'gulag',
      'gray concrete housing block',
      'surveillance center',
    ],
  },
  [worldTagKeys.postScarcity]: {
    key: worldTagKeys.postScarcity,
    name: 'Post-Scarcity',
    description:
      'The locals have maintained sufficient Mandate-era tech to be effectively post-scarcity in their economic structure. Everyone has all the necessities and most of the desires they can imagine. Conflict now exists over the apportionment of services and terrestrial space, since anything else can be had in abundance. Military goods and items of mass destruction may still be restricted, and there is probably some reason that the locals do not export their vast wealth.',
    enemies: [
      'frenzied ideologue fighting over an idea',
      'paranoid local fearing offworlder influence',
      'grim reformer seeking the destruction of the "enfeebling" productive tech',
    ],
    friends: [
      'offworlder seeking something available only here',
      'local struggling to maintain the production tech',
      'native missionary seeking to bring abundance to other worlds',
    ],
    complications: [
      'the tech causes serious side-effects on those who take advantage of it',
      'the tech is breaking down',
      'the population is growing too large',
      'the tech produces only certain things in abundance',
    ],
    things: [
      'a cornucopia device',
      'a rare commodity that cannot be duplicated',
      'contract for services',
    ],
    places: [
      'tiny but richly-appointed private quarters',
      'market for services',
      'hushed non-duped art salon',
    ],
  },
  [worldTagKeys.preceptorArchive]: {
    key: worldTagKeys.preceptorArchive,
    name: 'Preceptor Archive',
    description:
      'The Preceptors of the Great Archive were a pre-Silence organization devoted to ensuring the dissemination of human culture, history, and basic technology to frontier worlds that risked losing this information during the human expansion. Most frontier planets had an Archive where natives could learn useful technical skills in addition to human history and art. Those Archives that managed to survive the Silence now strive to send their missionaries of knowledge to new worlds in need of their lore.',
    enemies: [
      'luddite native',
      'offworld merchant who wants the natives kept ignorant',
      'religious zealot',
      'corrupted first speaker who wants to keep a monopoly on learning',
    ],
    friends: [
      'preceptor adept missionary',
      'offworld scholar',
      'reluctant student',
      'roving preceptor adept',
    ],
    complications: [
      'the local Archive has taken a religous and mystical attitude toward their teaching',
      'the Archive has maintained some replicable pretech science',
      'the Archive has been corrupted and their teaching is incorrect',
    ],
    things: [
      'lost Archive database',
      'ancient pretech teaching equipment',
      'hidden cache of unacceptable tech',
    ],
    places: [
      'Archive lecture hall',
      'experimental laboratory',
      'student-local riot',
    ],
  },
  [worldTagKeys.pretechCultists]: {
    key: worldTagKeys.pretechCultists,
    name: 'Pretech Cultists',
    description:
      'The capacities of human science before the Silence vastly outmatch the technology available since the Scream. The jump gates alone were capable of crossing hundreds of light years in a moment, and they were just one example of the results won by blending psychic artifice with pretech science. Some worlds outright worship the artifacts of their ancestors, seeing in them the work of more enlightened and perfect humanity. These cultists may or may not understand the operation or replication of these devices, but they seek and guard them jealously.',
    enemies: ['cult leader', 'artifact supplier', 'pretech smuggler'],
    friends: ['offworld scientist', 'robbed collector', 'cult heretic'],
    complications: [
      'the cultists can actually replicate certain forms of pretech',
      'the cultists abhor use of the devices as "presumption on the holy"',
      "the cultists mistake the party's belongings for pretech",
    ],
    things: [
      'pretech artifacts both functional and broken',
      'religious-jargon laced pretech replication techniques',
      'waylaid payment for pretech artifacts',
    ],
    places: [
      'shrine to nonfunctional pretech',
      "smuggler's den",
      'public procession showing a prized artifact',
    ],
  },
  [worldTagKeys.primitiveAliens]: {
    key: worldTagKeys.primitiveAliens,
    name: 'Primitive Aliens',
    description:
      'The world is populated by a large number of sapient aliens that have yet to develop advanced technology. The human colonists may have a friendly or hostile relationship with the aliens, but a certain intrinsic tension is likely. Small human colonies might have been enslaved or otherwise subjugated.',
    enemies: [
      'hostile alien chief',
      'human firebrand',
      'dangerous local predator',
      'alien religious zealot',
    ],
    friends: [
      'colonist leader',
      'peace-faction alien chief',
      'planetary frontiersman',
      'xenoresearcher',
    ],
    complications: [
      'the alien numbers are huge and can overwhelm the humans whenver they so choose',
      'one group is trying to use the other to kill their political opponents',
      'the aliens are incomprehensibly strange',
      'one side commits an atrocity',
    ],
    things: [
      'alien religious icon',
      'ancient alien-human treaty',
      'alien technology',
    ],
    places: ['alien village', 'fortified human settlement', 'masacre site'],
  },
  [worldTagKeys.prisonPlanet]: {
    key: worldTagKeys.prisonPlanet,
    name: 'Prison Planet',
    description:
      'This planet is or was intended as a prison. Some such prisons were meant for specific malefactors of the Terran Mandate, while others were to contain entire "dangerous" ethnic groups or alien races. Some may still have warden AIs or automatic systems to prevent any unauthorized person from leaving, and any authorization permits have long since expired.',
    enemies: [
      'crazed warden AI',
      'brutal heir to gang leadership',
      "offworlder who's somehow acquired warden powers and exploits the locals",
    ],
    friends: [
      'innocent local born here',
      'native technician forced to maintain the very tech that imprisons them',
      'offworlder trapped here by accident',
    ],
    complications: [
      'departure permits are a precious currency',
      'the prison industry still makes valuable pretech devices',
      'gangs have metamorphosed into governments',
      'the local nobility descended from the prison staff',
    ],
    things: [
      'a pass to get offworld',
      'a key to bypass ancient security devices',
      'contraband forbidden by the security scanners',
    ],
    places: [
      'Mandate-era prison block converted to government building',
      'industrial facility manned by mandatory numbers of prisoners',
      'makeshift shop where contraband is assembled',
    ],
  },
  [worldTagKeys.psionicsAcademy]: {
    key: worldTagKeys.psionicsAcademy,
    name: 'Psionics Academy',
    description:
      'This world is one of the few that have managed to redevelop the basics of psychic training. Without this education, a potential psychic is doomed to either madness or death unless they refrain from using their abilities. Psionic academies are rare enough that offworlders are often sent there to study by wealthy patrons. The secrets of psychic mentorship, the protocols and techniques that allow a psychic to successfully train another, are carefully guarded at these academies. Most are closely affiliated with the planetary government.',
    enemies: [
      'corrupt psychic instructor',
      'renegade student',
      'mad psychic researcher',
      'resentful townie',
    ],
    friends: ['offworld researcher', 'aspiring student', 'wealthy tourist'],
    complications: [
      'the academy curriculum kills a significant percentage of students',
      'the faculty use students as research subjects',
      'the students are indoctrinated as sleeper agents',
      'the local natives hate the academy',
      'the academy is part of a religion',
    ],
    things: [
      'secretly developed psitech',
      'a runaway psychic mentor',
      'psychic research prize',
    ],
    places: [
      'training grounds',
      'experimental laboratory',
      'school library',
      'campus hangout',
    ],
  },
  [worldTagKeys.psionicsFear]: {
    key: worldTagKeys.psionicsFear,
    name: 'Psionics Fear',
    description:
      'The locals are terrified of psychics. Perhaps their history is studded with feral psychics who went on murderous rampages, or perhaps they simply nurse an unreasoning terror of those “mutant freaks”. Psychics demonstrate their powers at risk of their lives.',
    enemies: [
      'mental purity investigator',
      'suspicious zealot',
      'witch-finder',
    ],
    friends: [
      'hidden psychic',
      'offwolder psychic trapped here',
      'offworld educator',
    ],
    complications: [
      'psychic potential is much more common here',
      'some tech is mistaken as psitech',
      'natives believe certain rituals and customs can protect them from psychic powers',
    ],
    things: [
      'hidden psitech cache',
      'possessions of convicted psychics',
      'reward for turning in a psychic',
    ],
    places: [
      'inquisitorial chamber',
      'lynching site',
      'museum of psychic atrocities',
    ],
  },
  [worldTagKeys.psionicsWorship]: {
    key: worldTagKeys.psionicsWorship,
    name: 'Psionics Worship',
    description:
      'These natives view psionic powers as a visible gift of god or sign of superiority. If the world has a functional psychic training academy, psychics occupy almost all major positions of power and are considered the natural and proper rulers of the world. If the world lacks training facilities, it is likely a hodgepodge of demented cults, with each one dedicated to a marginally-coherent feral prophet and their psychopathic ravings.',
    enemies: [
      'psychic inquisitor',
      'haughty mind-noble',
      'psychic slaver',
      'feral prophet',
    ],
    friends: [
      'offworlder psychic researcher',
      'native rebel',
      'offworld employer seeking psychics',
    ],
    complications: [
      'the psychic training is imperfect and the psychics all show significant mental illness',
      'the psychics have developed a unique discipline',
      'the will of a psychic is law',
      'psychics in the party are forcibly kidnapped for "enlightening"',
    ],
    things: [
      'ancient psitech',
      'viluable psychic research records',
      'permission for psychic training',
    ],
    places: [
      'psitech-imbued council chamber',
      'temple to the mind',
      'sanitarium-prison for feral psychics',
    ],
  },
  [worldTagKeys.quarantinedWorld]: {
    key: worldTagKeys.quarantinedWorld,
    name: 'Quarantined World',
    description:
      "The world is under a quarantine, and space travel to and from it is strictly forbidden. This may be enforced by massive ground batteries that burn any interlopers from the planet's sky, or it may be that a neighboring world runs a persistent blockade.",
    enemies: [
      'defense installation commander',
      'suspicious patrol leader',
      'crazed asteroid hermit',
    ],
    friends: [
      'relative of a person trapped on the world',
      'humanitarian relief official',
      'treasure hunter',
    ],
    complications: [
      'the natives want to remain isolated',
      'the quarantine is enforced by an ancient alien installation',
      'the world is rife with maltech abominations',
      'the blockade is meant to starve everyone on the barren world',
    ],
    things: [
      'defense grid key',
      'bribe for getting someone out',
      'abandoned alien tech',
    ],
    places: [
      'bridge of a blockading ship',
      'defense installation control room',
      'refugee camp',
    ],
  },
  [worldTagKeys.radioactiveWorld]: {
    key: worldTagKeys.radioactiveWorld,
    name: 'Radioactive World',
    description:
      'Whether due to a legacy of atomic warfare unhindered by nuke snuffers or a simple profusion of radioactive elements, this world glows in the dark. Even heavy vacc suits can filter only so much of the radiation, and most natives suffer a wide variety of cancers, mutations and other illnesses without the protection of advanced medical treatments.',
    enemies: ['bitter mutant', 'relic warlord', 'desperate would be escapee'],
    friends: [
      'reckless prospector',
      'offworld scavenger',
      'biogenetic variety seeker',
    ],
    complications: [
      'the radioactivity is steadily growing worse',
      "the planet's medical resources break down",
      'the radioactivity has inexplicable effects on living creatures',
      'the radioactivity is the product of a malfunctioning pretech manufactory',
    ],
    things: [
      'ancient atomic weaponry',
      'pretech anti-radioactivity drugs',
      'untainted water supply',
    ],
    places: [
      'mutant-infested ruins',
      'scorched glass plain',
      'wilderness of bizarre native life',
      'glowing barrens',
    ],
  },
  [worldTagKeys.refugees]: {
    key: worldTagKeys.refugees,
    name: 'Refugees',
    description:
      'The world teems with refugees, either exiles from another planet who managed to get here, or the human detritus of some local conflict that have fled to the remaining stable states. The natives usually regard the refugees with hostility, an attitude returned by many among their unwilling guests.',
    enemies: [
      'xenophobic native leader',
      'refugee chief aspiring to seize the host nation',
      'politician seeking to use the refugees as a weapon',
    ],
    friends: [
      'sympathetic refugee waif',
      'local hard-pressed by refugee gangs',
      'clergy seeking peace',
    ],
    complications: [
      'the xenophobes are right that the refugees are taking over',
      'the refugees are right that the xenophobes want them out or dead',
      'both are right',
      'outside powers are using hte refugees to destabalize an enemy government',
      'refugee and local cultures are extremely incompatible',
    ],
    things: [
      'treasures brought out by fleeing refugees',
      'citizenship papers',
      'cache of vital refugee supplies',
      'hidden arms for terrorists',
    ],
    places: [
      'hopeless refugee camp',
      'city swarming with confused strangers',
      'festival full of angry locals',
    ],
  },
  [worldTagKeys.regionalHegemon]: {
    key: worldTagKeys.regionalHegemon,
    name: 'Regional Hegemon',
    description:
      'This world has the technological sophistication, natural resources, and determined polity necessary to be a regional hegemon for the sector. Nearby worlds are likely either directly subservient to it or tack carefully to avoid its anger. It may even be the capital of a small stellar empire.',
    enemies: ['ambitious general', 'colonial official', 'contemptuous noble'],
    friends: ['diplomat', 'offworld ambassador', 'foreign spy'],
    complications: [
      "the hegemon's influence is all that's keeping a murderous war from breaking out on nearby worlds",
      'the hegemon is decaying and losing its control',
      'the government is riddled with spies',
      'the hegemon is genuinely benign',
    ],
    things: [
      'diplomat carte blanche',
      'deed to an offworld estate',
      'foreign aid grant',
    ],
    places: [
      'palace or seat of government',
      'salon teeming with spies',
      'protets rally',
      'military base',
    ],
  },
  [worldTagKeys.restrictiveLaws]: {
    key: worldTagKeys.restrictiveLaws,
    name: 'Restrictive Laws',
    description:
      'A myriad of laws, customs, and rules constrain the inhabitants of this world, and even acts that are completely permissible elsewhere are punished severely here. The locals may provide lists of these laws to offworlders, but few non-natives can hope to master all the important intricacies.',
    enemies: [
      'law enforcement officer',
      'outraged native',
      'native lawyer specializing in peeling offworlders',
      'paid snitch',
    ],
    friends: [
      'frustrated offworlder',
      'repressed native',
      'reforming crusader',
    ],
    complications: [
      'the laws chnage regularly in patterns only natives understand',
      'the laws forbid some action vital to the party',
      'the laws forbid the simple existence of some party members',
      'the laws are secret to offworlders',
    ],
    things: [
      'complete legal codex',
      'writ of diplomatic immunity',
      'fine collection of vault contents',
    ],
    places: [
      'courtroom',
      'mob scene of outraged locals',
      'legislative chamber',
      'police station',
    ],
  },
  [worldTagKeys.revanchists]: {
    key: worldTagKeys.revanchists,
    name: 'Revanchists',
    description:
      "The locals formerly owned another world, or a major nation on the planet formerly owned an additional region of land. Something happened to take away this control or drive out the former rulers, and they've never forgotten it. The locals are obsessed with reclaiming their lost lands, and will allow no questions of practicality to interfere with their cause.",
    enemies: [
      'demagogue whipping the locals on to a hopeless war',
      'politician seeking to use the resentment for their own ends',
      'local convinced the PCs are agents of the "thieving" power',
      'refugee from the land bitterly demanding it be reclaimed',
    ],
    friends: [
      'realist local clergy seeking peace',
      'olitician trying to calm the public',
      'third-party diplomat trying to stamp out the fire',
    ],
    complications: [
      "the revanchists' claim is completely just and reasonable",
      'the land is now occupied entirely by heirs of the conquerors',
      'both sides have seized lands the other thinks are theirs',
    ],
    things: [
      'stock of vital resource produced by the taken land',
      'relic carried out of it',
      'proof that the land claim is justified or unjustified',
    ],
    places: [
      'memorial monument to the loss',
      'cemetery of those who died in the conquest',
      'public ceremony commemorating the disaster',
    ],
  },
  [worldTagKeys.revolutionaries]: {
    key: worldTagKeys.revolutionaries,
    name: 'Revolutionaries',
    description:
      'The world is convulsed by one or more bands of revolutionaries, with some nations perhaps in the grip of a current revolution. Most of these upheavals can be expected only to change the general flavor of problems in the polity, but the process of getting there usually produces a tremendous amount of suffering.',
    enemies: [
      'blood-drenched revolutionary leader',
      'blood-drenched secret police chief',
      'hostile foreign agent seeking further turmoil',
    ],
    friends: [
      'sympathetic victim accused of revolutionary sympathies or government collaboration',
      'revolutionary or state agent who now repents',
      'agent of a neutral power that wants peace',
    ],
    complications: [
      'the revolutionaries actually do seem likely to put in better rulers',
      'the revolutionaries are client groups that got out of hand',
      'the revolutionaries are clearly much worse than the government',
      'the revolutionaries have no real ideals beyond power and merely pretend to ideology',
    ],
    things: [
      'list of secret revolutionary sympathizers',
      'proof of rebel hypocrisy',
      'confiscated wealth',
    ],
    places: [
      'festival that explodes into violence',
      'heavily-fortified police station',
      'revolutionary base hidden in the wilderness',
    ],
  },
  [worldTagKeys.rigidCulture]: {
    key: worldTagKeys.rigidCulture,
    name: 'Rigid Culture',
    description:
      'The local culture is extremely rigid. Certain forms of behavior and belief are absolutely mandated, and any deviation from these principles is punished, or else society may be strongly stratified by birth with limited prospects for change. Anything which threatens the existing social order is feared and shunned.',
    enemies: [
      'rigid reactionary',
      'wary ruler',
      'regime ideologue',
      'offended potentate',
    ],
    friends: [
      'revolutionary agitator',
      'ambitious peasant',
      'frustrated merchant',
    ],
    complications: [
      'the cultural patterns are enforced by technological aids',
      'the culture is run by a secret cabal of manipulators',
      'the culture has explicit religious sanction',
      'the culture evolved due to important necessities that have since been forgotten',
    ],
    things: [
      'precious traditional regalia',
      'peasant tribute',
      'opulent trasures of the ruling class',
    ],
    places: [
      'time-worn palace',
      'low caste slums',
      'bandit den',
      'reformist temple',
    ],
  },
  [worldTagKeys.risingHegemon]: {
    key: worldTagKeys.risingHegemon,
    name: 'Rising Hegemon',
    description:
      "This world is not yet a dominant power in the sector, but it's well on its way there. Whether through newly-blossoming economic, military, or cultural power, they're extending their influence over their neighbors and forging new arrangements between their government and the rulers of nearby worlds.",
    enemies: [
      'jingoistic supremacist',
      'official bent on glorious success',
      'foreign agent saboteur',
    ],
    friends: [
      'friendly emissary to the benighted',
      'hardscrabble local turned great success',
      'foreign visitor seeking contracts or knowledge',
    ],
    complications: [
      "they're only strong because their neighbors have been weakened",
      'their success is based on a fluke resource or pretech find',
      'they bitterly resent their neighbors as former oppressors',
    ],
    things: [
      'tribute shipment',
      'factory or barracks emblematic of their power source',
      'tech or data that will deal a blow to their rise',
    ],
    places: [
      'rustic town being hurled into prosperity',
      'government building being expanded',
      'starport struggling under the flow of new ships',
    ],
  },
  [worldTagKeys.ritualCombat]: {
    key: worldTagKeys.ritualCombat,
    name: 'Ritual Combat',
    description:
      "The locals favor some form of stylized combat to resolve disputes, provide entertainment, or settle religious differences. This combat is probably not normally lethal unless it's reserved for a specific disposable class of slaves or professionals. Some combat may involve mastery of esoteric weapons and complex arenas, while other forms might require nothing more than a declaration in the street and a drawn gun.",
    enemies: [
      'bloodthirsty local champion',
      'ambitious gladiator stable owner',
      'xenophobic master fighter',
    ],
    friends: [
      'peace-minded foreign missionary',
      'temperate defender of the weak',
      'local eager to learn of offworld fighting styles',
    ],
    complications: [
      'The required weapons are strange pretech artifacts',
      'certain classes are forbidden from fighting and require champions',
      "loss doesn't mean death but it does mean ritual scarring or property loss",
    ],
    things: [
      'magnificent weapon',
      'secret book of martial techniques',
      'token signifying immunity to ritual combat challenges',
      'prize won in bloody battle',
    ],
    places: [
      'area full of cheering spectators',
      'dusty street outside a saloon',
      'memorial for fallen warriors',
    ],
  },
  [worldTagKeys.robots]: {
    key: worldTagKeys.robots,
    name: 'Robots',
    description:
      'The world has a great many robots on it. Most bots are going to be non-sentient expert systems, though an AI with enough computing resources can control many bots at once, and some worlds may have developed VIs to a degree that individual bots can seem (or be) sentient. Some worlds might even be ruled by metal overlords, ones which do not need to be sentient so long as they have overwhelming force.',
    enemies: [
      'hostile robot master',
      'robot greedy to seize offworld tech',
      "robot fallen in love with the PC's ship",
      'oligarch whose factories build robots',
    ],
    friends: [
      'data-seeking robot',
      'plucky young robot tech',
      'local being pushed out of a job by robots',
    ],
    complications: [
      'the robots are only partially controlled',
      'the robots are salvaged and originally meant for a much darker use',
      'the robots require a rare material that the locals fight over',
      "the robots require the planet's specific infrastructure so cannot be exported",
    ],
    things: [
      'prototype robot',
      'secret robot override codes',
      'vast cache of robot-made goods',
      'robot-destroying pretech weapon',
    ],
    places: [
      'humming robotic factory',
      'stark robotic "barracks"',
      'house crowded with robot servants and only one human owner',
    ],
  },
  [worldTagKeys.seagoingCities]: {
    key: worldTagKeys.seagoingCities,
    name: 'Seagoing Cities',
    description:
      'Either the world is entirely water or else the land is simply too dangerous for most humans. Human settlement on this world consists of a number of floating cities that follow the currents and the fish. These city-ships might have been purpose-built for their task, or they could be jury-rigged conglomerations of ships and structures thrown together when the need for seagoing life become apparent to the locals.',
    enemies: [
      'pirate city lord',
      'mer-human raider chieftain',
      'hostile landsman noble',
      'enemy city saboteur',
    ],
    friends: [
      'city navigator',
      'scout captain',
      'curious mer-human',
      'hard-pressed ship-city engineer',
    ],
    complications: [
      'the seas are not water',
      'the fish schools have vanished and the city faces starvation',
      'terrible storms drive the city into the glacial regions',
      "suicide ships ram the city's hull",
    ],
    things: [
      'giant pearls with mysterious chemical properties',
      'buried treasure',
      'vital repair materials',
    ],
    places: [
      'Bridge of the city',
      'storm-tossed sea',
      'a bridge fashioned of many small boats',
    ],
  },
  [worldTagKeys.sealedMenace]: {
    key: worldTagKeys.sealedMenace,
    name: 'Sealed Menace',
    description:
      'Something on this planet has the potential to create enormous havoc for the inhabitants if it is not kept safely contained by its keepers. Whether a massive seismic fault line suppressed by pretech terraforming technology, a disease that has to be quarantined within hours of discovery, or an ancient alien relic that requires regular upkeep in order to prevent planetary catastrophe, the menace is a constant shadow on the fearful populace.',
    enemies: [
      'hostile outsider bent on freeing the menace',
      'misguided fool who thinks he can use it',
      'reckless researcher who thinks he can fix it',
    ],
    friends: [
      'keeper of the menace',
      'student of its nature',
      'victim of the menace',
    ],
    complications: [
      'the menace would bring great wealth along with destruction',
      'the menace is intelligent',
      "the natives don't all believe in the menace",
    ],
    things: [
      'a key to unlock the menace',
      'a precious byproduct of the menace',
      "the secret of the menace's true nature",
    ],
    places: [
      'guarded fortress containing the menace',
      'monitoring station',
      'scene of a prior outbreak of the menace',
    ],
  },
  [worldTagKeys.secretMasters]: {
    key: worldTagKeys.secretMasters,
    name: 'Secret Masters',
    description:
      "The world is actually run by a hidden cabal, acting through their catspaws in the visible government. For one reason or another, this group finds it imperative that they not be identified by outsiders, and in some cases even the planet's own government may not realize that they're actually being manipulated by hidden masters.",
    enemies: [
      'an agent of the cabal',
      'government official who wants no questions asked',
      'willfully blinded local',
    ],
    friends: [
      'paranoid conspiracy theorist',
      'machiavellian gamesman within the cabal',
      'interstellar investigator',
    ],
    complications: [
      'the secret masters have a benign reason for wanting secrecy',
      'the cabal fights openly amongst itself',
      'the cabal is recruiting new members',
    ],
    things: [
      'a dossier of secrets on a government official',
      'a briefcase of unmarked credit notes',
      'the identity of a cabal member',
    ],
    places: [
      'smoke-filled room',
      'shadowy alleyway',
      'secret underground bunker',
    ],
  },
  [worldTagKeys.sectarians]: {
    key: worldTagKeys.sectarians,
    name: 'Sectarians',
    description:
      'The world is torn by violent disagreement between sectarians of a particular faith. Each views the other as a damnable heresy in need of extirpation. Local government may be able to keep open war from breaking out, but the poisonous hatred divides communities. The nature of the faith may be religious, or it may be based on some secular ideology.',
    enemies: [
      'paranoid believer',
      'native convinced the party is working for the other side',
      'absolutist ruler',
    ],
    friends: [
      'reformist clergy',
      'local peacekeeping official',
      'offworld missionary',
      'exhausted ruler',
    ],
    complications: [
      'the conflict has more than two sides',
      'the sectarians hate each other for multiple reasons',
      'the sectarians must cooperate or else life on this world is imperiled',
      'the sectarians hate outsiders more than they hate each other',
      'the differences in sects are incomprehensible to an outsider',
    ],
    things: [
      'ancient holy book',
      'incontrovertible proof',
      'offering to a local holy man',
    ],
    places: [
      'sectarian battlefield',
      'crusading temple',
      "philosopher's salon",
      'bitterly divided village',
    ],
  },
  [worldTagKeys.seismicInstability]: {
    key: worldTagKeys.seismicInstability,
    name: 'Seismic Instability',
    description:
      'The local land masses are remarkably unstable, and regular earthquakes rack the surface. Local construction is either advanced enough to sway and move with the vibrations or primitive enough that it is easily rebuilt. Severe volcanic activity may be part of the instability.',
    enemies: [
      'earthquake cultist',
      'hermit seismologist',
      'burrowing native life form',
      'earthquake-inducing saboteur',
    ],
    friends: [
      'experimental construction firm owner',
      'adventurous volcanologist',
      'geothermal prospector',
    ],
    complications: [
      'the earthquakes are caused by malfunctioning pretech terraformers',
      "they're caused by alien technology",
      "they're restrained by alien technology that is being plundered by offworlders",
      'the earthquakes are used to generate enormous amounts of energy',
    ],
    things: [
      'earthquake generator',
      'earthquake suppressor',
      'mineral formed at the core of the world',
      'earthquake-proof building schematics',
    ],
    places: [
      'volcanic caldera',
      'village during an earthquake',
      'mud slide',
      'earthquake opening superheated steam fissures',
    ],
  },
  [worldTagKeys.shackledWorld]: {
    key: worldTagKeys.shackledWorld,
    name: 'Shackled World',
    description:
      'This world is being systematically contained by an outside power. Some ancient autonomous defense grid, robot law enforcement, alien artifact, or other force is preventing the locals from developing certain technology, or using certain devices, or perhaps from developing interstellar flight. This limit may or may not apply to offworlders; in the former case, the PCs may have to figure out a way to beat the shackles simply to escape the world.',
    enemies: [
      'passionless jailer-AI',
      'paranoid military grid AI',
      'robot overlord',
      'enigmatic alien master',
    ],
    friends: [
      'struggling local researcher',
      'offworlder trapped here',
      'scientist with a plan to break the chains',
    ],
    complications: [
      'the shackles come off for certain brief windows of time',
      'the locals think the shackles are imposed by God',
      'an outside power greatly profits from the shackles',
      'the rulers are exempt from the shackles',
    ],
    things: [
      'keycode to bypass the shackle',
      'tech shielded from the shackle',
      'exportable version of the shackle that can affect other worlds',
    ],
    places: [
      'grim high-tech control center',
      'factory full of workaround tech',
      'temple to the power or entity that imposed the shackle',
    ],
  },
  [worldTagKeys.societalDespair]: {
    key: worldTagKeys.societalDespair,
    name: 'Societal Despair',
    description:
      "The world's dominant society has lost faith in itself. Whether through some all-consuming war, great catastrophe, overwhelming outside culture, or religious collapse, the natives no longer believe in their old values, and search desperately for something new. Fierce conflict often exists between the last believers in the old dispensation and the nihilistic or searching disciples of the new age.",
    enemies: [
      'zealot who blames outsiders for the decay',
      'nihilistic warlord',
      'offworlder looking to exploit the local despair',
    ],
    friends: [
      'struggling messenger of a new way',
      'valiant paragon of a fading tradition',
      'local going through the motions of serving a now-irrelevant role',
    ],
    complications: [
      'a massive war discredited all the old values',
      'outside powers are working to erode societal confidence for their own benefit',
      'a local power is profiting greatly from the despair',
      'the old ways were meant to aid survival on this world and their passing is causing many new woes',
    ],
    things: [
      'relic that would inspire a renaissance',
      'art that would inspire new ideas',
      'priceless artifact of a now-scorned belief',
    ],
    places: [
      'empty temple',
      'crowded den of obliviating vice',
      'smoky hall full of frantic speakers',
    ],
  },
  [worldTagKeys.soleSupplier]: {
    key: worldTagKeys.soleSupplier,
    name: 'Sole Supplier',
    description:
      "Some extremely important resource is exported from this world and this world alone. It's unlikely that the substance is critical for building spike drives unless this world is also the first to begin interstellar flight, but it may be critical to other high-tech processes or devices. The locals make a large amount of money off this trade and control of it is of critical importance to the planet's rulers, and potentially to outside powers.",
    enemies: [
      'resource oligarch, Ruthless smuggler',
      'resource-controlling warlord',
      'foreign agent seeking to subvert local government',
    ],
    friends: [
      'doughty resource miner',
      'researcher trying to synthesize the stuff',
      'small-scale resource producer',
      'harried starport trade overseer',
    ],
    complications: [
      'the substance is slow poison to process',
      'the substance is created by hostile alien natives',
      'the substance is very easy to smuggle in usable amounts',
      'only the natives have the genes or tech to extract it effectively',
    ],
    things: [
      'cache of processed resource',
      'trade permit to buy a load of it',
      'a shipment of nigh-undetectably fake substance',
    ],
    places: [
      'bustling resource extraction site',
      'opulent palace built with resource money',
      'lazy town square where everyone lives on resource payments',
    ],
  },
  [worldTagKeys.tabooTreasure]: {
    key: worldTagKeys.tabooTreasure,
    name: 'Taboo Treasure',
    description:
      'The natives here produce something that is both fabulously valuable and strictly forbidden elsewhere in the sector. It may be a lethally addictive drug, forbidden gengineering tech, vat-grown "perfect slaves", or a useful substance that can only be made through excruciating human suffering. This treasure is freely traded on the world, but bringing it elsewhere is usually an invitation to a long prison stay or worse.',
    enemies: [
      'maker of a vile commodity',
      'smuggler for a powerful offworlder',
      'depraved offworlder here for "fun"',
      'local warlord who controls the treasure',
    ],
    friends: [
      'reformer seeking to end its use',
      'innovator trying to repurpose the treasure in innocent ways',
      'wretched addict unwillingly prey to the treasure',
    ],
    complications: [
      'the treasure is extremely hard to smuggle',
      'its use visibly marks a user',
      'the natives consider it for their personal use only',
    ],
    things: [
      'load of the forbidden good',
      'smuggling tech that could hide the good perfectly',
      'blackmail data on offworld buyers of the good',
    ],
    places: [
      'den where the good is used',
      'market selling the good to locals and a few outsiders',
      'factory or processing area where the good is created',
    ],
  },
  [worldTagKeys.terraformFailure]: {
    key: worldTagKeys.terraformFailure,
    name: 'Terraform Failure',
    description:
      "This world was marginal for human habitation when it was discovered, but the Mandate or the early government put in pretech terraforming engines to correct its more extreme qualities. The terraforming did not entirely work, either failing of its own or suffering the destruction of the engines during the Silence. The natives are only partly adapted to the world's current state, and struggle with the environment.",
    enemies: [
      'brutal ruler who cares only for their people',
      'offworlder trying to loot the damaged engines',
      'warlord trying to seize limited habitable land',
    ],
    friends: [
      'local trying to fix the engines',
      'offworlder student of the engines',
      'world-wise native survivor',
    ],
    complications: [
      'the engines produced too much of something instead of too little',
      'the engines were hijacked by aliens with different preferences',
      'it was discovered that an Earth-like environment would eventually cause a catastrophic disaster',
    ],
    things: [
      'parts to repair or restore the engines',
      'lootable pretech fragments',
      'valuable local tech devised to cope with the world',
    ],
    places: [
      'zone of tolerable gravity or temperature',
      'native settlement built to cope with the environment',
      'massive ruined terraforming engine',
    ],
  },
  [worldTagKeys.theocracy]: {
    key: worldTagKeys.theocracy,
    name: 'Theocracy',
    description:
      'The planet is ruled by the priesthood of the predominant religion or ideology. The rest of the locals may or may not be terribly pious, but the clergy have the necessary military strength, popular support or control of resources to maintain their rule. Alternative faiths or incompatible ideologies are likely to be both illegal and socially unacceptable.',
    enemies: [
      'decadent priest-ruler',
      'zealous inquisitor',
      'relentless proselytizer',
      'True Believer',
    ],
    friends: [
      'heretic',
      'offworld theologian',
      'atheistic merchant',
      'desperate commoner',
    ],
    complications: [
      'the theocracy actually works well',
      'the theocracy is decadent and hated by the common folk',
      'the theocracy is divided into mutually hostile sects',
      'the theocracy is led by aliens',
    ],
    things: [
      'precious holy text',
      "martyr's bones",
      'secret church records',
      'ancient church treasures',
    ],
    places: [
      'glorious temple',
      'austere monastery',
      'academy for ideological indoctrination',
      'decadent pleasure-cathedral',
    ],
  },
  [worldTagKeys.tombWorld]: {
    key: worldTagKeys.tombWorld,
    name: 'Tomb World',
    description:
      'Tomb worlds are planets that were once inhabited by humans before the Silence. The sudden collapse of the jump gate network and the inability to bring in the massive food supplies required by the planet resulted in starvation, warfare, and death. Most tomb worlds are naturally hostile to human habitation and could not raise sufficient crops to maintain life. The few hydroponic facilities were usually destroyed in the fighting, and all that is left now are ruins, bones, and silence.',
    enemies: [
      'demented survivor tribe chieftain',
      'avaricious scavenger',
      'automated defense system',
      'native predator',
    ],
    friends: [
      'scavenger fleet captain',
      'archaeologist',
      'salvaging historian',
      'xenophilic native survivor',
    ],
    complications: [
      'the ruins are full of booby-traps left by the final inhabitants',
      "the world's atmosphere quickly degrades anything in an opened building",
      'a handful of desperate natives survived the Silence',
      'the structures are unstable and collapsing',
    ],
    things: [
      'lost pretech equipment',
      'tech caches',
      'stores of unused munitions',
      'ancient historical data',
    ],
    places: [
      'crumbling hive-city',
      'city square carpeted in bones',
      'ruined hydroponic facility',
      "cannibal tribe's lair",
      'dead orbital jump gate',
    ],
  },
  [worldTagKeys.tradeHub]: {
    key: worldTagKeys.tradeHub,
    name: 'Trade Hub',
    description:
      'This world is a major crossroads for local interstellar trade. It is well-positioned at the nexus of several short-drill trade routes, and has facilities for easy transfer of valuable cargoes and the fueling and repairing of starships. The natives are accustomed to outsiders, and a polyglot mass of people from every nearby world can be found trading here.',
    enemies: [
      'cheating merchant',
      'thieving dockworker',
      'commercial spy',
      'corrupt customs official',
    ],
    friends: [
      'rich tourist',
      'hardscrabble free trader',
      'merchant prince in need of catspaws',
      'friendly spaceport urchin',
    ],
    complications: [
      'an outworlder faction schemes to seize the trade hub',
      "saboteurs seek to blow up a rival's warehouses",
      'enemies are blockading the trade routes',
      'pirates lace the hub with spies',
    ],
    things: [
      "voucher for a warehouse's contents",
      'insider trading information',
      'case of precious offworld pharmaceuticals',
      'box of legitimate tax stamps indicating customs dues have been paid',
    ],
    places: [
      'raucous bazaar',
      'elegant restaurant',
      'spaceport teeming with activity',
      'foggy street lined with warehouses',
    ],
  },
  [worldTagKeys.tyranny]: {
    key: worldTagKeys.tyranny,
    name: 'Tyranny',
    description:
      'The local government is brutal and indifferent to the will of the people. Laws may or may not exist, but the only one that matters is the whim of the rulers on any given day. Their minions swagger through the streets while the common folk live in terror of their appetites. The only people who stay wealthy are friends and servants of the ruling class.',
    enemies: [
      'debauched autocrat',
      'sneering bully-boy',
      'soulless government official',
      'occupying army officer',
    ],
    friends: [
      'conspiring rebel',
      'oppressed merchant',
      'desperate peasant',
      'inspiring religious leader',
    ],
    complications: [
      'the tyrant rules with vastly superior technology',
      'the tyrant is a figurehead for a cabal of powerful men and women',
      'the people are resigned to their suffering',
      'the tyrant is hostile to “meddlesome outworlders”',
    ],
    things: [
      'plundered wealth',
      'beautiful toys of the elite',
      'regalia of rulership',
    ],
    places: [
      'impoverished village',
      'protest rally massacre',
      'decadent palace',
      'religious hospital for the indigent',
    ],
  },
  [worldTagKeys.unbrakedAi]: {
    key: worldTagKeys.unbrakedAi,
    name: 'Unbraked AI',
    description:
      'Artificial intelligences are costly and difficult to create, requiring a careful sequence of “growth stages” in order to bring them to sentience before artificial limits on cognition speed and learning development are installed. These “brakes” prevent runaway cognition metastasis. This world has an “unbraked AI” on it, probably with a witting or unwitting corps of servants. Unbraked AIs are quite insane, but they learn and reason with a speed impossible for humans, and can demonstrate a truly distressing subtlety.',
    enemies: [
      'AI cultist',
      'maltech researcher',
      'government official dependent on the AI',
    ],
    friends: ['perimeter agent', 'AI researcher', 'braked AI'],
    complications: [
      "the AI's presence is unknown to the locals",
      'the locals depend on the AI for some vital service',
      'the AI appears to be harmless',
      "the AI has fixated on the group's ship's computer",
      'the AI wants transport offworld',
    ],
    things: [
      'the room-sized AI core itself',
      'maltech research files',
      'perfectly tabulated blackmail on government officials',
      'pretech computer circuitry',
    ],
    places: [
      'municipal computing banks',
      'cult compound',
      'repair center',
      'ancient hardcopy library',
    ],
  },
  [worldTagKeys.urbanizedSurface]: {
    key: worldTagKeys.urbanizedSurface,
    name: 'Urbanized Surface',
    description:
      "The world's land area is covered with buildings that extend downward for multiple levels. Such worlds either have a population in the trillions, extremely little land area, or are largely-abandoned due to some past catastrophe. Agriculture and resource extraction are part of the urban complex, and there may be an advanced maintenance system that may not be entirely under the control of present natives.",
    enemies: [
      'maintenance AI that hates outsiders',
      'tyrant of a habitation block',
      'deep-dwelling prophet who considers "the sky" a blasphemy to be quelled',
    ],
    friends: [
      'local yearning for wild spaces',
      'grubby urchin of the underlevels',
      'harried engineer trying to maintain ancient works',
      'grizzled hab cop',
    ],
    complications: [
      'the urban blocks are needed to survive the environment',
      'the blocks were part of an ancient device of world-spanning size',
      'the blocks require constant maintenance to avoid dangerous types of decay',
    ],
    things: [
      'massively efficient power source',
      'map of the secret ways of a zone',
      'passkey into restricted hab block areas',
    ],
    places: [
      'giant hab block now devoid of inhabitants',
      'chemical-reeking underway',
      'seawater mine full of salt and massive flowing channels',
    ],
  },
  [worldTagKeys.utopia]: {
    key: worldTagKeys.utopia,
    name: 'Utopia',
    description:
      'Natural and social conditions on this world have made it a paradise for its inhabitants, a genuine utopia of happiness and fulfillment. This is normally the result of drastic human engineering, including brain-gelding, neurochemical control, personality curbs, or complete "humanity" redefinitions. Even so, the natives are extremely happy with their lot, and may wish to extend that joy to poor, sad outsiders.',
    enemies: [
      'compassionate neurotherapist',
      'proselytizing native missionary to outsiders',
      'brutal tyrant who rules through inexorable happiness',
    ],
    friends: [
      'deranged malcontent',
      'bloody-handed guerilla leader of a rebellion of madmen',
      'outsider trying to find a way to reverse the utopian changes',
    ],
    complications: [
      'the natives really are deeply and contentedly happy with their altered lot',
      'the utopia produces something that attracts others',
      'the utopia works on converting outsiders through persuasion and generosity',
      "the utopia involves some sacrifice that's horrifying to non-members",
    ],
    things: [
      'portable device that applies the utopian change',
      'plans for a device that would destroy the utopia',
      'goods created joyfully by the locals',
    ],
    places: [
      'plaza full of altered humans',
      'social ritual site',
      'secret office where "normal" humans rule',
    ],
  },
  [worldTagKeys.warlords]: {
    key: worldTagKeys.warlords,
    name: 'Warlords',
    description:
      'The world is plagued by warlords. Numerous powerful men and women control private armies sufficiently strong to cow whatever local government may exist. On the lands they claim, their word is law. Most spend their time oppressing their own subjects and murderously pillaging those of their neighbors. Most like to wrap themselves in the mantle of ideology, religious fervor, or an ostensibly legitimate right to rule.',
    enemies: [
      'warlord',
      'avaricious lieutenant',
      'expensive assassin',
      'aspiring minion',
    ],
    friends: [
      'Vengeful commoner',
      'government military officer',
      'humanitarian aid official',
      'village priest',
    ],
    complications: [
      'the warlords are willing to cooperate to fight mutual threats',
      'the warlords favor specific religions or races over others',
      'the warlords are using substantially more sophisticated tech than others',
      'some of the warlords are better rulers than the government',
    ],
    things: [
      'weapons cache, Buried plunder',
      "a warlord's personal battle harness",
      'captured merchant shipping',
    ],
    places: [
      'gory battlefield',
      'burnt-out village',
      'barbaric warlord palace',
      'squalid refugee camp',
    ],
  },
  [worldTagKeys.xenophiles]: {
    key: worldTagKeys.xenophiles,
    name: 'Xenophiles',
    description:
      'The natives of this world are fast friends with a particular alien race. The aliens may have saved the planet at some point in the past, or awed the locals with superior tech or impressive cultural qualities. The aliens might even be the ruling class on the planet.',
    enemies: [
      'offworld xenophobe',
      'suspicious alien leader',
      'xenocultural imperialist',
    ],
    friends: [
      'benevolent alien',
      'native malcontent',
      'gone-native offworlder',
    ],
    complications: [
      'the enthusiasm is due to alien psionics or tech',
      'the enthusiasm is based on a lie, The aliens strongly dislike their “groupies”',
      'the aliens feel obliged to rule humanity for its own good',
      'humans badly misunderstand the aliens',
    ],
    things: [
      'hybrid alien-human tech',
      'exotic alien crafts',
      'sophisticated xenolinguistic and xenocultural research data',
    ],
    places: [
      'alien district',
      'alien-influenced human home',
      'cultural festival celebrating alien artist',
    ],
  },
  [worldTagKeys.xenophobes]: {
    key: worldTagKeys.xenophobes,
    name: 'Xenophobes',
    description:
      'The natives are intensely averse to dealings with outworlders. Whether through cultural revulsion, fear of tech contamination, or a genuine immunodeficiency, the locals shun foreigners from offworld and refuse to have anything to do with them beyond the bare necessities of contact. Trade may or may not exist on this world, but if it does, it is almost certainly conducted by a caste of untouchables and outcasts.',
    enemies: [
      'revulsed local ruler',
      'native convinced some wrong was done to him',
      'cynical demagogue',
    ],
    friends: [
      'curious native',
      'exiled former ruler',
      'local desperately seeking outworlder help',
    ],
    complications: [
      'the natives are symptomless carriers of a contagious and dangerous disease',
      'the natives are exceptionally vulnerable to offworld diseases',
      'the natives require elaborate purification rituals after speaking to an offworlder or touching them',
      'the local ruler has forbidden any mercantile dealings with outworlders',
    ],
    things: [
      'jealously-guarded precious relic',
      'local product under export ban',
      'esoteric local technology',
    ],
    places: [
      'sealed treaty port',
      'public ritual not open to outsiders',
      'outcaste slum home',
    ],
  },
  [worldTagKeys.zombies]: {
    key: worldTagKeys.zombies,
    name: 'Zombies',
    description:
      'This menace may not take the form of shambling corpses, but some disease, alien artifact, or crazed local practice produces men and women with habits similar to those of murderous cannibal undead. These outbreaks may be regular elements in local society, either provoked by some malevolent creators or the consequence of some local condition.',
    enemies: [
      'soulless maltech biotechnology cult',
      'sinister governmental agent',
      'crazed zombie cultist',
    ],
    friends: [
      'survivor of an outbreak',
      'doctor searching for a cure',
      'rebel against the secret malefactors',
    ],
    complications: [
      'the zombies retain human intelligence',
      'the zombies can be cured',
      'the process is voluntary among devotees',
      'the condition is infectious',
    ],
    things: [
      'cure for the condition',
      'alien artifact that causes it',
      "details of the cult's conversion process",
    ],
    places: [
      'house with boarded-up windows',
      'dead city',
      'fortified bunker that was overrun from within',
    ],
  },
};
