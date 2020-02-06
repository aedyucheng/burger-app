import React, { Component } from 'react';

import Aux from '../../hoc/Auxi';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

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