import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
// import isEqual from 'lodash';
import BlockName from 'components/TaskInformation/TaskInformationBlocks/Name';
import Description from 'components/TaskInformation/TaskInformationBlocks/Description';
import Priority from 'components/TaskInformation/TaskInformationBlocks/Priority';
import OtherTasksBlock from 'components/TaskInformation/TaskInformationBlocks/OtherTasksBlock';
import Times from 'components/TaskInformation/TaskInformationBlocks/Times';
import { useDispatch } from 'react-redux';
import { editProject } from 'store/projects/actions';
import FileLoader from 'components/TaskInformation/TaskInformationBlocks/FileLoader';

const Container = styled.div`
  margin: 5px;
  padding: 15px;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  width: 700px;
`;

const Row = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  ${(props) => {
    switch( props.type ) {
      case 'between':
        return css`
          justify-content: space-between;
        `
      case 'end':
        return css`
          justify-content: flex-end;
        `
    }
  }}
`;
function ItemInformation(props) {
  const { task } = props;
  const projects = useSelector( state => state.manageProject ); 
  const project = projects.find( item => item.id === task.id_project);
  const dispatch = useDispatch();

  const sendDataToStore = (changinProject) => {
    dispatch(editProject(changinProject))
  }

  // id: "7nKdnQI5bFqZEqHPph2m",
  // id_project: 'ob5hAYtP5P0olajRvbmiN',
  // number: 2, 
  // name: "Купить хлеба",
  // description: "ПРосто сходи в магазин",
  // create_date: Date.now - 1230000,
  // finish_date: Date.now + 100000,
  // priority: 'hide',ds
  // files: [],
  // other_tasks: [],
  // comments: [],

  return (
    <Container>
      <BlockName task={task} project={project} sendData={sendDataToStore}/>
      <Description task={task} project={project} sendData={sendDataToStore}/>
      <Priority task={task} project={project} sendData={sendDataToStore}/>
      <Times task={task} project={project} sendData={sendDataToStore}/>
      <OtherTasksBlock task={task} project={project} sendData={sendDataToStore}/>
      <FileLoader task={task} project={project} sendData={sendDataToStore}/>
      
      {/* <Row type='between'>

      {
        isEqual(taskData, task) ? "закрыть без сохранения" : 'сохранить' 
      } */}
    </Container>
    
  )
}

ItemInformation.propTypes = {}

export default ItemInformation
