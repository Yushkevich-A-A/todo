import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from 'components/Header';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import TasksList from 'components/TasksList';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import ButtonText from 'components/ButtonText';
import Input from 'components/elements/Input';
import Line from 'components/elements/Line';

const Container = styled.div`
  opacity: 0;
  transition: opacity 0.5s;
  ${ props =>  props.transition && css`opacity: 1;`}
`

const Main = styled.main`
  overflow-x: scroll;
  padding-top: 10px;
`;
const MainContainer = styled.main`
  padding-top: 10px;
  min-width: 900px;
`;

const MainDespription = styled.p`
  margin: 0 30px 10px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: grey;
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
  const [ search, setSearch ] = useState('name');
  const [ filter, setFilter ] = useState('');
  const [ filterList, setFilterList ] = useState([]);
  const [ transition, setTransition ] = useState(false);

  useEffect( () => {
    setTimeout(() => setTransition(true), 1)
  }, [])

  useEffect( () => {
    if (!project) {
      return;
    }
    filterListFunc(filter);
    //eslint-disable-next-line
  }, [ project ])

  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
    filterListFunc(e.target.value);
  } 

  const filterListFunc = (value) => {
    const list = project.task_list;
    if (value === '') {
      setFilterList( list); 
      return;
    }

    if (search === 'name') {
      setFilterList( list.filter( item => item.name.toLowerCase().includes(value.toLowerCase())));
      return;
    }
    setFilterList( list.filter( item => +item.number === parseInt(value)));
  }

  const searchTrigger = () => {
    setFilter('');
    filterListFunc('')
    search === 'name' ? 
      setSearch( 'number' ):
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
    { project && <Container transition={transition}>
      <Header back={true} title={project.name}>
        <InputsBlock >
          <ButtonText handleClick={searchTrigger}>{search === 'name' ?  'по номеру' : 'по имени'}</ButtonText>
          <Input 
            type={ search === 'name'? 'text' : 'number' }
            value={filter} 
            handleChange={handleChangeFilter} 
            placeholder={search === 'name' ?  'поиск по имени' : 'поиск по номеру'}/>
        </InputsBlock>
      </Header>
      <Main>
        <MainDespription>{project.description}</MainDespription>
        <Line />
        <MainContainer>
          <DragDropContext onDragEnd={onDragEnd}>
            <BlockLists>
              {
                project.columns.map( column => <TasksList key={column.id} column={column} project={project} tasks={
                  column.tasks.map( item => filterList.find( task => task.id === item)).filter(item => item )
                  }/>
                )
              }
            </BlockLists>
          </DragDropContext>
        </MainContainer>
      </Main>
    </Container>
    }
    </>
  )
}

export default ProjectPage
