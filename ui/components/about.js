import React, { Component } from 'react';
import styled from 'styled-components';

class About extends Component {

  render() {
    return (
      <AboutComponent>
        About
      </AboutComponent>
    )
  }
}

export default About;

const AboutComponent = styled.div`
  padding: 15px;
  font-family: Source Sans Pro, sans-serif;
`;