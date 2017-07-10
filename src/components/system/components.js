import styled from 'styled-components';

export const Circle = styled.circle`
  fill: ${props => props.theme.light};
`;

export const Polygon = styled.polygon`
  fill: ${props => (props.highlighted ? props.theme.dark : props.theme.darker)};
  transition: all 0.2s;
`;

export const G = styled.g`
  cursor: default;
`;

export const Hoverable = styled(G)`
  &:hover polygon {
    fill: ${props => (props.hoverable ? props.theme.primary : props.theme.darker)};
  }
`;
