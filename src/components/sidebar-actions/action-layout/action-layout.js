import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import copy from 'copy-to-clipboard';
import { FormattedMessage, intlShape } from 'react-intl';

import ExportModal from 'components/export-modal';
import FlexContainer from 'primitives/container/flex-container';
import Header, { HeaderType } from 'primitives/text/header';
import Button from 'primitives/other/button';
import ButtonLink from 'primitives/other/button-link';

import Entities from 'constants/entities';

import './style.css';

// eslint-disable-next-line react/prop-types
const renderAction = ({ key, to, ...props }, index) => {
  const Btn = to ? ButtonLink : Button;
  return (
    <Fragment key={key}>
      {index ? <span className="ActionLayout-Spacer" /> : null}
      <Btn minimal to={to} {...props} />
    </Fragment>
  );
};

export default function ActionLayout({
  name,
  backUrl,
  actions,
  footer,
  renderActions,
  currentSector,
  entityType,
  children,
  isSaved,
  isShared,
  openExport,
  intl,
}) {
  const share = [];
  if (isSaved && !isShared) {
    share.push({
      key: 'share',
      children: intl.formatMessage({ id: 'misc.share' }),
      onClick: () => {
        let url = window.location.href;
        const split = url.split('/');
        if (split.length === 7) {
          url = split.slice(0, 5).join('/');
        }
        copy(url);
        toastr.success(
          intl.formatMessage({ id: 'misc.clipboardCopy' }),
          intl.formatMessage(
            { id: 'misc.copiedLinkTo' },
            {
              entity: intl.formatMessage({
                id: Entities[entityType].name,
              }),
            },
          ),
        );
      },
    });
  }

  const allActions = [
    {
      key: 'back',
      children: intl.formatMessage({ id: 'misc.back' }),
      to: backUrl || `/sector/${currentSector}`,
    },
    ...actions,
    ...share,
    {
      key: 'export',
      children: intl.formatMessage({ id: 'misc.export' }),
      onClick: openExport,
    },
  ];

  let sidebarFooter = footer;
  if (!footer) {
    sidebarFooter = (
      <div className="ActionLayout-Footer">
        <FlexContainer justify="center">
          <ButtonLink
            minimal
            to="https://www.patreon.com/sectorswithoutnumber"
            target="_blank"
            className="ActionLayout-Patreon"
          >
            <FormattedMessage id="misc.becomePatron" />
          </ButtonLink>
        </FlexContainer>
      </div>
    );
  }

  let actionList = null;
  if (renderActions) {
    actionList = (
      <FlexContainer
        justify="center"
        shrink="0"
        className="ActionLayout-SubHeader"
      >
        {allActions.map(renderAction)}
      </FlexContainer>
    );
  }

  return (
    <FlexContainer className="ActionLayout-Info" direction="column">
      <div className="ActionLayout-Header">
        <FlexContainer align="center" shrink="0">
          <FlexContainer flex="1" justify="center" align="flexEnd">
            {typeof name === 'string' ? (
              <Header type={HeaderType.header2}>{name}</Header>
            ) : (
              name
            )}
          </FlexContainer>
        </FlexContainer>

        {actionList}
      </div>
      <FlexContainer direction="column" flex="1" scroll>
        {children}
      </FlexContainer>
      {sidebarFooter}
      <ExportModal />
    </FlexContainer>
  );
}

ActionLayout.propTypes = {
  name: PropTypes.node.isRequired,
  backUrl: PropTypes.string,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      to: PropTypes.string,
    }),
  ),
  footer: PropTypes.node,
  renderActions: PropTypes.bool,
  currentSector: PropTypes.string.isRequired,
  entityType: PropTypes.string,
  children: PropTypes.node.isRequired,
  isSaved: PropTypes.bool.isRequired,
  isShared: PropTypes.bool.isRequired,
  openExport: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

ActionLayout.defaultProps = {
  backUrl: undefined,
  actions: [],
  entityType: undefined,
  footer: undefined,
  renderActions: true,
};
