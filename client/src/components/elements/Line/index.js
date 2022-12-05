import React from 'react'
import styled from 'styled-components';

const LineBlock = styled.div` 
  height: 2px;
  background: linear-gradient(to right, #f3f3f3, grey, #f3f3f3);
  margin-bottom: 10px;
`;


function Line() {
  return (
    <LineBlock />
  )
}

export default Line
