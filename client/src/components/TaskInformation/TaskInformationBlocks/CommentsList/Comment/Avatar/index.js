import React from 'react'
import consumer from 'assets/icons/consumer.png'
import styled from 'styled-components';

const Container = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url(${consumer});
`;

function Avatar() {
  return (
    <Container />
  )
}

export default Avatar
