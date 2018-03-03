import Chance from 'chance';

import { generateStationName } from 'utils/name-generator';
import Occupation from 'constants/refueling-station/occupation';
import Situation from 'constants/refueling-station/situation';

export const generateRefuelingStation = ({
  sector,
  parent,
  parentEntity,
  name = generateStationName(),
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

  const chance = new Chance();
  let refuelingStation = { name, parent, parentEntity, sector };
  if (isHidden !== undefined) {
    refuelingStation = { ...refuelingStation, isHidden };
  }
  if (generate) {
    refuelingStation = {
      ...refuelingStation,
      attributes: {
        occupation: chance.pickone(Object.keys(Occupation.attributes)),
        situation: chance.pickone(Object.keys(Situation.attributes)),
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
      }),
    ),
  };
};
