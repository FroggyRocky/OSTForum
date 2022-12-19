import './dropdown.css'


type Props = {
    selectOptions: Array<any>,
    currentValue: any,
    isOpen: boolean,
    setValue: (value: any) => void,
    setTouched: (value: boolean) => void,
};

export const DropDown = (props: Props) => {


    const selectOptions = props.selectOptions.map((el, index) => {
        return <div
            className={`dropDown__optionContainer ${(props.currentValue?.includes(el.id) || props.currentValue?.includes(el.name)) && 'dropDown__optionContainer_active'}`}
            key={el.id || index} onClick={() => props.setValue(el)}>
            <div className='dropDown__option'>
                <span>{el.name}</span>
            </div>
        </div>
    })


    return <>
        {props.isOpen && <section className='dropDown__dropDown'>
            {selectOptions}
        </section>
        }
    </>

}