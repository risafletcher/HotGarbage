import React, {Component} from 'react';
import Dashboard from '../components/dashboard';
import Temperature from '../components/temperature';
import Humidity from '../components/humidity';
import Gas from '../components/gas';
import About from '../components/about';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import IconButton from 'material-ui/IconButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import Slider from 'material-ui/Slider';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }

    };

    handleToggle = () => this.setState({open: !this.state.open})

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    }


    render () {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div>
                <AppBar title="🔥🗑️Hot Garbage🗑️🔥" />
                
                <Tabs>
                    <Tab label="Dashboard">
                        <Dashboard />
                    </Tab>
                    <Tab label="About">
                        <About />
                    </Tab>
                    {/* <Tab label="Temperature">
                        <Temperature />
                    </Tab>
                    <Tab label="Humidity">
                        <Humidity />
                    </Tab>
                    <Tab label="Gas">
                        <Gas />
                    </Tab> */}
                </Tabs>
                </div>

            </MuiThemeProvider>
        )
    }
}

export default connect(state => state)(App);