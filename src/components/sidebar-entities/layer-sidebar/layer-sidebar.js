import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EyeOff } from 'react-feather';
import ReactHintFactory from 'react-hint';
import CompactPicker from 'react-color/lib/Compact';
import { FormattedMessage, intlShape } from 'react-intl';

import ConfirmModal from 'primitives/modal/confirm-modal';
import FlexContainer from 'primitives/container/flex-container';
import SectionHeader from 'primitives/text/section-header';
import { map, sortBy } from 'constants/lodash';

import RegionRow from './region-row';
import LayerForm from './layer-form';
import './style.scss';

const ReactHint = ReactHintFactory(React);

export default function LayerSidebar({
  intl,
  layers,
  layerId,
  sectorId,
  isEditing,
  isShared,
  regionForm,
  colorPicker,
  initializeRegionForm,
  updateRegion,
  removeRegion,
  toSafeRoute,
}) {
  const [regionDeletion, setRegionDeletion] = useState();

  useEffect(() => {
    if (!layers.length && sectorId) {
      toSafeRoute(sectorId);
    }
  }, [layers.length, toSafeRoute, sectorId]);

  if (!layers.length) {
    return null;
  }

  const { name, regions, isHidden, description } = layers[0];

  let content;
  if (colorPicker) {
    content = (
      <div className="LayerSidebar-ColorHint--content">
        <CompactPicker
          className="LayerSidebar-ColorHint--picker"
          onChangeComplete={({ hex }) =>
            updateRegion(colorPicker, { color: hex })
          }
          color={regions[colorPicker].color}
        />
      </div>
    );
  }

  let hiddenText;
  if (isHidden) {
    hiddenText = (
      <FlexContainer className="LayerSidebar-Hidden">
        <EyeOff size={18} />
        <FormattedMessage id="misc.layerHidden" values={{ entity: name }} />
      </FlexContainer>
    );
  }

  let descriptionText;
  if (description) {
    descriptionText = (
      <FlexContainer
        direction="column"
        className="LayerSidebar-DescriptionContainer"
      >
        <span className="LayerSidebar-Label">
          <FormattedMessage id="misc.description" />
        </span>
        <p className="LayerSidebar-Description">{description}</p>
      </FlexContainer>
    );
  }

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
        {hiddenText}
        {descriptionText}
        <SectionHeader
          header="misc.regions"
          addItemName="misc.region"
          onAdd={!isShared ? () => initializeRegionForm() : undefined}
        />
        {newRegion}
        {sortBy(
          map(regions, (region, regionId) => ({
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
            onDelete={setRegionDeletion}
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
        onRenderContent={content}
      />
      <ReactHint events attribute="data-paint" position="right" />
      <ConfirmModal
        intl={intl}
        isOpen={!!regionDeletion}
        onCancel={() => setRegionDeletion()}
        onConfirm={() => {
          removeRegion(regionDeletion);
          setRegionDeletion();
        }}
      />
    </div>
  );
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
  sectorId: PropTypes.string.isRequired,
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
  toSafeRoute: PropTypes.func.isRequired,
};

LayerSidebar.defaultProps = {
  layerId: null,
  regionForm: null,
  colorPicker: null,
};
