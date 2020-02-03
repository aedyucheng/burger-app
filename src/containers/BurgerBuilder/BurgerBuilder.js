import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../compnents/Burger/Burger';

class BurgerBuilder extends Component {
    render(){
        return(
            <Aux>
                <Burger />
            </Aux>
        );

    }
}

export default BurgerBuilder;