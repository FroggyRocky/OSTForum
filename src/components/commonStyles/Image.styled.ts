import styled from "styled-components";

type ImageStyledType = {
    src:string,
    top?:string,
    left?:string,
    right?:string,
    bottom?:string,
    position?:string
    zIndex?:string,
    alt:string,
    pointerEvents?:string
}

export const Image = styled.img<ImageStyledType>`
src:${({src}) => src};
  position:${({position}) => position || 'static'};
  top: ${({top}) => top};
  left: ${({left}) => left};
  right: ${({right}) => right};
  bottom: ${({bottom}) => bottom};
  z-index: ${({zIndex}) => zIndex};
  alt: ${({alt}) => alt};
  pointer-events: ${({pointerEvents}) => pointerEvents || 'auto'};
`