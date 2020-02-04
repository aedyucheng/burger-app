import React from 'react';

import Aux from '../../hoc/Auxi';
import classes from './Layout.module.css';

const layout = props => (
    <Aux>
        <div>toolbar, content, footer</div>
        <main className={classes.content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;