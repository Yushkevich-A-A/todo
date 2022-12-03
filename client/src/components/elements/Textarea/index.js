import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

const TextareaContainer = styled.textarea`
  width: 100%;
  height: 50px;
  resize: none;
  font-size: 14px;
  font-weight: 400;
  padding: 5px;
  color: #172b4d;
  border: none;
  background-color: white;
  &:focus {
    outline-color:#396ec9;
  }
`;

function Textarea(props) {
  const { value, name, handleChange, handleOnBlur, placeholder } = props;

  return (
    <TextareaContainer value={value} name={name} id={name} onChange={handleChange} onBlur={handleOnBlur} placeholder={placeholder}/>
  )
}

Textarea.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  name: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  handleOnBlur: PropTypes.func,
  placeholder: PropTypes.string,
}

export default Textarea
