import React from 'react';

import classes from './BuildControl.module.css';

const buildControl = props => (
    <div className={classes.BuildControl}>
        <label>{props.label}</label>
        <button>+</button>
        <button>+</button>
    </div>
);

export default buildControl;