import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        const { isAuthenticated } = this.props;

        return (
            <>
                <Toolbar 
                    isAuthenticated={isAuthenticated} 
                    drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    isAuthenticated={isAuthenticated} 
                    open={showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={styles.content}>
                    {this.props.children}
                </main>
            </>
        )
    };
};

const mapStateToProps = state => {
    return {
         isAuthenticated: state.auth.token !== null,
    }
};

export default connect(mapStateToProps, null)(Layout);
