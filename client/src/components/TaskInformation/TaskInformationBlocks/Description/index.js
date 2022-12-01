import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import cloneDeep from 'lodash/cloneDeep';

const Container = styled.div``;


const Title = styled.div`
  color: #172b4d;
  font-size: 16px;
  font-weight: 600;
  padding: 5px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  resize: none;
  font-size: 14px;
  font-weight: 400;
  padding: 5px;
  color: #172b4d;
  border: none;
  background-color: #f1f1f1;
  &:focus {
    outline-color:#396ec9;
  }
`;


function Description(props) {
  const { task, project, sendData } = props;
  const [ description, setDescription ] = useState(task.description);

  const handleOnBlur = () => {
    const changinProject = cloneDeep(project);
    changinProject.task_list.find( item => item.id === task.id ).description = description;
    sendData(changinProject);
  }

  const handleChange = (e) => {
    setDescription(e.target.value)
  }

  return (
    <Container>
      <Title>Описание</Title>
      <Textarea value={description} name='description' id='description' onChange={handleChange} onBlur={handleOnBlur} placeholder='Добавьте подробное описание задачи'/>
    </Container>
  )
}

Description.propTypes = {}

export default Description

