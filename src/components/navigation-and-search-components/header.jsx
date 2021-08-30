import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logOut } from "../../reducers/userRed"

export const Header = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    return <div className="card">
        <div className="card-content nav-wrapper blue-grey darken-1">
            <nav className=" blue-grey darken-1">

                <a href="#!" className="brand-logo"> <span>RSS feed reader</span></a>
                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">Onlyne readera</i></a>
                <ul className="right hide-on-med-and-down">

                    {!isAuth &&
                        <div>
                            <li><NavLink to="/">Log in</NavLink></li>
                        </div>
                    }

                    {isAuth &&
                        <div>
                            <button className="btn" onClick={() => dispatch(logOut())} > <NavLink to="/"> Log out </NavLink></button>
                        </div>
                    }
                </ul>
            </nav>
        </div>
    </div>
}