import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxi';

import classes from './SideDrawer.module.css';

const sideDrawer = props => (
    <Aux>
        <Backdrop show={props.open} clicked={props.closed} />
        <div className={classes.SideDrawer}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    </Aux>
);

export default sideDrawer;