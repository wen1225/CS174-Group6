import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import "./styles/menubar.scss"
import userIcon from './img/user.png'
import mobileMenuIcon from './img/mobile-menu.png'
import closeMobileMenuIcon from './img/close-menu.png'

export function MenuBar() {

    const [isShowFullMobileMenu, setIsShowFullMobileMenu] = useState(false);

    return (
        <menu id="main">
            <Link id="site-name" to="">
                Customer Relationship Management
            </Link>
            <nav id="main">
                <Link to="case">Case</Link>
                <Link to="member">Member</Link>
            </nav>
            <div id="user-setting">
                <img src={userIcon} id="user" />
                <menu id="user-dropdown">
                    <Link to="auth/login" className="usr-drop-link">Login</Link>
                    <Link to="auth/register" className="usr-drop-link">Register</Link>
                </menu>
            </div>
            <div id="mobile-menu">
                <img src={mobileMenuIcon} id="icon" onClick={()=>{setIsShowFullMobileMenu(true)}}/>

            </div>
            {
                isShowFullMobileMenu ? <div id="full-screen-menu">
                    <h1 id="mobile-site-name">Customer Relationship Management</h1>
                    <img src={closeMobileMenuIcon} id="close-menu" onClick={()=>{setIsShowFullMobileMenu(false)}}/>
                    <nav id="mobile">
                        <Link to="case" className='mobile' onClick={()=>{setIsShowFullMobileMenu(false)}}>Case</Link>
                        <Link to="member" className='mobile' onClick={()=>{setIsShowFullMobileMenu(false)}}>Member</Link>
                        <Link to="auth/login" className='mobile' onClick={()=>{setIsShowFullMobileMenu(false)}}>Login</Link>
                        <Link to="auth/register" className='mobile' onClick={()=>{setIsShowFullMobileMenu(false)}}>Register</Link>
                    </nav>
                </div> : null
            }
        </menu>
    )
}