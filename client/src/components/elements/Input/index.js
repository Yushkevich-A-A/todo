import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const InputContainer = styled.input`
  width: 100%;
  ${ (props) => {
    switch (props.type) {
        case 'main': 
          return css`
            text-align: center;
            font-size: 20px;
            font-weight: 600;
          `;
        default: 
          return css`
          font-size: 14px;
          font-weight: 400;
        `;
      }
    } 
  }
  padding: 5px;
  color: #172b4d;
  border: none;
  &:focus {
    outline-color:#396ec9;
    background-color: #f1f1f1;
  }
`;

function Input(props) {
  const { type, value, name, handleChange, handleOnBlur, placeholder } = props;

  return (
    <InputContainer type={type} value={value} name={name} id={name} onChange={handleChange} onBlur={handleOnBlur} placeholder={placeholder}/>
  )
}

Input.propTypes = {}

export default Input
