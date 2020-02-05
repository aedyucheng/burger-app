import React from 'react';

import Aux from '../../hoc/Auxi';
import Toolbar from '../Toolbar/Toolbar';

import classes from './Layout.module.css';

const layout = props => (
    <Aux>
        <Toolbar />
        <main className={classes.content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;