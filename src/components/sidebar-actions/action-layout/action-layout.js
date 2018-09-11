import React from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import copy from 'copy-to-clipboard';
import { intlShape } from 'react-intl';

import ExportModal from 'components/export-modal';
import SidebarContainer from 'primitives/container/sidebar-container';

import Entities from 'constants/entities';

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
  let allActions = [];
  if (renderActions) {
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

    allActions = [
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
  }

  return (
    <SidebarContainer title={name} actions={allActions} footer={footer}>
      {children}
      <ExportModal />
    </SidebarContainer>
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
