import Chance from 'chance';

import Entities from 'constants/entities';
import commonGenerator from './common-generator';

export const generateMoon = commonGenerator((entity) => entity);

export const generateMoons = ({
  children = [...Array(new Chance().weighted([0, 1, 2, 3], [20, 5, 2, 1]))],
  additionalPointsOfInterest = true,
  ...config
}) => {
  if (!additionalPointsOfInterest) {
    return { children: [] };
  }
  return {
    children: children.map(({ name, generate } = {}) =>
      generateMoon(Entities.moon.key, { name, generate, ...config }),
    ),
  };
};
