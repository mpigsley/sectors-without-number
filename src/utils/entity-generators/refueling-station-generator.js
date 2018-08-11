import Chance from 'chance';

import { generateStationName } from 'utils/name-generator';
import Occupation from 'constants/refueling-station/occupation';
import Situation from 'constants/refueling-station/situation';

const chance = new Chance();

export const generateOccupation = () => chance.pickone(Object.keys(Occupation.attributes));
export const generateSituation = () => chance.pickone(Object.keys(Situation.attributes));

export const generateRefuelingStation = ({
  sector,
  parent,
  parentEntity,
  name = generateStationName(),
  hideOccAndSit = false,
  generate = true,
  isHidden,
} = {}) => {
  if (!sector) {
    throw new Error('Sector must be defined to generate a refueling station');
  }
  if (!parent || !parentEntity) {
    throw new Error(
      'Parent id and type must be defined to generate a refueling station',
    );
  }

  let refuelingStation = { name, parent, parentEntity, sector };
  if (isHidden !== undefined) {
    refuelingStation = { ...refuelingStation, isHidden };
  }
  if (generate) {
    if (hideOccAndSit) {
      refuelingStation.visibility = {
        'attr.occupation': false,
        'attr.situation': false,
      };
    }
    refuelingStation = {
      ...refuelingStation,
      attributes: {
        occupation: generateOccupation(),
        situation: generateSituation(),
      },
    };
  }
  return refuelingStation;
};

export const generateRefuelingStations = ({
  sector,
  parent,
  parentEntity,
  additionalPointsOfInterest,
  children = [...Array(new Chance().weighted([0, 1], [3, 1]))],
  hideOccAndSit,
}) => {
  if (!additionalPointsOfInterest) {
    return { children: [] };
  }
  if (!sector) {
    throw new Error('Sector id must be defined to generate refueling stations');
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent must be defined to generate refueling stations');
  }

  return {
    children: children.map(({ name, generate } = {}) =>
      generateRefuelingStation({
        name,
        generate,
        sector,
        parent,
        parentEntity,
        hideOccAndSit,
      }),
    ),
  };
};
