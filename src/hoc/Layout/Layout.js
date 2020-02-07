import React, { Component } from 'react';

import Aux from '../Auxi/Auxi';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css';

class Layout extends Component {
    state = {
        showSideDrawer : false
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer: false});
    }

    showSideDrawerHandler = () => {
        this.setState({showSideDrawer: true});
    }

    render() {
        return (
            <Aux>
                <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler}/>
                <SideDrawer 
                    showSideDrawer={this.state.showSideDrawer} 
                    closed={this.closeSideDrawerHandler}/>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;