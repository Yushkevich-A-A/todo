import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from 'components/Header';
import CreateButton from 'components/CreateButton';
import { useSelector } from 'react-redux';
// import ModalWindow from 'components/ModalWindow';
import styled from 'styled-components';
import TasksList from 'components/TasksList';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
// import FormCreateTask from 'components/Forms/FormCreateTask';
import cloneDeep from 'lodash/cloneDeep';
import ButtonText from 'components/ButtonText';
import Input from 'components/elements/Input';

const Main = styled.main`
  padding-top: 10px;
`;

const BlockLists = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
`;

const InputsBlock = styled.div`
  display: flex;
  align-items: center;
`;

function ProjectPage() {
  const { id } = useParams();
  const projects = useSelector( state => state.manageProject);
  const project = projects.find( item => item.id === id);
  const dispatch = useDispatch();
  // const [ isOpen, setOpenModal ] = useState(false);
  const [ search, setSearch ] = useState('name');
  const [ filter, setFilter ] = useState('');
  const [ filterList, setFilterList ] = useState([]);

  useEffect( () => {
    if (!project) {
      return;
    }
    if (search === 'name') {
      setFilterList(project.task_list.filter( item => item.name.toLowerCase().includes(filter.toLowerCase())));
      return;
    }
    setFilterList(project.task_list.filter( item => +item.number === parseInt(filter)));
    
  }, [project, filter])

  const handleChange = (e) => {
    setFilter(e.target.value)
  } 

  const closeModalWindow = () => {
    // setOpenModal(false)
  }

  const openModal = (e) => {
    // setOpenModal(true);
  }

  const searchTrigger = () => {
    setFilter('');
    search === 'name' ? 
      setSearch( 'number' ) :
      setSearch( 'name' );
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

    const newColumns = cloneDeep(project.columns);
    const start = newColumns.find( item => item.id === source.droppableId )
    const finish = newColumns.find( item => item.id === destination.droppableId )

    if ( start === finish ) {
      const newTaskIds = newColumns.find( item => item.id === source.droppableId ).tasks;
      newTaskIds.splice( source.index, 1);
      newTaskIds.splice( destination.index, 0, draggableId);
      dispatch({ type: 'EDIT_COLUMNS_SAGA', payload: { id_project: project.id, columns: newColumns}});
      return;
    }

    start.tasks.splice(source.index, 1);
    finish.tasks.splice(destination.index, 0, draggableId);
    dispatch({ type: 'EDIT_COLUMNS_SAGA', payload: { id_project: project.id, columns: newColumns}});
  }

  return (
    <>
    { project && <div>
      <Header title={project.name}>
        <InputsBlock >
          <ButtonText width='150px' handleClick={searchTrigger}>{search === 'name' ?  'по номеру' : 'по имени'}</ButtonText>
          <Input 
            type={ search === 'name'? 'text' : 'number' }
            value={filter} handleChange={handleChange} 
            placeholder={search === 'name' ?  'поиск по имени' : 'поиск по номеру'}/>
        </InputsBlock>
        <CreateButton handleClick={openModal}>добавить задачу</CreateButton>
      </Header>
      <Main>
        <DragDropContext onDragEnd={onDragEnd}>
          <BlockLists>
            {
              project.columns.map( column => <TasksList key={column.id} column={column} tasks={
                  filterList.filter( item => column.tasks.find( task => task === item.id))
                }/>
              )
            }
          </BlockLists>
        </DragDropContext>
        {/* {
          isOpen && <ModalWindow title="Создание задачи" closeModal={closeModalWindow}>
            <FormCreateTask project={project} closeModal={closeModalWindow}/>
          </ModalWindow>
        } */}
      </Main>
    </div>
    }
    </>
  )
}

ProjectPage.propTypes = {}

export default ProjectPage
