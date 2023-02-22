import './layout.css'
import {User} from "../User";
import {ReactNode} from "react";
type Props = {
    children:ReactNode
};

export function Layout(props: Props) {
    return <div className={'container'}>
        <div className='bubble bubble_1'></div>
        <div className='bubble bubble_2'></div>
        <div className='bubble bubble_3'></div>
        <div className='bubble bubble_4'></div>
        <div className='bubble bubble_5'></div>
        <main className={'content'}>
            {props.children}
        </main>
    </div>
};