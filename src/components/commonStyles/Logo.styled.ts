import styled from "styled-components";
import {mediaSizes} from "./MediaSizes";

export const LogoText = styled.span`
  font-family: var(--family-header);
  font-weight: 700;
  font-size: 30px;
  color: #58649C;
  @media (max-width: ${mediaSizes.mobile}) {
    font-size: 20px;
  }
`