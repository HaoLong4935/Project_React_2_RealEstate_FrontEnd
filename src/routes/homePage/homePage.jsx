import React from 'react'
import { useContext } from 'react'
import SearchBar from '../../components/searchBar/SearchBar'
import { AuthContext } from '../../context/AuthoContext'
import './homePage.scss'
function HomePage() {
    const { currentUser } = useContext(AuthContext)
    console.log("The current user is:", currentUser);
    return (
        <div className='homePage'>
            <div className="textContainer">
                <div className="wrapper">
                    <h1 className='title'>
                        Find Real Estate & Get Your Dream Place Find Beautiful Places
                    </h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae quas ullam assumenda consequuntur doloribus
                        ducimus nisi debitis provident pariatur consequatur! Perferendis iusto eius excepturi nostrum ducimus
                        voluptate, quod saepe sapiente.
                    </p>
                    <SearchBar />
                    <div className='boxes'>
                        <div className="box">
                            <h1>16+</h1>
                            <h2>Years of Experience</h2>
                        </div>
                        <div className="box">
                            <h1>200</h1>
                            <h2>Award Gained</h2>
                        </div>
                        <div className="box">
                            <h1>1200+</h1>
                            <h2>Property Ready</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="imgContainer">
                <img src="/bg.png" alt="" />
            </div>
        </div>
    )
}

export default HomePage