import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTemperatureData } from '../actions/dataActions';

class Temperature extends Component {

  componentDidMount() {
    this.props.getTemperatureData()
  }


 render () {

   return (
     <div>
          Test
     </div>
   )
 }
}

const mapStateToProps = (state, props) => {
  return {}
}

export default connect(mapStateToProps, { getTemperatureData })(Temperature);