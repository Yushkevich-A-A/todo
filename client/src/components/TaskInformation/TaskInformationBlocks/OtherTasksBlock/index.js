import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import OtherTask from 'components/TaskInformation/TaskInformationBlocks/OtherTasksBlock/ChangeOtherTask';
import Textarea from 'components/elements/Textarea';
import ButtonText from 'components/ButtonText';
import { useDispatch } from 'react-redux';

const Container = styled.div`
  padding: 15px;
  background-color: #f1f1f1;
  border-radius: 5px;
`;

const Title = styled.div`
  color: #172b4d;
  font-size: 16px;
  font-weight: 600;
  padding: 5px;
  margin-bottom: 10px;
`;

const TeatareaBlock = styled.div`
  & textarea {
    ${ props => {
      return props.errorMark && css`
      border-radius: 2pt;
      box-shadow: 0 0 0 1pt red;
     `
   } }
  }
`;

const ButtonsBlock = styled.div`
  display: flex;
  & div {
    min-width: 100px;
    margin-left: 0;
  }
`;

const TasksList = styled.div``;

function OtherTasksBlock(props) {
  const { task } = props;
  const dispatch = useDispatch();
  const [  text, setText ] = useState('');
  const [ errorMark, setError ] = useState(false);
  const [ openAdd, setOpenAdd ] = useState(false);

  useEffect( () => {
    resetFieldText();
  }, [task])

  const addOtherTask = () => {
    if (text.trim() === '') {
      setError(true);
      return;
    }
    dispatch({ type: "ADD_ADDITIONAL_TASK_SAGA", payload: {
      id_project: task.id_project,
      id_main_task: task.id,
      description: text,
    } })
  }

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const resetFieldText = () => {
    setText('');
    setOpenAdd(false);
  }

  return (
    <Container>
      <Title>Подзадачи</Title>
        <TasksList>
          {
            task.other_tasks.map( item => <OtherTask key={item.id} other_task={item} />)
          }
        </TasksList>
        {!openAdd && <ButtonText handleClick={() => setOpenAdd(true)}>Добавить подзадачу</ButtonText>}

        {openAdd && <>
          <TeatareaBlock errorMark={errorMark} onClick={() => {errorMark && setError(false)}}>
            <Textarea value={text} name='new_task' handleChange={handleChange} placeholder='Добавьте описание задачи'/>
          </TeatareaBlock>
          <ButtonsBlock>
            <ButtonText type='add' handleClick={addOtherTask}>Добавить</ButtonText>
            <ButtonText handleClick={resetFieldText}>Отмена</ButtonText>
          </ButtonsBlock>
        </>}
    </Container>
  )
}

OtherTasksBlock.propTypes = {
  task: PropTypes.object.isRequired
}

export default OtherTasksBlock
