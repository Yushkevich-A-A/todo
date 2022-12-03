import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ItemTask from 'components/ItemTask';
import { Droppable } from 'react-beautiful-dnd';

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

function TasksList(props) {
  const { column, tasks } = props;

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
    </TaskListWrapper>
  )
}

TasksList.propTypes = {
  column: PropTypes.object.isRequired, 
  tasks: PropTypes.array.isRequired
}

export default TasksList
