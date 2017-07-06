import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isExternal from 'is-url-external';
import styled, { css } from 'styled-components';

const style = css`
  display: inline-block;
  height: 38px;
  padding: 0 30px;
  color: ${props => props.theme.lightest};
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: .1rem;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  background-color: transparent;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.lightest};
  cursor: pointer;
  box-sizing: border-box;
  font-weight: 400;
  transition: all 0.3s;
  outline: none;
  ${props => (props.padded ? 'margin: 0.4rem 1rem;' : '')}

  &:hover {
    color: ${props => props.theme.light};
    border-color: ${props => props.theme.light};
    outline: 0;
  }
`;

const LinkDuo = (props) => {
  if (isExternal(props.to)) {
    return (
      <a // eslint-disable-line
        href={props.to}
        {...props}
      />
    );
  }
  return <Link {...this.props} />;
};

LinkDuo.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export { style };
export default styled(({ padded, ...rest }) => <LinkDuo {...rest} />)`${style}`;
