import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import ButtonText from 'components/ButtonText';
import Input from 'components/elements/Input';
import Textarea from 'components/elements/Textarea';
import { useDispatch } from 'react-redux';

const AddComment = styled.div`
  position: absolute;
  top: -50px;
  left: 0;
  z-index: 999;
  border: 1px solid  #d7d7d7;
  border-radius: 5px;
  padding: 10px;
  background-color: white;
`;
const FormComment = styled.div`
& input {
  margin-bottom: 10px;
  background-color: white;
  box-shadow: 0 0 0 1pt #d7d7d7;
  ${ props => {
    return props.inputError && css`
    border-radius: 2pt;
    box-shadow: 0 0 0 1pt red;
   `
 } }
}

& textarea {
  box-shadow: 0 0 0 1pt #d7d7d7;
  ${ props => {
    return props.textareaError && css`
    border-radius: 2pt;
    box-shadow: 0 0 0 1pt red;
   `
 } }
}
`;
const ButtonsBlock = styled.div`
  display: flex;
  & div {
    min-width: 100px;
  }
`;


function FormCreateComment(props) {
  const { closeForm, main_comment } = props;
  const dispatch = useDispatch();
  const [ errorMark, setError ] = useState(false);
  const [ form, setForm ] = useState({
    name: '',
    message: '',
  })

  const handleSubmit = () => {
    if ( Object.keys(form).find( item => form[item] === '' ) ) {
      setError(true);
      return;
    }
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
      <FormComment 
        onClick={() => {errorMark && setError(false)}} 
        inputError={errorMark && form.name === ''} 
        textareaError={errorMark && form.message === ''}>
        <Input type='text' value={form.name} name='name' handleChange={handleChange} placeholder='Укажите имя' />
        <Textarea  value={form.message} name='message' handleChange={handleChange} placeholder='Введите сообщение'/>
      </FormComment>
      <ButtonsBlock>
        <ButtonText type='add' handleClick={handleSubmit}>Сохранить</ButtonText>
        <ButtonText handleClick={() => closeForm()}>Отменить</ButtonText>
      </ButtonsBlock>
    </AddComment>
  )
}

FormCreateComment.propTypes = {
  closeForm: PropTypes.func, 
  main_comment: PropTypes.object.isRequired, 
}

export default FormCreateComment
