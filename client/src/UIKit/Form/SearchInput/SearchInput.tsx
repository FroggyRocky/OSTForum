import {IoSearch} from 'react-icons/io5'
import './searchInput.scss'
type Props = {
    handleChange:(e:any) => void
    value:string

};

export function SearchInput(props: Props) {
    return <div className='searchInput'>
        <input className={'searchInput__input'} type="text" value={props.value} onChange={props.handleChange}/>
        <div className={'searchInput__btn'}>
            <IoSearch className={'searchInput__btn__icon'} />
        </div>
    </div>
};