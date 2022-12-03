import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ItemTask from 'components/ItemTask';
import { Droppable } from 'react-beautiful-dnd';
import ButtonText from 'components/ButtonText';
import { useDispatch } from 'react-redux';
import FormCreateTask from 'components/Forms/FormCreateTask';

const TaskListWrapper = styled.div`
  border: 1px solid grey;
  width: 30%;
`;

const TaskListTitle = styled.h3`
  text-align: center;
  border-bottom: 1px solid grey;
  font-size: 24px;
  margin: 0;
`;

const BlockList = styled.div`
  padding: 10px;
  min-height: 100px;
`;

const BlockAddTask = styled.div`
  padding: 10px;

`;

function TasksList(props) {
  const { column, tasks, project } = props;
  const [ openAdd, setOpenAdd ] = useState(false);

  const closeForm = () => {
    setOpenAdd(false)
  }

  return (
    <TaskListWrapper>
      <TaskListTitle>{column.id}</TaskListTitle>
      <Droppable 
        droppableId={column.id}
      >
        { ( provided ) => (
          <BlockList ref={provided.innerRef}
            {...provided.droppableProps}
          >
            { 
              tasks.map( (task, index) => (
                <ItemTask key={task.id} task={task} index={index}/>)
              )
            }
            {provided.placeholder}
          </BlockList>
         )}
      </Droppable>
      <BlockAddTask>
        { !openAdd && <ButtonText handleClick={() => setOpenAdd(true)}>Создать задачу</ButtonText>}
        { openAdd && <FormCreateTask closeHandler={closeForm} column_id={column.id} project={project}/>
        }
      </BlockAddTask>
    </TaskListWrapper>
  )
}

TasksList.propTypes = {
  column: PropTypes.object.isRequired, 
  tasks: PropTypes.array.isRequired
}

export default TasksList
