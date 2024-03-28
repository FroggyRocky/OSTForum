import styled, {css} from "styled-components";
import {useState} from 'react'

type Props = {
width:string
    height:string
    src:string
    defaultSrc:string
    alt:string
}
const ImgLoader = styled.div`
  width: 60px;
  height: 60px;
  border: 5px solid #FFF;
  border-bottom-color: #58649C;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  position: absolute;
  top: 40%;
  right: 50%;
  
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`
const Image = styled.img<{imgLoaderState?:boolean}>`
${({imgLoaderState}) => !imgLoaderState && css`
background-color: black;
  src:url('#');
`}
`

export function ImgWithLoader(props:Props) {

    const [imgLoaderState, setImgLoaderState] = useState<boolean>(false)

    function onload(e:any) {
        if(props.src) {
            const img = new window.Image()
            const src = e.target.src
            img.src = src;
            img.onload = () => {
                setImgLoaderState(true)
            };
            img.onerror = () => {
                setImgLoaderState(false)
            };
        }
    }
     return <>
         {!imgLoaderState && props.src && <ImgLoader /> }
         <Image src={props.src || props.defaultSrc} imgLoaderState={imgLoaderState} alt={props.alt} width={props.width} height={props.height} onLoad={onload}   />
</>
}