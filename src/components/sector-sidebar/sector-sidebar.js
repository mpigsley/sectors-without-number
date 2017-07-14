import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Sidebar = styled.div`
  background-color: ${props => props.theme.dark3};
  display: flex;
  width: 300px;
`;

export default function SectorSidebar({ children }) {
  return <Sidebar>{children}</Sidebar>;
}

SectorSidebar.propTypes = {
  children: PropTypes.node.isRequired,
};
