import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import './createCardButton.scss'
type Props = {
isPublished:boolean;
handleSubmit:() => void
    handleDelete:() => void
    handleEdit?:() => void
};

export function CreateCardButton(props: Props) {
    return <div className={'createCardButton'}>
        <div className={'createCardButton__addBtn'} onClick={props.handleSubmit}>
            <BsFillCheckCircleFill className={`createCardButton__checkIcon ${props.isPublished && 'createCardButton__checkIcon_published'}`} />
        </div>
        <div className={'createCardButton__editorPanel'}>
            {props.isPublished &&  <MdModeEditOutline className={'createCardButton__editBtn'} onClick={props.handleEdit} />}
            <MdDelete className={'createCardButton__deleteBtn'} onClick={props.handleDelete}/>
        </div>
    </div>
};