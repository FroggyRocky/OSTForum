import {useState, memo, useEffect} from 'react'
import {Loader} from "../Loader/Loader";
import defaultCover from '../../assets/defaultCardCover.png'
type Props = {
width:string
    height:string
    src:string
    alt:string
}

 function ImgWithLoaderComponent(props:Props) {

    const [imgLoaderState, setImgLoaderState] = useState<boolean>(true)

    function onload(src:string) {
        if(src) {
            const img = new window.Image()
            img.src = src;
            img.onload = () => {
                setImgLoaderState(false)
            };
            img.onerror = () => {

                setImgLoaderState(true)
            };
        } else {
            setImgLoaderState(false)
        }
    }
    useEffect(() => {
        onload(props.src)
    }, [])

     return <>
         {imgLoaderState ? <Loader />
         : <img src={props.src || defaultCover} alt={props.alt} width={props.width} height={props.height}  />}
             </>
}

export const ImgWithLoader = memo(ImgWithLoaderComponent)