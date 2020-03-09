import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';

import './Toolbar.css';

const toolbar = (props) => (
    <header className="Toolbar">
        <div>MENU</div>
        <div className="Logo-Toolbar">
            <Logo />
        </div>
        <nav className="DesktopOnly">
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;