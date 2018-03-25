import { types } from '../actions/dataActions';
import _ from 'lodash';

const initState = {
 temperature: {},
 humidity: {},
 gas: {}
}

export default (state = initState, action) => {
  switch(action.type) {
    case types.FETCH_TEMPERATURE:
      return _.assign({}, 
        state, 
        {temperature: action.payload})
    case types.FETCH_HUMIDITY_LEVEL:
      return _.assign({}, 
        state, 
        {humidity: action.payload})
    case types.FETCH_GAS_LEVEL:
      return _.assign({}, 
        state, 
        {gas: action.payload})
    default:
      return state
  }
}