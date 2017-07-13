import React from 'react';
import styled from 'styled-components';

const Sidebar = styled.div`
  display: flex;
  background-color: ${props => props.theme.dark4};
  width: 300px;
`;

export default function SectorSidebar() {
  return <Sidebar />;
}
