import React from 'react';

import './Layout.css';

import Aux from '../../hoc/Aux';


const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className="content">
            {props.children}
        </main>
    </Aux>
);

export default layout;
