import {FaFileImage} from "react-icons/fa";
import './createCardImg.scss'
import {StyledAddImgWithTextBtn} from "../../StyledComponents";
import {AiOutlineClose} from "react-icons/ai";
import {RiImageAddFill} from "react-icons/ri";
import {BsFileEarmarkRichtextFill} from "react-icons/bs";
import {useRef} from "react";

type Props = {
formikSetCoverValue:(src:ArrayBuffer | string, file:File) => void
value:string | undefined
};

export function CreateCardImg(props: Props) {
    const fileRef = useRef<HTMLInputElement>(null)
    function handleClick() {
        if(fileRef.current) {
            fileRef.current.click()
        }
    }
    async function onAddImg(e: any) {
        const files = e.target.files
        if (files) {
            const reader = new FileReader()
            reader.readAsDataURL(files[0])
            reader.onloadend = async () => {
                const src = await reader.result
                if (src) {
                         props.formikSetCoverValue(src, files[0])
                }
            }
        }
    }
    return <div className={'createCardImg'} onClick={handleClick}>
        {props.value ? <img className={'createCardImg__img'} src={props.value} alt="cover_image"/> : <>
            <FaFileImage className={'createCardImg__icon'} size={110} />
            <p className={'createCardImg__text'}>Add preview image</p>
            <p className={'createCardImg__text'}>min. size - 240x240</p>7
        </>
        }
        <input ref={fileRef} name='coverImg_withText' onChange={onAddImg}
               style={{display: 'none'}}
               type="file" accept='image/*' id={'uploadWithText'}/>
    </div>
};