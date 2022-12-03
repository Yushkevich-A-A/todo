import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import cloneDeep from 'lodash/cloneDeep';
import { useDispatch } from 'react-redux';

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
  background-color: #f3f3f3;
  &:focus {
    outline-color:#396ec9;
    background-color: white;
  }
`;


function Description(props) {
  const { task } = props;
  const dispatch = useDispatch();
  const [ description, setDescription ] = useState(task.description);

  const handleOnBlur = () => {
    if ( task.description === description ) {
      return;
    }
    dispatch({
      type: "CHANGE_DESCRIPTION_SAGA", 
      payload: {id: task.id,  id_project: task.id_project,  description: description }
    })
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

Description.propTypes = {
  task: PropTypes.object.isRequired
}

export default Description

