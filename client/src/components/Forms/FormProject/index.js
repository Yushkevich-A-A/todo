import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';


function FormProject(props) {
  const { closeModal } = props;
  const dispatch = useDispatch();
  const [form, setForm ]  = useState({
    name: '',
    description: '',
  })

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setForm(() => ({...form, [field]: value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({type: 'ADD_PROJECT_SAGA', data: form});
    closeModal();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" onChange={handleChange}/>
      <input type="text" name="description" onChange={handleChange}/>
      <button>save</button>
    </form>
  )
}

FormProject.propTypes = {
  closeModal: PropTypes.func.isRequired,
}

export default FormProject

