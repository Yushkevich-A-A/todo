import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Button from 'components/Button'
import { useDispatch } from 'react-redux'

const ItemElement = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  padding: 10px;
  transition: background-color .2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s;
  ${ props =>  props.transition && css`opacity: 1;`}
  
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
  const [transition, setTransition] = useState(false);

  useEffect( () => {
    setTimeout(() => setTransition(true), 10);
  }, [])

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setTransition(false);
    setTimeout(() => {
      dispatch({ type: "DELETE_PROJECT_SAGA", payload: { id: item.id } });
    },100)
  } 

  return (
    <ItemElement transition={transition} onClick={() => handleClick(item.id)}>
      {item.name}
      <Button type='delete' handleClick={handleDeleteClick}/>
    </ItemElement>
  )
}

Item.propTypes = {
  item: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
}

export default Item
