import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Button from 'components/Button';
import { useState } from 'react';
import { useEffect } from 'react';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .9 );
  display: flex;
  justify-content: center;
  align-items: flex-start;
  opacity: 0;
  transition: opacity 0.2s;
  ${ props =>  props.transition && css`opacity: 1;`}

`;

const Container = styled.div`
  background-color: #f3f3f3;
  padding: 10px;
  margin: 20px;
  max-width: 400px;
  width: 100%;
`;

const ContainerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FormTitle = styled.h4`
    text-align: center;
`;


function ModalWindow(props) {
  const { closeModal, title} = props;
  const [ transition, setTransition ] = useState(false);

  useEffect( () => {
    setTimeout(() => setTransition(true), 1)
  }, [])

  return (
    <Wrapper transition={transition}>
      <Container>
        <ContainerHeader>
          <FormTitle>{title}</FormTitle>
          <Button type='close' handleClick={closeModal}/>
        </ContainerHeader>
        {
          props.children
        }
      </Container>
    </Wrapper>
  )
}

ModalWindow.propTypes = {
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default ModalWindow
