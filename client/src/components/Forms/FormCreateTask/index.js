import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import InputText from 'components/InputText';
import InputDate from 'components/InputDate';
import InputSelect from 'components/InputSelect';
import InputFiles from 'components/InputFiles';
import { format, getTime, parse } from 'date-fns';
import FormButton from 'components/FormButton';
import { useDispatch } from 'react-redux';
import { createProject, editProject } from 'store/projects/actions';
import { createNewTask } from 'lib/createNewTask';

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
    finish_date: format(new Date(), 'yyyy-MM-dd'),
    priority: 'low',
    files: null,
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = createNewTask(formData);
    project.task_list.push(newTask);
    project.columns.find( item => item.id === 'queue').tasks.push(newTask.id);
    dispatch(editProject(project));
    closeModal();
  } 


  const handleChange = (e) => {
    const name = e.target.name;
    const value = (name === 'files') ? e.target.files[0] :
                  (name === 'finish_date') ? getTime(parse(e.target.value, 'yyyy-MM-dd', new Date())) :
                  e.target.value;
    setFormData( (state) => ({...state, [name]: value}));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InputText name='number' title='Номер' placeholder="введите номер задачи"  handleChange={handleChange}/>
      <InputText name='name' title='Заголовок' placeholder="Введите заголовок"  handleChange={handleChange}/>
      <InputText name='description' title='Описание' placeholder="Опишите задачу"  handleChange={handleChange}/>
      <InputDate name='finish_date' title='Выполнить до'  handleChange={handleChange} />
      <InputSelect name='priority' title='Приоритет'  handleChange={handleChange}/>
      <InputFiles name='files' title='Прикрепите файлы'  handleChange={handleChange}/>
      <ButtonBlock>
        <FormButton title="Создать" handleClick={handleSubmit}/>
      </ButtonBlock>
    </Form>
  )
}

FormCreateTask.propTypes = {};

export default FormCreateTask;
