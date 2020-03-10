import React, { Component, Fragment } from 'react';

import './Layout.css';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    sideDrawerToggleHandler = () => {
        this.setState( (prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer,
            }
        })
    }

    render() {

        const { showSideDrawer } = this.state;

        return (
            <Fragment>

                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>

                <SideDrawer 
                    open={showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />

                <main className="content">
                    {this.props.children}
                </main>
                
            </Fragment>
        )
    }
};

export default Layout;
