import './createCardTextArea.scss'

type Props = {
    name:string
    handleChange:(e:any) => void
    MAX_CHARACTERS:number
    inputValue:string
    placeholder?:string
};

export function CreateCardTextArea(props: Props) {
    return <div className={'createCardTextArea'}>
        <div className={'createCardTextArea__counter'}>{props.inputValue.length}/{props.MAX_CHARACTERS} symbols</div>
        <textarea value={props.inputValue} placeholder={props.placeholder} autoComplete={'off'} className={'createCardTextArea__textarea'} name={props.name} onChange={props.handleChange} />
    </div>
};