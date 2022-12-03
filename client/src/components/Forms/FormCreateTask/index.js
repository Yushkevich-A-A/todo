import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import Input from 'components/elements/Input';
import { useDispatch } from 'react-redux';
import ButtonText from 'components/ButtonText';

const FormBlock = styled.div`
  border: 1px solid #000;
  border-radius: 5px;
  padding: 5px;
`

const InputBlock = styled.div`
  &:nth-child( n + 2) {
    margin-top: 5px;
  }
`

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
`;


function FormCreateTask(props) {
  const { project, column_id, closeHandler } = props;
  const dispatch = useDispatch();
  const [ formTask, setFormTask ] = useState({
    // number: Math.max(...project.task_list.map( item => item.number )) + 1,
    name: '',
  });

  const handleAddTask = () => {
    dispatch({ type: 'CREATE_NEW_TASK_SAGA', payload: {
      column_id: column_id,
      id_project: project.id,
      data: formTask,
    }})
    closeHandler();
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormTask( state => ({...state, [name]: value}))
  } 

  return (
    <FormBlock>
      <div>
        {/* <InputBlock>
          <Label >Номер</Label>
          <Input type='number' value={formTask.number} name='number' handleChange={handleChange} placeholder='введите номер'/>
        </InputBlock> */}
        <InputBlock>
          <Label htmlFor='name'>Название новой задачи</Label>
          <Input type='text' value={formTask.name} name='name' handleChange={handleChange} placeholder='введите название'/>
        </InputBlock>
      </div>
      <ButtonText type="add" handleClick={handleAddTask}>Добавить задачу</ButtonText>
    </FormBlock>
  )
}

FormCreateTask.propTypes = {
  // project: PropTypes.object.isRequired,
  // closeModal: PropTypes.func.isRequired,
};

export default FormCreateTask;
