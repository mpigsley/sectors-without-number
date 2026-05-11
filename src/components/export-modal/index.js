import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import {
  customTagSelector,
  exportTypeSelector,
  isExportOpenSelector,
  currentSectorSelector,
  navigationRoutesSelector,
} from 'store/selectors/base.selectors';
import {
  getExportEntities,
  getCurrentSector,
} from 'store/selectors/entity.selectors';
import { currentSectorLayers } from 'store/selectors/layer.selectors';
import { currentSectorFactions } from 'store/selectors/faction.selectors';
import {
  setEntityExport,
  closeExport,
  startPrint,
} from 'store/actions/sector.actions';

import ExportModal from './export-modal';

const currentSectorRoutes = state =>
  navigationRoutesSelector(state)[currentSectorSelector(state)] || {};

const mapStateToProps = createStructuredSelector({
  exportType: exportTypeSelector,
  isExportOpen: isExportOpenSelector,
  customTags: customTagSelector,
  sector: getCurrentSector,
  entities: getExportEntities,
  routes: currentSectorRoutes,
  layers: currentSectorLayers,
  factions: currentSectorFactions,
});

export default injectIntl(
  connect(mapStateToProps, { setEntityExport, closeExport, startPrint })(
    ExportModal,
  ),
);
