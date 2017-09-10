import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import { X } from 'react-feather';

import Header, { HeaderType } from 'primitives/text/header';
import FlexContainer from 'primitives/containers/flex-container';
import Button from 'primitives/other/button';

import './style.css';

export default function Modal(props) {
  const { title, children, onCancel, actionButtons, ...rest } = props;
  return (
    <ReactModal
      contentLabel={title}
      {...rest}
      className={{
        base: classNames('Modal', props.className),
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
        <div className="Modal-Content">{children}</div>
        <FlexContainer justify="flexEnd" className="Modal-Section Modal-Footer">
          <Button className="Model-FooterButton" onClick={onCancel}>
            Cancel
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
  onCancel: PropTypes.func.isRequired,
  actionButtons: PropTypes.arrayOf(PropTypes.node),
};

Modal.defaultProps = {
  className: null,
  overlayClassName: null,
  actionButtons: null,
};
