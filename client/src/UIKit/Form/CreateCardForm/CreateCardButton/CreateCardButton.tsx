import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import './createCardButton.scss'
type Props = {
isPublished:boolean;
handleSubmit:() => void
};

export function CreateCardButton(props: Props) {
    return <div className={'createCardButton'} onClick={props.handleSubmit}>
        <div className={'createCardButton__addBtn'}>
            <BsFillCheckCircleFill className={'createCardButton__checkIcon'} />
        </div>
        <div className={'createCardButton__editorPanel'}>
            <MdModeEditOutline className={'createCardButton__editBtn'} />
            <MdDelete className={'createCardButton__deleteBtn'}/>
        </div>
    </div>
};