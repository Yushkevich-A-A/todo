import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import InputText from 'components/InputText';
import FormButton from 'components/FormButton';
import { useDispatch } from 'react-redux';

const Form = styled.form`
  background-color: white;
  padding-top: 10px;
  min-height: 200px;
  min-width: 200px;
  width: 500px;
`;

const ButtonBlock = styled.div`
  text-align: right;
`;


function FormCreateTask(props) {
  const { project, closeModal } = props;
  const dispatch = useDispatch();
  const [ formData, setFormData ] = useState({
    id_project: project.id,
    number: '', 
    name: '',
    description: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({type: 'ADD_TASK_SAGA', payload: formData});
    closeModal();
  } 


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData( (state) => ({...state, [name]: value}));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InputText name='number' title='Номер' placeholder="введите номер задачи"  handleChange={handleChange}/>
      <InputText name='name' title='Заголовок' placeholder="Введите заголовок"  handleChange={handleChange}/>
      <InputText name='description' title='Описание' placeholder="Опишите задачу"  handleChange={handleChange}/>
      <ButtonBlock>
        <FormButton title="Создать" handleClick={handleSubmit}/>
      </ButtonBlock>
    </Form>
  )
}

FormCreateTask.propTypes = {};

export default FormCreateTask;
