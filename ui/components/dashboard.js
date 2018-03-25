import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';

import { getTemperatureData, getHumidityData, getGasData } from '../actions/dataActions';

class Dashboard extends Component {
  
  componentDidMount() {
    this.props.getTemperatureData();
    this.props.getHumidityData();
    this.props.getGasData();
  }
  

  render() {

    const { temperature, humidity, gas } = this.props;

    console.log('time', moment(temperature.updated_at, moment.ISO_8601));

    return (
      <div>
        <h3>Temperature</h3>
        <p>Last value: {temperature.last_value}</p>
        <p>Updated at: {temperature.updated_at}</p>

        <h3>Humidity</h3>
        <p>Last value: {humidity.last_value}</p>
        <p>Updated at: {humidity.updated_at}</p>

        <h3>Gas Level</h3>
        <p>Last value: {gas.last_value}</p>
        <p>Updated at: {gas.updated_at}</p>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  console.log(state);
  return {
    temperature: state.temperature,
    humidity: state.humidity,
    gas: state.gas
  }
}

export default connect(mapStateToProps, { getTemperatureData, getHumidityData, getGasData })(Dashboard);