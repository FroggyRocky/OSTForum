import './layout.scss'
import {ReactNode} from "react";
type Props = {
    children:ReactNode
};

export function Layout(props: Props) {
    return <div className={'tapLink__layout__container'}>
        <div className='tapLink__layout__bubble tapLink__layout__bubble_1'></div>
        <div className='tapLink__layout__bubble tapLink__layout__bubble_2'></div>
        <div className='tapLink__layout__bubble tapLink__layout__bubble_3'></div>
        <div className='tapLink__layout__bubble tapLink__layout__bubble_4'></div>
        <div className='tapLink__layout__bubble tapLink__layout__bubble_5'></div>
        <main className={'tapLink__layout__content'}>
            {props.children}
        </main>
    </div>
};