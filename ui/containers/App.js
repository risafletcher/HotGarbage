import React, {Component} from 'react';
import Dashboard from '../components/dashboard';
import Temperature from '../components/temperature';
import Humidity from '../components/humidity';
import Gas from '../components/gas';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {Tabs, Tab} from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import Slider from 'material-ui/Slider';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }

    handleClick = (event) => {
        // This prevents ghost click.
        event.preventDefault();
    
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };
    
    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };


    render () {
        return (
            <MuiThemeProvider>
                <div>
                <AppBar title="🔥🗑️Hot Garbage🗑️🔥" 
                        iconClassNameLeft="muidocs-icon-navigation-expand-more"
                        onLeftButtonClick={this.handleClick}
                        />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                    >
                    <Menu>
                        <MenuItem primaryText="Refresh" />
                        <MenuItem primaryText="Help &amp; feedback" />
                        <MenuItem primaryText="Settings" />
                        <MenuItem primaryText="Sign out" />
                    </Menu>
                </Popover>
                
                <Tabs>
                    <Tab label="Dashboard">
                        <Dashboard />
                    </Tab>
                    <Tab label="Temperature">
                        <Temperature />
                    </Tab>
                    <Tab label="Humidity">
                        <Humidity />
                    </Tab>
                    <Tab label="Gas">
                        <Gas />
                    </Tab>
                </Tabs> 
                </div>

            </MuiThemeProvider>
        )
    }
}

export default connect(state => state)(App);