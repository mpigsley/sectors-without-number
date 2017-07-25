import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Sidebar = styled.div`
  background-color: ${props => props.theme.dark3};
  display: flex;
  width: 350px;
`;

export default function SectorSidebar({ children }) {
  if (window.innerWidth <= 700) {
    return null;
  }
  return <Sidebar>{children}</Sidebar>;
}

SectorSidebar.propTypes = {
  children: PropTypes.node.isRequired,
};
