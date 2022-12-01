import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import createAdditionalTask from 'lib/createAdditionalTask';
import OtherTask from 'components/TaskInformation/TaskInformationBlocks/OtherTasksBlock/ChangeOtherTask';
import Textarea from 'components/elements/Textarea';
import cloneDeep from 'lodash/cloneDeep';
import ButtonText from 'components/ButtonText';

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

const TasksList = styled.div``;

function OtherTasksBlock(props) {
  const { task, project, sendData } = props;
  const changinProject = cloneDeep(project);
  const changinTask = changinProject.task_list.find( item => item.id === task.id )
  const [  text, setText ] = useState('');
  const [ openAdd, setOpenAdd ] = useState(false);

  const addOtherTask = () => {
    if (text.trim() === '') {
      return;
    }
    const addNewOtherTask = createAdditionalTask(task.id, text);
    changinTask.other_tasks.push(addNewOtherTask);
    sendData(changinProject);
    setText('');
    setOpenAdd(false);
  }

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const handleDelete = (id) => {
    changinTask.other_tasks.splice(changinTask.other_tasks.findIndex( item => item.id === id ), 1 );
    sendData(changinProject);
  }

  const changeOtherTask = ( id, name, value ) => {
    changinTask.other_tasks.find( item => item.id === id )[name] = value;
    sendData(changinProject);
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
            task.other_tasks.map( item => <OtherTask key={item.id} other_task={item} handleChange={changeOtherTask} handleDelete={handleDelete}/>)
          }
        </TasksList>
        {!openAdd && <ButtonText handleClick={() => setOpenAdd(true)}>Добавить элемент</ButtonText>}

        {openAdd && <>
          <Textarea value={text} name='new_task' handleChange={handleChange} placeholder='Добавьте описание задачи'/>
          <ButtonText type='add' handleClick={addOtherTask}>Добавить</ButtonText>
          <ButtonText handleClick={resetFieldText}>Отмена</ButtonText>
        </>}
    </Container>
  )
}

OtherTasksBlock.propTypes = {}

export default OtherTasksBlock
