import './createCardInput.scss'
type Props = {
    handleInputChange:(e:any) => void
    inputValue:string
    MAX_CHARACTERS:number
    name:string
    placeholder?:string
};

export function CreateCardInput(props: Props) {
    return   <div className="createCardInput">
        <div className="createCardInput__counter">{props.inputValue.length}/{props.MAX_CHARACTERS} symbols</div>
        <input
            type="text"
            autoComplete={'off'}
            className="createCardInput__input"
            value={props.inputValue}
            name={props.name}
            onChange={props.handleInputChange}  placeholder={props.placeholder} />

    </div>
};