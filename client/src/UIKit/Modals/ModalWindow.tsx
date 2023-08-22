import './modalWindow.css'
import { AiOutlineClose } from "react-icons/ai";


type Props = {
    smallModal:boolean,
    closeModal:(state:boolean) => void,
    header:string,
    text:string,
};

export function ModalWindow  (props: Props) {

    function closeModal(e:any) {
        const target = e.target.className
        const currentTarget = e.currentTarget.getAttribute('data-action')
        if(target === 'commonModal__container' || currentTarget === 'closeModal') {
            props.closeModal(false)
        }
    }


    return <div className="commonModal__container" onClick={closeModal}>
        <div className={props.smallModal ? 'commonModal__smallModal' : 'commonModal__content'}>
            <AiOutlineClose size={35} className='commonModal__closeIcon' data-action='closeModal' onClick={closeModal} />
            <main className= {props.smallModal ? 'commonModal__smallModal-info' : 'commonModal__info'}>
                <h2 className='commonModal__header'>{props.header}</h2>
                <p className='commonModal__text'>{props.text}</p>
            </main>
        </div>
    </div>
};