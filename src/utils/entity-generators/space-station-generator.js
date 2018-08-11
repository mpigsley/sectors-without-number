import Chance from 'chance';

import { generateStationName } from 'utils/name-generator';
import Occupation from 'constants/space-station/occupation';
import Situation from 'constants/space-station/situation';

const chance = new Chance();
export const generateOccupation = () => chance.pickone(Object.keys(Occupation.attributes));
export const generateSituation = () => chance.pickone(Object.keys(Situation.attributes));

export const generateSpaceStation = ({
  name = generateStationName(),
  hideOccAndSit = false,
  sector,
  parent,
  parentEntity,
  generate = true,
  isHidden,
} = {}) => {
  if (!sector) {
    throw new Error('Sector must be defined to generate a space station');
  }
  if (!parent || !parentEntity) {
    throw new Error(
      'Parent id and type must be defined to generate a space station',
    );
  }

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
        occupation: generateOccupation(),
        situation: generateSituation(),
      },
    };
  }
  return station;
};

export const generateSpaceStations = ({
  sector,
  parent,
  parentEntity,
  additionalPointsOfInterest,
  children = [...Array(new Chance().weighted([0, 1, 2], [3, 1, 1]))],
  hideOccAndSit,
}) => {
  if (!additionalPointsOfInterest) {
    return { children: [] };
  }
  if (!sector) {
    throw new Error('Sector id must be defined to generate space stations');
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent must be defined to generate space stations');
  }

  return {
    children: children.map(({ name, generate } = {}) =>
      generateSpaceStation({
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
