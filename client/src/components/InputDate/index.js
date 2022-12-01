import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  &:nth-child( n + 2 ) {
    margin-top: 10px;
  }
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin: 0 10px 5px;
  color: #4f4f4f;
`;

const Input = styled.input`
  padding: 5px 10px;
  border-radius: 5px;
  border: 2px solid #c4c4c4;
  transition: border-color 0.5s;

  &:focus {
    outline: none;
    border-color: #67ec67;
  }
`;





function InputDate(props) {
   const { title, placeholder, name, value, handleChange } = props;
  return (
    <Container>
      <Label htmlFor={name}>{title}</Label>
      <Input type="date" id={name} name={name} onChange={handleChange} value={value} placeholder={placeholder}/>
    </Container>
  )
}

InputDate.propTypes = {}

export default InputDate
