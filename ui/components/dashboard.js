import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import moment from 'moment';

import { getTemperatureData, getHumidityData, getGasData } from '../actions/dataActions';

class Dashboard extends Component {
  
  componentDidMount() {
    this.props.getTemperatureData();
    this.props.getHumidityData();
    this.props.getGasData();

    setInterval(() => this.props.getTemperatureData(), 6000);
    setInterval(() => this.props.getHumidityData(), 6000);
    setInterval(() => this.props.getGasData(), 6000);

  }


  render() {

    const { temperature, humidity, gas } = this.props;

    const isLoading = measurement => {
      const { isFetching } = measurement;
      if(measurement.isFetching) {
        return (
          <ReactLoading type={'spin'} color={'#000000'} height='20px' width='20px' />
        )
      } else {
        return (
          <div>
            <p>Last value: {measurement.last_value}</p>
            <p>Updated at: {measurement.updated_at}</p>
          </div>
        )
      }
    }

    return (
      <StyledDashboardContainer>
        <h3>Temperature</h3>
        {isLoading(temperature)}
        {() => {
          if(temperature.last_value > 40) {
            return (
              <StyledWarningMessage>
                WARNING: EXCEEDS MAXIMUM RECOMMENDED TEMPERATURE
              </StyledWarningMessage>
            )
          }
        }}

        <h3>Humidity</h3>
        {isLoading(humidity)}
        {() => {
          if(humidity.last_value > 40) {
            return (
              <StyledWarningMessage>
                WARNING: INSUFFICIENT HUMIDITY LEVEL
              </StyledWarningMessage>
            )
          }
        }}


        <h3>Gas Level</h3>
        {isLoading(gas)}
        {() => {
          if(gas.last_value > 40) {
            return (
              <StyledWarningMessage>
                WARNING: EXCEEDS MAXIMUM RECOMMENDED GAS LEVEL
              </StyledWarningMessage>
            )
          }
        }}
        
      </StyledDashboardContainer>
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

const StyledDashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  padding: 15px;
  font-family: Source Sans Pro, sans-serif;
`;

const StyledWarningMessage = styled.div`
  font-color: red;
  font-weight: bold
`
