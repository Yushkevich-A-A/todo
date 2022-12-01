import React from 'react'
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import save from 'assets/icons/save.svg';
import deleteIcon from 'assets/icons/delete.svg';
import edit from 'assets/icons/edit.svg';
import close from 'assets/icons/close.svg';

const ButtonType = styled.div`
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
          `
        case 'edit':
          return css`
            background-image: url(${edit});
          `
        case 'save':
          return css`
            background-image: url(${save});
          `
      }
    }
  }
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin: 5px;
`



function Button(props) {
  const { type, handleClick } = props;

  return (
    <ButtonType type={type} onClick={handleClick}/>
  )
}

Button.propTypes = {}

export default Button
