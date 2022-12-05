import React from 'react'
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import deleteIcon from 'assets/icons/delete.svg';
import comment from 'assets/icons/comment.svg';
import close from 'assets/icons/close.svg';
import save from 'assets/icons/save.svg';
import back from 'assets/icons/back.svg';

const ButtonType = styled.div`
  min-width: 30px;
  min-height: 30px;
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: center;
  margin: 5px;
  padding: 5px;
  border: 2px solid transparent;
  border-radius: 5px;
  transition: border 0.2s;
  ${
    (props) => {
      switch(props.type) {
        case 'close':
          return css`
            background-image: url(${close});
            &:hover {
              border-color: red;
            }
          `
        case 'delete':
          return css`
            background-image: url(${deleteIcon});
            &:hover {
              border-color: red;
            }
          `
        case 'save':
          return css`
            background-image: url(${save});
            &:hover {
              border-color: green;
            }
          `
        case 'comment':
          return css`
            background-image: url(${comment});
          `
        case 'back':
          return css`
            background-image: url(${back});
            background-size: contain;
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
