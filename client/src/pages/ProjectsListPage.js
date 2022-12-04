import React, { useEffect, useState } from 'react';
import ListProject from 'components/ListProject';
import ModalWindow from 'components/ModalWindow';
import FormProject from 'components/Forms/FormProject';
import { useSelector } from 'react-redux';
import Header from 'components/Header';
import CreateButton from 'components/CreateButton';
import Input from 'components/elements/Input';
import styled, { css } from 'styled-components';

const Container = styled.div`
  position: ralative;
  opacity: 0;
  transition: opacity 0.5s;
  ${ props =>  props.transition && css`opacity: 1;`}
`

const Text = styled.div`
  color: grey;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  padding: 10px;  
  opacity: 0;
  transition: opacity 0.5s;
  ${ props =>  props.ahead && css`opacity: 1;`}
`

function ProjectsListPage() {
  const [ isOpen, setOpenModal ] = useState(false);
  const list = useSelector( state => state.manageProject);
  const [ filter, setFilter ] = useState('');
  const [ filterList, setFilterList ] = useState([]);
  const [ transition, setTransition ] = useState(false);

  useEffect( () => {
    setTimeout(() => setTransition(true), 1)
  }, [])


  useEffect( () => {
    setFilterList(list.filter( item => item.name.toLowerCase().includes(filter.toLowerCase())))
  }, [list, filter])

  const handleChange = (e) => {
    setFilter(e.target.value)
  } 

  const closeModalWindow = () => {
    setOpenModal(false)
  }

  const openModal = (e) => {
    setOpenModal(true);
  }

  return (
    <Container transition={transition} >
      <Header title='Проекты'>
        <div>
          <Input 
              type='text'
              value={filter}
              handleChange={handleChange} 
              placeholder='поиск...'/>
        </div>
        <CreateButton handleClick={openModal}>Создать проект</CreateButton>
      </Header>
      <main>
        <ListProject list={filterList}/>
        { list.length === 0 && <Text ahead={list.length === 0 }>Нет действующих проектов</Text> }
        {
          isOpen && <ModalWindow title="Создание проекта" closeModal={closeModalWindow}>
            <FormProject closeModal={closeModalWindow}/>
          </ModalWindow>
        }
      </main>
    </Container>
  )
}

export default ProjectsListPage;
