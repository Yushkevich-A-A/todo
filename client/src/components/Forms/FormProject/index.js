import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import Input from 'components/elements/Input';
import styled, { css } from 'styled-components';
import ButtonText from 'components/ButtonText';

const BlockInput = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  & input {
    background-color: white;
    ${ props => {
      return props.errorMark && css`
      border-radius: 2pt;
      box-shadow: 0 0 0 1pt red;
     `
   } }
  }
`;



function FormProject(props) {
  const { closeModal } = props;
  const dispatch = useDispatch();
  const [ errorMark, setError ] = useState(false);
  const [form, setForm ]  = useState({
    name: '',
    description: '',
  })

  const handleChange = (e) => {
    errorMark && setError(false);
    const field = e.target.name;
    const value = e.target.value;
    setForm(() => ({...form, [field]: value}));
  }

  const handleClick = (e) => {
    e.preventDefault();
    if ( Object.keys(form).find( item => form[item] === '' ) ) {
      setError(true);
      return;
    }
    dispatch({type: 'ADD_PROJECT_SAGA', data: form});
    closeModal();
  }

  return (
    <div>
      <BlockInput errorMark={errorMark && form.name === ''} onClick={() => {errorMark && setError(false)}}>
        <Input type="text" value={form.name} name="name" handleChange={handleChange} placeholder='назовите проект...'/>
      </BlockInput>
      <BlockInput errorMark={errorMark && form.description === ''} onClick={() => {errorMark && setError(false)}}>
        <Input type="text" value={form.description} name="description" handleChange={handleChange} placeholder='опишите проект...'/>
      </BlockInput>
      <ButtonText type='add' handleClick={handleClick}>Добавить</ButtonText>
    </div>
  )
}

FormProject.propTypes = {
  closeModal: PropTypes.func.isRequired,
}

export default FormProject

