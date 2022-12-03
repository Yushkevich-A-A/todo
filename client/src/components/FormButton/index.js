import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid #c6c6c6;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  display: inline-block;
  cursor: pointer;
  background-color: #f6f6f6;
  transition: background-color 0.2s;

  &:hover {
    background-color: #63ee64;
    color: white;
  }
`;

function FormButton(props) {
  const { title, handleClick } = props;
  return (
    <Container onClick={handleClick}>
      { title }
    </Container>
  )
}

FormButton.propTypes = {
  title: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
}

export default FormButton
