import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import BattonText from 'components/ButtonText';
import Input from 'components/elements/Input';
import Textarea from 'components/elements/Textarea';
import { useDispatch } from 'react-redux';

const AddComment = styled.div``;
const FormComment = styled.div``;

function FormCreateComment(props) {
  const { closeForm, main_comment } = props;
  const dispatch = useDispatch();
  const [ form, setForm ] = useState({
    name: '',
    message: '',
  })

  const handleSubmit = () => {
    dispatch({type: 'ADD_COMMENT_SAGA', payload: {
      ...form,
      id_main_comment: main_comment.id,
      id_project: main_comment.id_project,
      id_task: main_comment.id_task,
    }})
    closeForm()
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm( state => ({...state, [name]: value}))
  } 

  return (
    <AddComment>
      <FormComment>
      <Input type='text' value={form.name} name='name' handleChange={handleChange} placeholder='Укажите имя' />
      <Textarea  value={form.message} name='message' handleChange={handleChange} placeholder='Введите сообщение'/>
      </FormComment>
      <BattonText type='add' handleClick={handleSubmit}>Сохранить</BattonText>
    </AddComment>
  )
}

FormCreateComment.propTypes = {}

export default FormCreateComment
