import { useContext } from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom"
import { AuthContext } from '../../context/AuthoContext';
import { useNotificationStore } from '../../lib/notificationStore';
import '../navbar/navbar.scss'

function NavBar() {
    const [isOpen, setIsOpen] = useState(false)
    const user = true;
    const { currentUser } = useContext(AuthContext)
    const fetch = useNotificationStore(state => state.fetch)
    const number = useNotificationStore((state) => state.number);
    if (currentUser) fetch();
    return (
        <nav>
            <div className="left">
                <Link key="Logo" href="/" className='logo'>
                    <img src="/logo.png" alt="" />
                    <span>Real Estate</span>
                </Link>
                <Link key="Home" to="/">Home</Link>
                <Link key="About" to="/about">About</Link>
                <Link key="Contact" to="/contact">Contact</Link>
            </div>
            <div className="right">
                {currentUser ?
                    (
                        <div className='user'>
                            <img src={currentUser.avatar || "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"} alt="" />
                            <span>{currentUser.username}</span>
                            <Link key="profile" to="/profile" className='profile'>
                                {number > 0 && <div className="notification">{number}</div>}
                                <span>Profile</span>
                            </Link>
                        </div>
                    )
                    :
                    (
                        <>
                            <Link key="Sign_In" to="/login">Sign in</Link>
                            <Link key="Sign_Up" to="/register" className='register'>Sign up</Link>
                            <div className='menuIcon' onClick={() => setIsOpen(!isOpen)}>
                                <img src="/menu.png" alt="" />
                            </div>
                        </>
                    )
                }

                <div className={isOpen ? "menu active" : "menu"}>
                    <Link key="Home" href="">Home</Link>
                    <Link key="About" href="">About</Link>
                    <Link key="Contact" href="">Contact</Link>
                    <Link key="Agents" href="">Agents</Link>
                    <Link key="Sign_In" href="">Sign in</Link>
                    <Link key="Sign_Up" href="">Sign up</Link>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;