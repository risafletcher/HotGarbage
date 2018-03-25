import axios from 'axios';

export const types = {
  FETCH_TEMPERATURE: 'FETCH_TEMPERATURE',
  FETCH_HUMIDITY_LEVEL: 'FETCH_HUMIDITY_LEVEL',
  FETCH_GAS_LEVEL: 'FETCH_GAS_LEVEL'
}

const username = 'gkotecha';

const IO_KEY = 'c59ebddfde3643bfafb3c4ed8bbe3f79';

const adafruitAPI = axios.create({
  baseURL: `https://io.adafruit.com/api/v2/${username}/feeds`,
  headers: {
    'X-AIO-Key': IO_KEY,
    'Content-Type': 'application/json'
  }
})

function setTemperatureData(data) {
  return {
    type: types.FETCH_TEMPERATURE,
    payload: data
  }
}

export const getTemperatureData = () => dispatch => {
      adafruitAPI.get('/temperature')
        .then(response => {
          dispatch(setTemperatureData(response.data))
        })
};

function setHumidityData(data) {
  return {
    type: types.FETCH_HUMIDITY_LEVEL,
    payload: data
  }
}

export const getHumidityData = () => dispatch => {
    adafruitAPI.get('/humidity')
      .then(response => {
        dispatch(setHumidityData(response.data))
      })
}

function setGasData(data) {
  return {
    type: types.FETCH_GAS_LEVEL,
    payload: data
  }
}

export const getGasData = () => dispatch => {
  adafruitAPI.get('/gas-sensor')
    .then(response => {
      dispatch(setGasData(response.data))
    })
};