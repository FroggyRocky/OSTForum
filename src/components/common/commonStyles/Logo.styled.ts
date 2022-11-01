import styled, {css} from "styled-components";
import {mediaSizes} from "./MediaSizes";

export const LogoText = styled.span<{isMobile:boolean}>`
  font-family: var(--family-header);
  font-weight: 700;
  font-size: 30px;
  color: #58649C;
  @media (max-width: ${mediaSizes.mobile}) {
    ${({isMobile}) => isMobile && css`
      font-size: 20px;
    `}
    font-size: 28px;
  }
`