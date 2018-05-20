import Chance from 'chance';

import { generateStationName } from 'utils/name-generator';
import Occupation from 'constants/space-station/occupation';
import Situation from 'constants/space-station/situation';

export const generateDeepSpaceStation = ({
  sector,
  name = generateStationName(),
  hideOccAndSit = false,
  parent,
  parentEntity,
  generate = true,
  isHidden,
} = {}) => {
  if (!sector) {
    throw new Error(
      'Sector id must be defined to generate a deep space station',
    );
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent must be defined to generate a deep space station');
  }

  const chance = new Chance();
  let station = { name, sector, parent, parentEntity };
  if (isHidden !== undefined) {
    station = { ...station, isHidden };
  }
  if (generate) {
    if (hideOccAndSit) {
      station.visibility = {
        'attr.occupation': false,
        'attr.situation': false,
      };
    }
    station = {
      ...station,
      attributes: {
        occupation: chance.pickone(Object.keys(Occupation.attributes)),
        situation: chance.pickone(Object.keys(Situation.attributes)),
      },
    };
  }
  return station;
};

export const generateDeepSpaceStations = ({
  sector,
  parent,
  parentEntity,
  children = [...Array(new Chance().weighted([0, 1], [3, 1]))],
  additionalPointsOfInterest,
  hideOccAndSit,
}) => {
  if (!additionalPointsOfInterest) {
    return { children: [] };
  }
  if (!sector) {
    throw new Error(
      'Sector id must be defined to generate deep space stations',
    );
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent must be defined to generate deep space stations');
  }

  return {
    children: children.map(({ name, generate } = {}) =>
      generateDeepSpaceStation({
        sector,
        parent,
        parentEntity,
        name,
        generate,
        hideOccAndSit,
      }),
    ),
  };
};
