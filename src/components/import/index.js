import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import Entities from 'constants/entities';
import {
  importIsDataValidSelector,
  importSectorsSelector,
  importSectorSelector,
} from 'store/selectors/sector.selectors';
import { importJsonSelector } from 'store/selectors/base.selectors';
import { importEntity } from 'store/actions/entity.actions';
import { updateImport } from 'store/actions/sector.actions';
import Import from './import';

const mapStateToProps = state => ({
  parsedSectors: importSectorsSelector(state),
  json: importJsonSelector(state),
  sector: importSectorSelector(state),
  isJsonValid: importIsDataValidSelector(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  updateImport: (key, value) => dispatch(updateImport(key, value)),
  importSector: sector =>
    dispatch(importEntity(Entities.sector.key, sector, props.intl)),
});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Import),
);
