import './dropdown.css'



type Props = {
    selectOptions:Array<any>,
    value:string,
    touched:boolean,
    setValue:(value:string) => void,
    setTouched:(value:boolean) => void,
};

export const DropDown = (props: Props) => {
    function selectOption(option:any) {
        props.setValue(option)
    }

    const selectOptions = props.selectOptions.map((el, index) => {
        return <div className={`dropDown__optionContainer ${el.name === props.value && 'dropDown__optionContainer_active'}`}
            key={el.id || index} onClick={() => selectOption(el.name)}>
            <div className='dropDown__option'>
                <span>{el.name}</span>
            </div>
        </div>
    })


    return <>
        {props.touched && <section className='dropDown__dropDown'>
                {selectOptions}
        </section>
        }
    </>

}