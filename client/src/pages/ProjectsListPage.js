import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ListProject from 'components/ListProject';
import ModalWindow from 'components/ModalWindow';
import FormProject from 'components/Forms/FormProject';
import { useSelector } from 'react-redux';
import Header from 'components/Header';
import CreateButton from 'components/CreateButton';

function ProjectsListPage() {
  const [ isOpen, setOpenModal ] = useState(false);
  const list = useSelector( state => state.manageProject);
  const [ filter, setFilter ] = useState('');
  const [ filterList, setFilterList ] = useState([])

  useEffect( () => {
     list.filter( item => item.name.includes(filter))
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
    <div>
      <Header title='Проекты'>
        <input type="text" value={filter} onChange={handleChange}/>
        <CreateButton handleClick={openModal}>Создать проект</CreateButton>
      </Header>
      <main>
        <ListProject list={filterList}/>
        {
          isOpen && <ModalWindow title="Создание проекта" closeModal={closeModalWindow}>
            <FormProject closeModal={closeModalWindow}/>
          </ModalWindow>
        }
      </main>
    </div>
  )
}

ProjectsListPage.propTypes = {};

export default ProjectsListPage;
