import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Hamburger from '../SideDrawer/Hamburger/Hamburger';

import classes from './Toolbar.module.css';

const toolbar = props => ( 
    <header className={classes.Toolbar}>
        <Hamburger toggleSideDrawer={props.toggleSideDrawer}/>
        <Logo height="80%"/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth}/>
        </nav>
    </header>
);

export default toolbar;