import styled from "styled-components";
import {mediaSizes} from "./MediaSizes";
export const Content = styled.div`
  width: 65%;
  margin: auto auto;
  position: relative;
  @media(max-width: ${mediaSizes.mobile}) {
    width: 100%;
    padding: 0 20px;
  }
`