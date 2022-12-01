import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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
  const { item, handleClick } = props

  return (
    <ItemElement onClick={() => handleClick(item.id)}>
      {item.name}
    </ItemElement>
  )
}

Item.propTypes = {}

export default Item
