import styled from "styled-components";
import {Loader} from "../Loader/Loader";

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 200;
display: flex;
  align-self: center;
  justify-content: center;
`

type Props = {

};
export function BackgroundLoader (props: Props){
    return <Wrapper>
        <Loader />
    </Wrapper>
};