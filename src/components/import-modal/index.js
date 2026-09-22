import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import {
  isImportOpenSelector,
  currentSectorSelector,
  navigationRoutesSelector,
} from 'store/selectors/base.selectors';
import {
  getExportEntities,
  getCurrentSector,
} from 'store/selectors/entity.selectors';
import { currentSectorLayers } from 'store/selectors/layer.selectors';
import { currentSectorFactions } from 'store/selectors/faction.selectors';
import { isCurrentSectorSaved } from 'store/selectors/sector.selectors';
import { closeImport } from 'store/actions/sector.actions';
import { uploadEntities } from 'store/api/entity';
import { createFaction } from 'store/api/faction';
import { createRoute } from 'store/api/navigation';
import { createLayer } from 'store/api/layer';

import ImportModal from './import-modal';

const currentSectorRoutes = state =>
  navigationRoutesSelector(state)[currentSectorSelector(state)] || {};

const mapStateToProps = createStructuredSelector({
  isImportOpen: isImportOpenSelector,
  isSaved: isCurrentSectorSaved,
  sector: getCurrentSector,
  entities: getExportEntities,
  routes: currentSectorRoutes,
  layers: currentSectorLayers,
  factions: currentSectorFactions,
});

const mapDispatchToProps = dispatch => ({
  closeImport: () => dispatch(closeImport()),
  importSector: json => {
    const { routes = {}, layers = {}, factions = {}, ...entityData } = json;
    const oldSectorId = Object.keys(json.sector || {})[0];

    return uploadEntities(entityData).then(({ mapping }) => {
      const newSectorId = mapping[oldSectorId] || oldSectorId;

      const remapId = id => (id && mapping[id]) || id;

      const factionPromises = Object.values(factions).map(faction => {
        const remapped = {
          ...faction,
          homeworld: remapId(faction.homeworld),
          assets: Object.fromEntries(
            Object.entries(faction.assets || {}).map(([k, asset]) => [
              k,
              { ...asset, location: remapId(asset.location) },
            ]),
          ),
        };
        return createFaction(newSectorId, remapped);
      });

      const routePromises = Object.values(routes).map(route =>
        createRoute(newSectorId, route),
      );

      const layerPromises = Object.values(layers).map(layer =>
        createLayer(newSectorId, layer),
      );

      return Promise.all([...factionPromises, ...routePromises, ...layerPromises])
        .then(() => dispatch(push(`/sector/${newSectorId}`)));
    });
  },
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(ImportModal),
);
