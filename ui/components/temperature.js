import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTemperatureData } from '../actions/dataActions';

class Temperature extends Component {

  componentDidMount() {
    this.props.getTemperatureData()
  }


 render () {

  const { last_value, updated_at } = this.props.temperature

   return (
     <div>
          Test
     </div>
   )
 }
}

const mapStateToProps = (state, props) => {
  return {
    temperature: state.temperature
  }
}

export default connect(mapStateToProps, { getTemperatureData })(Temperature);