import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import Item from 'components/Item';
import { redirect, useNavigate } from "react-router-dom";

const ElementList = styled.div`
  padding: 10px;
`

function ListProject(props) {
  const { list } = props;
  let navigate = useNavigate()

  const handleClick = (id) => {
    return navigate(`/project/${id}`);
  }

  return (
    <ElementList>
      {
        list.map( item => <Item key={item.id} item={item} handleClick={handleClick}/> )
      }
    </ElementList>
  )
}

ListProject.propTypes = {}

export default ListProject;
