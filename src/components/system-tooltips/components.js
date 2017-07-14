import styled from 'styled-components';
import { Header3 } from 'primitives';

export const Tooltip = styled.div`
  pointer-events: none;
  position: fixed;
  opacity: ${props => (props.hovered ? 1 : 0)};
  transition: opacity 0.5s;
`;

export const TooltipText = styled.div`
  background-color: ${props => props.theme.light4};
  padding: 1rem;
  border-radius: 6px;
  transform: translateX(-50%) translateY(-100%);
  z-index: 1;

  &::after {
    content: " ";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent;
    border-top-color: ${props => props.theme.light4};
  }
`;

export const SystemName = styled(Header3)`
  color: 
`;
