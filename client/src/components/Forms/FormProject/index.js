import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import Input from 'components/elements/Input';
import styled from 'styled-components';
import ButtonText from 'components/ButtonText';

const BlockInput = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  & input {
    background-color: white;
  }
`;



function FormProject(props) {
  const { closeModal } = props;
  const dispatch = useDispatch();
  const [form, setForm ]  = useState({
    name: '',
    description: '',
  })

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setForm(() => ({...form, [field]: value}));
  }

  const handleClick = (e) => {
    e.preventDefault();
    dispatch({type: 'ADD_PROJECT_SAGA', data: form});
    closeModal();
  }

  return (
    <div>
      <BlockInput >
        <Input type="text" value={form.name} name="name" onChange={handleChange} placeholder='назовите проект...'/>
      </BlockInput>
      <BlockInput >
        <Input type="text" value={form.description} name="description" onChange={handleChange} placeholder='опишите проект...'/>
      </BlockInput>
      <ButtonText type='add' onClick={handleClick}>Добавить</ButtonText>
    </div>
  )
}

FormProject.propTypes = {
  closeModal: PropTypes.func.isRequired,
}

export default FormProject

