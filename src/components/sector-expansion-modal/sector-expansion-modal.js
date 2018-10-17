import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';

import FlexContainer from 'primitives/container/flex-container';
import Input from 'primitives/form/input';
import Modal from 'primitives/modal/modal';
import Button from 'primitives/other/button';

import { MAX_DIMENSION } from 'constants/defaults';

import style from './style.module.scss';

export default class SectorExpansionModal extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    isOpen: PropTypes.bool.isRequired,
    sector: PropTypes.shape({
      rows: PropTypes.number.isRequired,
      columns: PropTypes.number.isRequired,
    }).isRequired,
    closeSectorExpansion: PropTypes.func.isRequired,
    expandSector: PropTypes.func.isRequired,
  };

  state = { top: 0, bottom: 0, left: 0, right: 0 };

  static getDerivedStateFromProps(props, state) {
    if (props.isOpen === false) {
      return { top: 0, bottom: 0, left: 0, right: 0 };
    }
    return state;
  }

  onUpdateSide = side => e =>
    this.setState({ [side]: Math.max(0, parseInt(e.target.value, 10)) });

  expand = () => {
    const { expandSector } = this.props;
    expandSector(this.state);
  };

  render() {
    const { intl, isOpen, sector, closeSectorExpansion } = this.props;
    const { top, bottom, left, right } = this.state;
    return (
      <Modal
        width={500}
        isOpen={isOpen}
        onCancel={closeSectorExpansion}
        footerText={intl.formatMessage(
          { id: 'misc.maxSize' },
          { num: MAX_DIMENSION },
        )}
        title={intl.formatMessage({ id: 'misc.expandSector' })}
        actionButtons={[
          <Button primary key="continue" onClick={this.expand}>
            <FormattedMessage id="misc.expand" />
          </Button>,
        ]}
      >
        <FlexContainer direction="column" align="center">
          <Input
            className={style.top}
            type="number"
            value={top}
            onChange={this.onUpdateSide('top')}
          />
          <FlexContainer align="center" justify="center">
            <Input
              className={style.left}
              type="number"
              value={left}
              onChange={this.onUpdateSide('left')}
            />
            <FlexContainer
              align="center"
              justify="center"
              className={style.square}
            >
              {sector.columns} x {sector.rows}
            </FlexContainer>
            <Input
              className={style.right}
              type="number"
              value={right}
              onChange={this.onUpdateSide('right')}
            />
          </FlexContainer>
          <Input
            className={style.bottom}
            type="number"
            value={bottom}
            onChange={this.onUpdateSide('bottom')}
          />
        </FlexContainer>
      </Modal>
    );
  }
}
