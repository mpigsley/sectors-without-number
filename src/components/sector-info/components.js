import styled from 'styled-components';

import { Header4 } from 'primitives';

export const Name = styled(Header4)`
  margin: 0;
`;
export const Key = styled.div`
  color: ${props => props.theme.light1};
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;
