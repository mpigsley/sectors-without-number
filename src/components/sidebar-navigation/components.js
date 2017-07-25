import styled, { css } from 'styled-components';

import { FlexContainer } from 'primitives';
import { ChevronLeft, Share, Printer, Sun, Globe, Map } from 'react-feather';

export const InfoContainer = styled(FlexContainer)`
  height: 100vh;
  width: 100%;
`;
export const HeaderContainer = styled.div`
  padding-bottom: 0.6rem;
  border-bottom: 1px solid ${props => props.theme.dark2};
`;

const iconCss = css`
  ${props => (props.hidden ? 'visibility: hidden;' : '')}
  color: ${props => props.theme.light2};
`;
const nonLinkCss = css`
  ${iconCss}
  padding: 10px 11px;
`;
const iconLinkCss = css`
  ${iconCss}
  cursor: pointer;
  transition: all 0.3s;
  padding: 7px 8px;

  &:hover {
    color: ${props => props.theme.light1};
  }
`;
export const LeftArrowIcon = styled(ChevronLeft)`${iconLinkCss}`;
export const ShareIcon = styled(Share)`${iconLinkCss}`;
export const PrinterIcon = styled(Printer)`${iconLinkCss}`;
export const SunIcon = styled(Sun)`${nonLinkCss}`;
export const GlobeIcon = styled(Globe)`${nonLinkCss}`;
export const MapIcon = styled(Map)`${nonLinkCss}`;
