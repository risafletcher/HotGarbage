import React, {Component} from 'react';
import InputPreview from '../components/InputPreview';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled';

class App extends Component {
    _onChange = (value) => {
        this.props.dispatch(setMessage(value))
    };

    render () {
        const {message} = this.props.messageReducer;
        return (
            <div>
                <h1>Hot Garbage</h1>
                <div>Sidebar component</div>
                <InputPreview
                    value={message}/>
                <Link to="/about">
                    <button>Go to about</button>
                </Link>
            </div>

        )
    }
}
export default connect(state => state)(App);