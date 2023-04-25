import {useState} from "react";
import {Avatar} from "../../UIKit/ProfileWidget/Avatar";
import {Link, useLocation} from "react-router-dom";
import {useAppSelector} from "../../redux/storeHooks/storeHooks";
import {IUser} from "../../redux/user/userType";
import {FaTelegramPlane} from "react-icons/fa";
import {HiOutlineMenuAlt3} from "react-icons/hi";
import {StyledRoundBtn, StyledFlex} from "../../UIKit/BasicStyledComponents/basicStyledComponents";
import {ReactComponent as Logo} from '../../assets/logo.svg'
import {MdOutlineClose} from "react-icons/md";
import './header.scss'
import {SearchWidget} from "./SearchWidget/SearchWidget";

type Props = {}

export function Header(props: Props) {


    const {pathname} = useLocation()
    const path = pathname.split('/')[1]
    const isAuth = useAppSelector(state => state.authConfigs.isAuth)
    const user: IUser | null = useAppSelector(state => state.user.userData)
    const [isMobNavigationPanelOpen, setMobileNavigationPanel] = useState(false)
    const pathData = [{
        pathName: 'Home',
        path: '/'
    },
    ]
console.log()
    return <div className={'header'}>
        <main className={'header__content'}>
            <Link style={{zIndex: 150}} to='/'>
                <StyledFlex justifyContent='flex-start' alignItems='center'>
                    <Logo className={'header__logo'}/>
                    <p className={'header__logo__text'}>MY CLICK</p>
                </StyledFlex>
            </Link>
            {isAuth &&
            <section className={'header__navigationLinks'}>
                <Link state={pathData} to={'/affiliates'} className={'header__navigationLinks__link'}>
                    Affiliates
                </Link>
                <Link state={pathData} to={'/services'} className={'header__navigationLinks__link'}>
                    Services
                </Link>
                <Link state={pathData} to={'/vacancies'} className={'header__navigationLinks__link'}>
                    Vacancies
                </Link>
            </section>
            }
            <section className={'header__actionPanel'}>
                <Link className={'header__tgBtn'} to='https://t.me/myclickmedia' target={'_blank'}>
                    <StyledRoundBtn>
                        <FaTelegramPlane style={{margin: '0 1.5px 0 0'}} color={'white'}/>
                    </StyledRoundBtn>
                </Link>
                {!pathname.includes('search')  &&
                    <div className={'header__search'}>
                    <SearchWidget/>
                </div>
                }
                <div className={'header__menuBurger'}>
                    <svg width="0" height="0">
                        <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                            <stop stopColor="#8492D1" offset="0%"/>
                            <stop stopColor="#58649C" offset="100%"/>
                        </linearGradient>
                    </svg>
                    <svg width="0" height="0">
                        <linearGradient id="blueGr" x1="100%" y1="100%" x2="0%" y2="0%">
                            <stop stopColor="#8492D1" offset="0%"/>
                            <stop stopColor="#58649C" offset="100%"/>
                        </linearGradient>
                    </svg>
                    {isMobNavigationPanelOpen ? <MdOutlineClose size={24} style={{fill: 'url(#blueGr)'}}
                                                                onClick={() => setMobileNavigationPanel(false)}/>
                        :
                        <HiOutlineMenuAlt3 size={24} style={{stroke: 'url(#blue-gradient)'}}
                                           onClick={() => setMobileNavigationPanel(true)}/>
                    }
                </div>
                {isAuth && <div className={'header__avatar'}>
                    <Link to={`/dashboard`}>
                        <Avatar avatar={user.avatar}/>
                    </Link>
                </div>
                }
            </section>
        </main>
        {isMobNavigationPanelOpen &&
            <div className={'header__menu_mob'}>
                {isAuth &&
                <main className={'header__menu_mob__content'}>
                    <Link to={'/affiliates'} className={'header__menu_mob__link'}>
                        Affiliates
                    </Link>
                    <Link to={'/Networking'} className={'header__menu_mob__link'}>
                        Networking
                    </Link>
                    <Link to={'/services'} className={'header__menu_mob__link'}>
                        Services
                    </Link>
                    <Link to={'/cases'} className={'header__menu_mob__link'}>
                        Cases
                    </Link>
                    <Link to={'/vacancies'} className={'header__menu_mob__link'}>
                        Vacancies
                    </Link>
                    {isAuth && <div className={'header__menu_mob__avatar'}>
                        <Link to={`/dashboard`}>
                            <Avatar avatar={user.avatar}/>
                        </Link>
                    </div>}
                </main>
                }
            </div>
        }
    </div>
}

