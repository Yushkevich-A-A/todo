import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components';
import Input from 'components/elements/Input';
import { useDispatch } from 'react-redux';
import ButtonText from 'components/ButtonText';

const FormBlock = styled.div`
  border: 1px solid grey;
  border-radius: 5px;
  padding: 5px;
`

const InputBlock = styled.div`

  &:nth-child( n + 2) {
    margin-top: 5px;
  }

  & input {
    margin-top: 10px;
    margin-bottom: 10px;
    ${ props => {
      return props.markError && css`
      border-radius: 2pt;
      box-shadow: 0 0 0 1pt red;
     `
   } }
  }
`
const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
`;

const ButtonsBlock = styled.div`
  display: flex;
  & div {
    min-width: 100px;
    margin-left: 0;
  }
`;


function FormCreateTask(props) {
  const { project, column_id, closeHandler } = props;
  const dispatch = useDispatch();
  const [ formTask, setFormTask ] = useState({
    name: '',
  });

  const [ markError, setMarkError] = useState(false);

  const handleAddTask = () => {
    if (formTask.name === '') {
      setMarkError(true);
      return;
    }
    
    dispatch({ type: 'CREATE_NEW_TASK_SAGA', payload: {
      column_id: column_id,
      id_project: project.id,
      data: formTask,
    }})
    closeHandler();
  }

  const handleChange = (e) => {
    markError && setMarkError(false);
    const name = e.target.name;
    const value = e.target.value;
    setFormTask( state => ({...state, [name]: value}))
  } 


  return (
    <FormBlock>
      <div>
        <InputBlock markError={markError}>
          <Label htmlFor='name'>Название</Label>
          <Input type='text' value={formTask.name} name='name' handleChange={handleChange} placeholder='введите название'/>
        </InputBlock>
      </div>
      <ButtonsBlock>
        <ButtonText type="add" handleClick={handleAddTask}>Добавить</ButtonText>
        <ButtonText handleClick={() => closeHandler()}>Отменить</ButtonText>
      </ButtonsBlock>
    </FormBlock>
  )
}

FormCreateTask.propTypes = {
  project: PropTypes.object.isRequired, 
  column_id: PropTypes.string.isRequired, 
  closeHandler: PropTypes.func.isRequired,
};

export default FormCreateTask;
