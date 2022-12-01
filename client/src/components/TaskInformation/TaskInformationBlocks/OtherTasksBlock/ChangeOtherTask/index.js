import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Row from 'components/elements/Row';
import Button from 'components/Button';
import Input from 'components/elements/Input';

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
  const { other_task, handleChange, handleDelete } = props; 
  const [ text, setText ] = useState(other_task.description);

  const handleChangeInput = (e) => {
    setText( e.target.value );
  }

  return (
    <Row type='between'>
      <Row >
        <Round complete={other_task.complete} onClick={() => handleChange(other_task.id, 'complete', !other_task.complete )}/>
        <Input value={text} name={other_task.id} handleChange={handleChangeInput} onBlur={() => handleChange(other_task.id, 'description', text )} placeholder="опишите задачу"/>
      </Row>
      <Button type="delete" handleClick={() => handleDelete(other_task.id)}/>
    </Row>
  )
}

OtherTask.propTypes = {}

export default OtherTask
