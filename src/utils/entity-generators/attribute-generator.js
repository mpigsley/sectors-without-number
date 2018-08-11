import {
  generateTechLevel,
  generateAtmosphere,
  generateTemperature,
  generateBiosphere,
  generatePopulation,
  generateTag,
} from './planet-generator'
import * as refuelingStation from './refueling-station-generator'
import * as asteroidBase from './asteroid-base-generator'
import * as asteroidBelt from './asteroid-belt-generator'
import * as deepSpaceStation from './deep-space-station-generator'
import * as gasGiantMine from './gas-giant-mine-generator'
import * as moonBase from './moon-base-generator'
import * as orbitalRuin from './orbital-ruin-generator'
import * as researchBase from './research-base-generator'
import * as spaceStation from './space-station-generator'

export default (entityType, attribute) => {
  console.log(entityType, attribute)
  switch (`${entityType}.${attribute}`) {
    case 'planet.techLevel': return generateTechLevel()
    case 'planet.atmosphere': return generateAtmosphere()
    case 'planet.temperature':return generateTemperature()
    case 'planet.biosphere': return generateBiosphere()
    case 'planet.population': return generatePopulation()
    case 'planet.tags': return generateTag()
    case 'refuelingStation.situation': return refuelingStation.generateSituation()
    case 'refuelingStation.occupation': return refuelingStation.generateOccupation()
    case 'asteroidBase.situation': return asteroidBase.generateSituation()
    case 'asteroidBase.occupation': return asteroidBase.generateOccupation()
    case 'asteroidBelt.situation': return asteroidBelt.generateSituation()
    case 'asteroidBelt.occupation': return asteroidBelt.generateOccupation()
    case 'deepSpaceStation.situation': return deepSpaceStation.generateSituation()
    case 'deepSpaceStation.occupation': return deepSpaceStation.generateOccupation()
    case 'gasGiantMine.situation': return gasGiantMine.generateSituation()
    case 'gasGiantMine.occupation': return gasGiantMine.generateOccupation()
    case 'moonBase.situation': return moonBase.generateSituation()
    case 'moonBase.occupation': return moonBase.generateOccupation()
    case 'orbitalRuin.situation': return orbitalRuin.generateSituation()
    case 'orbitalRuin.occupation': return orbitalRuin.generateOccupation()
    case 'researchBase.situation': return researchBase.generateSituation()
    case 'researchBase.occupation': return researchBase.generateOccupation()
    case 'spaceStation.situation': return spaceStation.generateSituation()
    case 'spaceStation.occupation': return spaceStation.generateOccupation()
    default: return null
  }
}