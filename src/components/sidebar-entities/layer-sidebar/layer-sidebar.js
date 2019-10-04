import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import ReactHintFactory from 'react-hint';
import CompactPicker from 'react-color/lib/Compact';
import classNames from 'classnames';

import ConfirmModal from 'primitives/modal/confirm-modal';
import FlexContainer from 'primitives/container/flex-container';
import SectionHeader from 'primitives/text/section-header';
import { EyeOff } from 'constants/icons';
import { map, sortBy } from 'constants/lodash';

import RegionRow from './region-row';
import LayerForm from './layer-form';
import './style.scss';

const ReactHint = ReactHintFactory(React);

export default class LayerSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regionDeletion: null,
    };
  }

  onRenderContent = () => {
    const { colorPicker, updateRegion, layers } = this.props;
    if (!colorPicker) {
      return null;
    }

    return (
      <div className="LayerSidebar-ColorHint--content">
        <CompactPicker
          className="LayerSidebar-ColorHint--picker"
          onChangeComplete={({ hex }) =>
            updateRegion(colorPicker, { color: hex })
          }
          color={layers[0].regions[colorPicker].color}
        />
      </div>
    );
  };

  confirmDeletion = regionId => {
    this.setState({ regionDeletion: regionId });
  };

  renderHidden() {
    const { layers } = this.props;
    if (!layers[0].isHidden) {
      return null;
    }
    return (
      <FlexContainer className="LayerSidebar-Hidden">
        <EyeOff size={18} />
        <FormattedMessage
          id="misc.layerHidden"
          values={{ entity: layers[0].name }}
        />
      </FlexContainer>
    );
  }

  renderDescription() {
    const { layers } = this.props;
    if (!layers[0].description) {
      return null;
    }
    return (
      <FlexContainer
        direction="column"
        className="LayerSidebar-DescriptionContainer"
      >
        <span className="LayerSidebar-Label">
          <FormattedMessage id="misc.description" />
        </span>
        <p className="LayerSidebar-Description">{layers[0].description}</p>
      </FlexContainer>
    );
  }

  render() {
    const {
      layerId,
      isEditing,
      isShared,
      initializeRegionForm,
      layers,
      regionForm,
      colorPicker,
      intl,
      removeRegion,
    } = this.props;
    const { regionDeletion } = this.state;
    if (!layerId || isEditing) {
      return <LayerForm />;
    }

    let newRegion = null;
    if (regionForm && !regionForm.regionId) {
      newRegion = <RegionRow />;
    }

    return (
      <div>
        <FlexContainer className="LayerSidebar" direction="column" flex="1">
          {this.renderHidden()}
          {this.renderDescription()}
          <SectionHeader
            header="misc.regions"
            addItemName="misc.region"
            onAdd={!isShared ? () => initializeRegionForm() : undefined}
          />
          {newRegion}
          {sortBy(
            map(layers[0].regions || {}, (region, regionId) => ({
              ...region,
              sort: region.name.toLowerCase(),
              regionId,
            })),
            'sort',
          ).map(({ regionId, sort, ...region }) => (
            <RegionRow
              key={regionId}
              region={region}
              regionId={regionId}
              onDelete={this.confirmDeletion}
            />
          ))}
        </FlexContainer>
        <ReactHint
          persist
          attribute="data-color"
          className={classNames({
            'LayerSidebar-ColorHint': colorPicker,
          })}
          events={{ click: true }}
          position="right"
          onRenderContent={this.onRenderContent}
        />
        <ReactHint events attribute="data-paint" position="right" />
        <ConfirmModal
          intl={intl}
          isOpen={!!regionDeletion}
          onCancel={() => this.setState({ regionDeletion: null })}
          onConfirm={() => {
            removeRegion(regionDeletion);
            this.setState({ regionDeletion: null });
          }}
        />
      </div>
    );
  }
}

LayerSidebar.propTypes = {
  intl: intlShape.isRequired,
  layers: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      isHidden: PropTypes.bool,
      regions: PropTypes.shape(),
      name: PropTypes.string,
    }),
  ).isRequired,
  layerId: PropTypes.string,
  isEditing: PropTypes.bool.isRequired,
  isShared: PropTypes.bool.isRequired,
  regionForm: PropTypes.shape({
    name: PropTypes.string,
    regionId: PropTypes.string,
    isHidden: PropTypes.bool,
  }),
  colorPicker: PropTypes.string,
  initializeRegionForm: PropTypes.func.isRequired,
  updateRegion: PropTypes.func.isRequired,
  removeRegion: PropTypes.func.isRequired,
};

LayerSidebar.defaultProps = {
  layerId: null,
  regionForm: null,
  colorPicker: null,
};
