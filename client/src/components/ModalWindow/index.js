import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from 'components/Button';

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
`;

const Container = styled.div`
  background-color: #f3f3f3;
  padding: 10px;
  min-width: 200px;
  margin-top: 20px;
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

  return (
    <Wrapper>
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
