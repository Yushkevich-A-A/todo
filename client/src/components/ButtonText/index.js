import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components';

const ButtonType = styled.div`
  ${(props) => {
    switch(props.type) {
      case 'add': 
        return css `
        background-color: #026aa7;
        color: white;

        &:hover {
          background-color: #005688;
        }
        `
      default: 
        return css `
        background-color: #cdcdcd;
        &:hover {
          background-color: #b4b4b4;
        }
        `
    }
  }}

  width: ${ props => props.width || 'auto'};
  text-align: center;
  white-space: nowrap;
  border-radius: 5px;
  display: inline-block;
  margin: 5px 10px;
  cursor: pointer;
  padding: 5px 10px;
`;

function ButtonText(props) {
  const { type, handleClick, width } = props;

  return (
    <ButtonType width={width} type={type} onClick={handleClick}>
      {
        props.children
      }
    </ButtonType>
  )
}

ButtonText.propTypes = {}

export default ButtonText
