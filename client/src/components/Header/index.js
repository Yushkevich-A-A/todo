import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const HeaderComponent = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #2655ff;
  color: white;
  padding: 10px;
`;

const Title = styled.h1``


function Header(props) {
  const { title } = props;
  return (
    <HeaderComponent>
      <Title>{ title }</Title>
      {
        props.children
      }
    </HeaderComponent>
  )
}

Header.propTypes = {
  title: PropTypes.string,
}

export default Header
