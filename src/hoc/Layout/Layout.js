import React, { Component, Fragment } from 'react';

import styles from './Layout.module.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer,
            }
        })
    }

    render() {

        const { showSideDrawer } = this.state;

        return (
            <Fragment>

                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />

                <SideDrawer
                    open={showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />

                <main className={styles.content}>
                    {this.props.children}
                </main>

            </Fragment>
        )
    }
};

export default Layout;
