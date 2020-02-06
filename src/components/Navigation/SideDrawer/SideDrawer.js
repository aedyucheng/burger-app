import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxi';

import classes from './SideDrawer.module.css';

const sideDrawer = props => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.showSideDrawer) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    console.log(attachedClasses.join(' '));
    return (
        <Aux>
            <Backdrop show={props.showSideDrawer} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;