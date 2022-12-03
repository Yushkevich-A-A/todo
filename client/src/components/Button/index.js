import React from 'react'
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import deleteIcon from 'assets/icons/delete.svg';
import edit from 'assets/icons/edit.svg';
import close from 'assets/icons/close.svg';

const ButtonType = styled.div`
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin: 5px;
  padding: 5px;
  border: 2px solid transparent;
  border-radius: 5px;
  ${
    (props) => {
      switch(props.type) {
        case 'close':
          return css`
            background-image: url(${close});
          `
        case 'delete':
          return css`
            background-image: url(${deleteIcon});
            &:hover {
              border-color: red;
            }
          `
        case 'edit':
          return css`
            background-image: url(${edit});
          `
        default: 
            return;
      }
    }
  }
`



function Button(props) {
  const { type, handleClick } = props;

  return (
    <ButtonType type={type} onClick={handleClick}/>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
}

export default Button
