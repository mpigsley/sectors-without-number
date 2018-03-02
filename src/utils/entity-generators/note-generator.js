// eslint-disable-next-line
export const generateNote = ({ sector, parent, parentEntity, name } = {}) => {
  if (!sector) {
    throw new Error('Sector must be defined to generate a moon');
  }
  if (!parent || !parentEntity) {
    throw new Error('Parent id and type must be defined to generate a moon');
  }
  return { name, parent, parentEntity, sector };
};
