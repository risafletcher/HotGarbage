import React, { Component } from 'react';
import styled from 'styled-components';

class About extends Component {

  render() {
    return (
      <AboutComponent>
        <h3>About</h3>
        <p>Copy</p>

        <h3>Ideal Values</h3>
        <ul>
          <li>
            <b>Temperature</b>: 49-77°C
          </li>
          <li>
            <b>Humidity</b>: 65%
          </li>
          <li>
            <b>Methane</b>: None
          </li>
        </ul>
      </AboutComponent>
    )
  }
}

export default About;

const AboutComponent = styled.div`
  padding: 15px;
  font-family: Source Sans Pro, sans-serif;
`;