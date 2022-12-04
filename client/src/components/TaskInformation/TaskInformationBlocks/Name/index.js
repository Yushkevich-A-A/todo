import React, { useState }  from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components';
import Input from 'components/elements/Input';
import { useDispatch } from 'react-redux';

const Container = styled.div`
  margin-bottom: 10px;
  & input {
    background-color: white;
    ${ props => {
      return props.errorMark && css`
      border-radius: 2pt;
      box-shadow: 0 0 0 1pt red;
     `
   } }
`;

function Name(props) {
  const { task } = props;
  const dispatch = useDispatch();
  const [ name, setName ] = useState(task.name);
  const [ errorMark, setError ] = useState(false);

  const handleOnBlur = () => {
    if ( task.name === name ) {
      return;
    }
    if ( name === '' || name.length < 10) {
      setName(task.name);
      setError(true);
      return;
    }
    dispatch({
      type: "CHANGE_NAME_SAGA", 
      payload: {id: task.id,  id_project: task.id_project,  name: name }
    })
  }

  const handleChange = (e) => {
    setName(e.target.value)
  }

  return (
    <Container onClick={() => {errorMark && setError(false)}} errorMark={errorMark}>
      <Input type='main' value={name} name='name' id='name' handleChange={handleChange} handleOnBlur={handleOnBlur} placeholder='Введите названи'/>
    </Container>
  )
}

Name.propTypes = {
  task: PropTypes.object.isRequired
}

export default Name
