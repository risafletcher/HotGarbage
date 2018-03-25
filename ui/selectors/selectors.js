import { createSelector } from 'reselect';
import _ from 'lodash';

const temperatureDataSelector = state => state.temperature;
const humidityDataSelector = state => state.humidity;
const gasDataSelector = state => state.gas;

export const getTempDataSelector = createSelector(
  temperatureDataSelector,
  temperatureDataSelector => {
    return temperatureDataSelector.data
  }
)

