import { types } from '../actions/dataActions';
import _ from 'lodash';

const initState = {
 temperature: {
   isFetching: true
 },
 humidity: {
   isFetching: true
 },
 gas: {
   isFetching: true
 }
}

export default (state = initState, action) => {
  switch(action.type) {
    case types.FETCH_TEMPERATURE:
      const stateClone = _.cloneDeep(state);

      return _.assign({}, 
        stateClone, 
        {temperature: action.payload},
        {isFetching: false}
      )
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