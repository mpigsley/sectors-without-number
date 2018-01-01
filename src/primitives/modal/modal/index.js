import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import { X } from 'react-feather';

import Header, { HeaderType } from 'primitives/text/header';
import FlexContainer from 'primitives/container/flex-container';
import Button from 'primitives/other/button';

import './style.css';

export default function Modal(props) {
  const {
    title,
    children,
    cancelText,
    onCancel,
    actionButtons,
    doubleSize,
    hideHeader,
    ...rest
  } = props;

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
      {...rest}
      className={{
        base: classNames('Modal', props.className, {
          'Modal--doubleSize': doubleSize,
        }),
        afterOpen: 'Modal--open',
        beforeClose: 'Modal--closed',
      }}
      overlayClassName={{
        base: classNames('Modal-Overlay', props.overlayClassName),
        afterOpen: 'Modal-Overlay--open',
        beforeClose: 'Modal-Overlay--closed',
      }}
    >
      <FlexContainer direction="column">
        {header}
        <div className="Modal-Content">{children}</div>
        <FlexContainer justify="flexEnd" className="Modal-Section Modal-Footer">
          <Button className="Model-FooterButton" onClick={onCancel}>
            {cancelText}
          </Button>
          {React.Children.map(actionButtons, button =>
            React.cloneElement(button, {
              className: classNames(
                button.props.className,
                'Model-FooterButton',
              ),
            }),
          )}
        </FlexContainer>
      </FlexContainer>
    </ReactModal>
  );
}

Modal.propTypes = {
  className: PropTypes.string,
  overlayClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  cancelText: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  actionButtons: PropTypes.arrayOf(PropTypes.node),
  doubleSize: PropTypes.bool,
  hideHeader: PropTypes.bool,
};

Modal.defaultProps = {
  className: null,
  overlayClassName: null,
  cancelText: 'Cancel',
  actionButtons: null,
  doubleSize: false,
  hideHeader: false,
};
