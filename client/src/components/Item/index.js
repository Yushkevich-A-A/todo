import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from 'components/Button'
import { useDispatch } from 'react-redux'

const ItemElement = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  padding: 10px;
  transition: background-color .2s;

  &&:nth-child( n + 2 ) {
    margin-top: 10px;
  }

  &&:hover {
    background-color: #f2f2f2;
  }
`

function Item(props) {
  const { item, handleClick } = props;
  const dispatch = useDispatch();

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    dispatch({ type: "DELETE_PROJECT_SAGA", payload: { id: item.id } });
  } 

  return (
    <ItemElement onClick={() => handleClick(item.id)}>
      {item.name}
      <Button type='delete' handleClick={handleDeleteClick}/>
    </ItemElement>
  )
}

Item.propTypes = {
  item: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
}

export default Item
