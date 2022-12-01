import React, { useState }  from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import Input from 'components/elements/Input';
import cloneDeep from 'lodash/cloneDeep';

const Container = styled.div`
  margin-bottom: 10px;
`;

function Name(props) {
  const { task, project, sendData } = props;
  const [ name, setName ] = useState(task.name);

  const handleOnBlur = () => {
    const changinProject = cloneDeep(project);
    changinProject.task_list.find( item => item.id === task.id ).name = name;
    sendData(changinProject);
  }

  const handleChange = (e) => {
    setName(e.target.value)
  }

  return (
    <Container>
      <Input type='main' value={name} name='name' id='name' handleChange={handleChange} handleOnBlur={handleOnBlur} placeholder='Введите названи'/>
    </Container>
  )
}

Name.propTypes = {}

export default Name
