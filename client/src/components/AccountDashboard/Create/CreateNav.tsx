import {StyledH1, StyledContent} from "../../../UIKit/BasicStyledComponents/basicStyledComponents";

import briefcase from '../../../assets/briefcase.png'
import puzzle from '../../../assets/puzzle.png'
import equalizer from '../../../assets/equalizer.png'
import folder from '../../../assets/folder.png'
import { GoPlus } from "react-icons/go";
import {NavLink} from "react-router-dom";
import './createNav.scss'
export function CreateNav() {
    return <div className={'create'}>
        <StyledContent>
        <div className={'create__container'}>
        <StyledH1>Add Content</StyledH1>

            <div className={'create__content'}>
                <NavLink to={'/create/article'} className={'create__article'}>
                    <div className={'create__vector'}>
                        <p className={'create__cardHeader'}>New Article</p>
                        <img src={folder} alt="folder"/>
                    </div>
                    <div className={'create__article__btn create__addBtn'}>
                        <GoPlus className={'create__addBtn__icon'}/>
                    </div>
                </NavLink>
                <NavLink to={'/create/affiliate'} className={'create__affiliate'}>
                    <div className={'create__vector'} >
                        <p className={'create__cardHeader'}>Affiliate Network</p>
                        <img src={puzzle} alt="puzzle"/>
                    </div>
                    <div className={'create__affiliate__btn create__addBtn'}>
                        <GoPlus className={'create__addBtn__icon'}  />
                    </div>
                </NavLink>
                <NavLink to={'/create/service'} className={'create__service'}>
                    <div className={'create__vector'} >
                        <p className={'create__cardHeader'}>Service</p>
                        <img src={equalizer} alt="equalizer"/>
                    </div>
                    <div className={'create__service__btn create__addBtn'}>

                        <GoPlus className={'create__addBtn__icon'} />
                    </div>
                </NavLink>
                <NavLink to={'/create/vacancy'} className={'create__vacancy'}>
                    <div className={'create__vector'} >
                        <p className={'create__cardHeader'}>Job opportunity</p>
                        <img src={briefcase} alt="briefcase"/>
                    </div>
                    <div className={'create__vacancy__btn create__addBtn'}>
                        <GoPlus className={'create__addBtn__icon'} />
                    </div>
                </NavLink>

            </div>
        </div>
    </StyledContent>
    </div>
};