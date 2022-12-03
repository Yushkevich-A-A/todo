import React, { useState } from 'react'
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Row from 'components/elements/Row';
import Button from 'components/Button';
import Input from 'components/elements/Input';
import { useDispatch } from 'react-redux';

const Round = styled.div`
  width: 15px;
  height: 15px;
  border: 2px solid #396ec9;
  border-radius: 50%;
  margin-right: 10px;
  ${ (props) => props.complete ? css`
    background-color: #396ec9;
  ` : css `
    &:hover {
      background-color: #d4dce9;
    }
  `}
`;

function OtherTask(props) {
  const { other_task } = props; 
  const dispatch = useDispatch();
  const [ text, setText ] = useState(other_task.description);

  const handleChange = (e) => {
    setText( e.target.value );
  }

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_ADDITIONAL_TASK_SAGA", payload: {
      id_project: other_task.id_project,
      id_main_task: other_task.id_main_task,
      id: id,
    } })
  }

  const handleDispatch = (name, value) => {
    dispatch({ type: "CHANGE_ADDITIONAL_TASK_SAGA", payload: {
      id_project: other_task.id_project,
      id_main_task: other_task.id_main_task,
      id: other_task.id,
      field: name,
      value: value,
    } })
  }

  const handleBlur = () => {
    if (text.trim() === '') {
      setText(other_task.description);
      return;
    }
    handleDispatch('description', text );
  }

  return (
    
    <Row type='between'>
      <Row >
        <Round complete={other_task.complete} onClick={() => handleDispatch('complete', !other_task.complete)}/>
        <Input value={text} name={other_task.id} handleChange={handleChange} handleOnBlur={handleBlur} placeholder="опишите задачу"/>
      </Row>
      <Button type="delete" handleClick={() => handleDelete(other_task.id)}/>
    </Row>
  )
}

OtherTask.propTypes = {
  other_task: PropTypes.object.isRequired
}

export default OtherTask
