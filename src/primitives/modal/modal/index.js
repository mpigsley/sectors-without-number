import React from 'react';
import { X } from 'react-feather';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import { FormattedMessage } from 'react-intl';

import Header, { HeaderType } from 'primitives/text/header';
import FlexContainer from 'primitives/container/flex-container';
import Button from 'primitives/other/button';

import './style.scss';

export default function Modal({
  title,
  children,
  cancelText,
  footerText,
  onCancel,
  actionButtons,
  width,
  hideHeader,
  hideFooter,
  className,
  overlayClassName,
  contentClassName,
  ...rest
}) {
  let header = null;
  if (!hideHeader) {
    header = (
      <FlexContainer
        align="center"
        justify="spaceBetween"
        className="Modal-Section Modal-Header"
      >
        <Header className="Modal-Title" type={HeaderType.header3}>
          {title}
        </Header>
        <X className="Modal-Close" onClick={onCancel} size={30} />
      </FlexContainer>
    );
  }

  return (
    <ReactModal
      contentLabel={title}
      ariaHideApp={false}
      style={{ content: { width } }}
      {...rest}
      className={{
        base: classNames('Modal', className),
        afterOpen: 'Modal--open',
        beforeClose: 'Modal--closed',
      }}
      overlayClassName={{
        base: classNames('Modal-Overlay', overlayClassName),
        afterOpen: 'Modal-Overlay--open',
        beforeClose: 'Modal-Overlay--closed',
      }}
    >
      <FlexContainer direction="column" className="Modal-InnerContainer">
        {header}
        <div className={classNames('Modal-Content', contentClassName)}>
          {children}
        </div>
        {!hideFooter && (
          <FlexContainer
            align="center"
            justify={footerText ? 'spaceBetween' : 'flexEnd'}
            className="Modal-Section Modal-Footer"
          >
            {footerText}
            <span>
              <Button className="Model-FooterButton" onClick={onCancel}>
                {cancelText || <FormattedMessage id="misc.cancel" />}
              </Button>
              {React.Children.map(actionButtons, button =>
                React.cloneElement(button, {
                  className: classNames(
                    button.props.className,
                    'Model-FooterButton',
                  ),
                }),
              )}
            </span>
          </FlexContainer>
        )}
      </FlexContainer>
    </ReactModal>
  );
}

Modal.propTypes = {
  className: PropTypes.string,
  overlayClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  cancelText: PropTypes.string,
  footerText: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  actionButtons: PropTypes.arrayOf(PropTypes.node),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  hideHeader: PropTypes.bool,
  hideFooter: PropTypes.bool,
};

Modal.defaultProps = {
  className: undefined,
  overlayClassName: undefined,
  contentClassName: undefined,
  cancelText: undefined,
  footerText: undefined,
  actionButtons: undefined,
  width: 400,
  hideHeader: false,
  hideFooter: false,
};
