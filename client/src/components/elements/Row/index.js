import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Container = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  ${(props) => {
    switch( props.type ) {
      case 'between':
        return css`
          justify-content: space-between;
        `
      case 'around':
        return css`
          justify-content: space-around;
        `
      case 'end':
        return css`
          justify-content: flex-end;
        `
      default: 
        return;
    }
  }}
`;

function Row(props) {
  const { type } = props;
  return (
    <Container type={type}>
      {
        props.children
      }
    </Container>
  )
}

Row.propTypes = {
  type: PropTypes.string,
}

export default Row
