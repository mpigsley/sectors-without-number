import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Sidebar = styled.div`
  display: flex;
  background-color: ${props => props.theme.dark4};
  width: 300px;
`;

export default function SectorSidebar({ children }) {
  return <Sidebar>{children}</Sidebar>;
}

SectorSidebar.propTypes = {
  children: PropTypes.node.isRequired,
};
