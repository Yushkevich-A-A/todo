import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import Header from 'components/Header';
import CreateButton from 'components/CreateButton';
import { useSelector } from 'react-redux';
import ModalWindow from 'components/ModalWindow';
import styled from 'styled-components';
import TasksList from 'components/TasksList';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { editProject } from 'store/projects/actions';
import FormCreateTask from 'components/Forms/FormCreateTask';
import cloneDeep from 'lodash/cloneDeep';

const Main = styled.main`
  padding-top: 10px;
`;

const BlockLists = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
`;

function ProjectPage(props) {
  const { id } = useParams();
  const projects = useSelector( state => state.manageProject);
  const project = cloneDeep(projects.find( item => item.id === id));
  const dispatch = useDispatch();
  const [ isOpen, setOpenModal ] = useState(false);

  const closeModalWindow = () => {
    setOpenModal(false)
  }

  const openModal = (e) => {
    setOpenModal(true);
  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId && 
      destination.index === source.index
      ) {
        return;
      }

    const newColumns = project.columns;
    const start = newColumns.find( item => item.id === source.droppableId )
    const finish = newColumns.find( item => item.id === destination.droppableId )

    if ( start === finish ) {
      const newTaskIds = newColumns.find( item => item.id === source.droppableId ).tasks;
      newTaskIds.splice( source.index, 1);
      newTaskIds.splice( destination.index, 0, draggableId);
      dispatch(editProject(project));
      return;
    }

    start.tasks.splice(source.index, 1);
    finish.tasks.splice(destination.index, 0, draggableId);
    dispatch(editProject(project));
  }

  return (
    <>
    { project && <div>
      <Header title={project.name}>
        <input type="text" />
        <CreateButton handleClick={openModal}>добавить задачу</CreateButton>
      </Header>
      <Main>
        <DragDropContext onDragEnd={onDragEnd}>
          <BlockLists>
            {
              project.columns.map( column => <TasksList key={column.id} column={column} tasks={
                  column.tasks.map( item => project.task_list.find( task => task.id === item) )
                }/>
              )
            }
          </BlockLists>
        </DragDropContext>
        {
          isOpen && <ModalWindow title="Создание задачи" closeModal={closeModalWindow}>
            <FormCreateTask project={project} closeModal={closeModalWindow}/>
          </ModalWindow>
        }
      </Main>
    </div>
    }
    </>
  )
}

ProjectPage.propTypes = {}

export default ProjectPage
