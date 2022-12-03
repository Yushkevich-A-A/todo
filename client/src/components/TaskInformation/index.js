import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components';
import BlockName from 'components/TaskInformation/TaskInformationBlocks/Name';
import Description from 'components/TaskInformation/TaskInformationBlocks/Description';
import Priority from 'components/TaskInformation/TaskInformationBlocks/Priority';
import OtherTasksBlock from 'components/TaskInformation/TaskInformationBlocks/OtherTasksBlock';
import Times from 'components/TaskInformation/TaskInformationBlocks/Times';
import FileLoader from 'components/TaskInformation/TaskInformationBlocks/FileLoader';

const Container = styled.div`
  margin: 5px;
  padding: 15px;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  width: 700px;
`;

const Row = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  ${(props) => {
    switch( props.type ) {
      case 'between':
        return css`
          justify-content: space-between;
        `
      case 'end':
        return css`
          justify-content: flex-end;
        `
    }
  }}
`;
function ItemInformation(props) {
  const { task } = props;

  return (
    <Container>
      <BlockName task={task} />
      <Description task={task} />
      <Priority task={task} />
      <Times task={task} />
      <OtherTasksBlock task={task} />
      <FileLoader task={task} />
    </Container>
  )
}

ItemInformation.propTypes = {
  task: PropTypes.object.isRequired
}

export default ItemInformation
