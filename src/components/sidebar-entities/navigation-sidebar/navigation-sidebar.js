import React, { Component } from 'react';
import ReactHintFactory from 'react-hint';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';

import Modal from 'primitives/modal/modal';
import ConfirmModal from 'primitives/modal/confirm-modal';
import Header, { HeaderType } from 'primitives/text/header';
import FlexContainer from 'primitives/container/flex-container';
import SectionHeader from 'primitives/text/section-header';
import ColorPicker from 'primitives/other/color-picker';
import LinkIcon from 'primitives/other/link-icon';
import Button from 'primitives/other/button';
import Label from 'primitives/form/label';
import Input from 'primitives/form/input';
import LabeledInput from 'primitives/form/labeled-input';
import ItemRow from 'primitives/other/item-row';

import { size, map } from 'constants/lodash';
import { X, EyeOff, Crosshair } from 'constants/icons';
import { sortByKey } from 'utils/common';

import './style.css';

const ReactHint = ReactHintFactory(React);

export default class NavigationSidebar extends Component {
  static propTypes = {
    settings: PropTypes.shape({
      color: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      width: PropTypes.string.isRequired,
      isCreatingRoute: PropTypes.bool.isRequired,
    }).isRequired,
    routes: PropTypes.shape().isRequired,
    resetNavSettings: PropTypes.func.isRequired,
    cancelNavigation: PropTypes.func.isRequired,
    updateNavSettings: PropTypes.func.isRequired,
    completeRoute: PropTypes.func.isRequired,
    removeRoute: PropTypes.func.isRequired,
    toggleVisibility: PropTypes.func.isRequired,
    locateRoute: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  state = {
    isHelpOpen: !size(this.props.routes),
    isConfirmDeleteOpen: false,
    deletionRoute: null,
  };

  componentWillUnmount() {
    this.props.resetNavSettings();
  }

  lineWidths = [
    {
      value: 'thin',
      label: this.props.intl.formatMessage({ id: 'misc.thin' }),
    },
    {
      value: 'normal',
      label: this.props.intl.formatMessage({ id: 'misc.normal' }),
    },
    {
      value: 'wide',
      label: this.props.intl.formatMessage({ id: 'misc.wide' }),
    },
  ];

  lineTypes = [
    {
      value: 'solid',
      label: this.props.intl.formatMessage({ id: 'misc.solid' }),
    },
    {
      value: 'dotted',
      label: this.props.intl.formatMessage({ id: 'misc.dotted' }),
    },
    {
      value: 'short',
      label: this.props.intl.formatMessage({ id: 'misc.shortDashes' }),
    },
    {
      value: 'long',
      label: this.props.intl.formatMessage({ id: 'misc.longDashes' }),
    },
  ];

  renderConfirmDeleteModal() {
    return (
      <ConfirmModal
        isOpen={this.state.isConfirmDeleteOpen}
        onConfirm={() => {
          this.props.removeRoute(this.state.deletionRoute);
          this.setState({ isConfirmDeleteOpen: false });
        }}
        onCancel={() => this.setState({ isConfirmDeleteOpen: false })}
      >
        <FormattedMessage
          id="misc.toDeleteEntity"
          values={{ entity: 'route' }}
        />
      </ConfirmModal>
    );
  }

  renderHelpModal() {
    return (
      <Modal
        width={600}
        title={this.props.intl.formatMessage({ id: 'misc.navHelp' })}
        isOpen={this.state.isHelpOpen}
        cancelText={this.props.intl.formatMessage({ id: 'misc.continue' })}
        onCancel={() => this.setState({ isHelpOpen: false })}
      >
        <FlexContainer direction="column" align="flexStart">
          <Header type={HeaderType.header4} noMargin>
            <FormattedMessage id="misc.createRoute" />
          </Header>
          <p>
            <FormattedMessage id="misc.createRoute.help" />
          </p>
          <Header type={HeaderType.header4} noMargin>
            <FormattedMessage id="misc.editDeleteRoute" />
          </Header>
          <p>
            <FormattedMessage id="misc.editDeleteRoute.help" />
          </p>
          <Header type={HeaderType.header4} noMargin>
            <FormattedMessage id="misc.navTips" />
          </Header>
          <p>
            <FormattedMessage id="misc.navTips.help.1" />
          </p>
          <p>
            <FormattedMessage id="misc.navTips.help.2" />
          </p>
        </FlexContainer>
      </Modal>
    );
  }

  renderRoutes() {
    if (!size(this.props.routes)) {
      return null;
    }
    return (
      <FlexContainer direction="column">
        <SectionHeader header="misc.navRoutes" />
        <FlexContainer
          justify="flexEnd"
          align="center"
          className="NavigationSidebar-SubHeader"
        >
          <LinkIcon
            data-rh={this.props.intl.formatMessage({
              id: 'misc.selectHidden',
            })}
            className="NavigationSidebar-SubHeaderHidden"
            icon={EyeOff}
            size={18}
          />
        </FlexContainer>
        <FlexContainer direction="column">
          {map(this.props.routes, (route, routeId) => ({ ...route, routeId }))
            .sort(sortByKey('from'))
            .map(({ from, to, hiddenByEntity, isHidden, routeId }) => (
              <FlexContainer
                className="NavigationSidebar-NavItem"
                key={routeId}
                align="center"
                justify="spaceBetween"
              >
                <FlexContainer align="center">
                  <X
                    className="NavigationSidebar-Delete"
                    size={25}
                    onClick={() =>
                      this.setState({
                        isConfirmDeleteOpen: true,
                        deletionRoute: routeId,
                      })
                    }
                  />
                  <Crosshair
                    className="NavigationSidebar-Delete"
                    size={20}
                    onClick={() => this.props.locateRoute(routeId)}
                  />
                  <Header type={HeaderType.header4} noMargin>
                    {from}
                  </Header>
                  <span className="NavigationSidebar-Additional">
                    <FormattedMessage id="misc.to" />
                  </span>
                  <Header type={HeaderType.header4} noMargin>
                    {to}
                  </Header>
                </FlexContainer>
                <span
                  data-rh={
                    hiddenByEntity
                      ? this.props.intl.formatMessage({
                          id: 'misc.routeHiddenByParent',
                        })
                      : undefined
                  }
                >
                  <Input
                    className="NavigationSidebar-Checkbox"
                    disabled={hiddenByEntity}
                    checked={!!isHidden}
                    onChange={() => this.props.toggleVisibility(routeId)}
                    type="checkbox"
                  />
                </span>
              </FlexContainer>
            ))}
        </FlexContainer>
      </FlexContainer>
    );
  }

  render() {
    const { settings, updateNavSettings, completeRoute } = this.props;
    const { color, type, width, isCreatingRoute } = settings;

    let cancelButton = null;
    if (isCreatingRoute) {
      cancelButton = (
        <Button
          className="NavigationSidebar-Cancel"
          onClick={this.props.cancelNavigation}
        >
          <FormattedMessage id="misc.cancel" />
        </Button>
      );
    }

    let helpButton = null;
    if (!isCreatingRoute) {
      helpButton = (
        <Button minimal onClick={() => this.setState({ isHelpOpen: true })}>
          <FormattedMessage id="misc.navHelp" />
        </Button>
      );
    }

    return (
      <div>
        <FlexContainer
          className="NavigationSidebar-Options"
          direction="column"
          flex="1"
        >
          <div className="NavigationSidebar-FormRow">
            <Label htmlFor="color" noPadding>
              <FormattedMessage id="misc.lineColor" />
            </Label>
            <ColorPicker
              value={color}
              onChange={value => updateNavSettings('color', value)}
            />
          </div>
          <ItemRow className="NavigationSidebar-FormRow">
            <LabeledInput
              isVertical
              label="misc.lineWidth"
              type="dropdown"
              clearable={false}
              value={width}
              options={this.lineWidths}
              onChange={({ value }) => updateNavSettings('width', value)}
            />
            <LabeledInput
              isVertical
              label="misc.lineType"
              type="dropdown"
              clearable={false}
              value={type}
              options={this.lineTypes}
              onChange={({ value }) => updateNavSettings('type', value)}
            />
          </ItemRow>
          <FlexContainer
            className="NavigationSidebar-FormRow"
            justify="spaceBetween"
            align="flexEnd"
          >
            <ItemRow>
              <Button
                primary
                onClick={() =>
                  isCreatingRoute
                    ? completeRoute()
                    : updateNavSettings('isCreatingRoute', !isCreatingRoute)
                }
              >
                <FormattedMessage
                  id={
                    isCreatingRoute ? 'misc.completeRoute' : 'misc.createRoute'
                  }
                />
              </Button>
              {cancelButton}
            </ItemRow>
            {helpButton}
          </FlexContainer>
          {this.renderRoutes()}
        </FlexContainer>
        {this.renderHelpModal()}
        {this.renderConfirmDeleteModal()}
        <ReactHint events position="left" />
      </div>
    );
  }
}
