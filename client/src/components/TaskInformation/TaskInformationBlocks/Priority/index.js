import React, { useState } from 'react'
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import arrow from 'assets/icons/arrow.svg';
import cloneDeep from 'lodash/cloneDeep';

const Container = styled.div`
position: relative;`;

const Label = styled.div`
  ${(props) => {
    switch (props.data) {
      case "low":
        return css`
          background-color: #0f00ff;
        `;
      case "lower-middle":
        return css`
          background-color: #62aae8;
        `;
      case "middle":
        return css`
          background-color: #1ac51a;
        `;
      case "up-middle":
        return css`
          background-color: #ffcc00;
        `;
      case "high":
        return css`
          background-color: red;
        `;
    }
}}
color: white;
border-radius: 5px;
width: 120px;
text-align: center;
padding: 5px;
margin: 5px;
cursor: pointer;
`

const Title = styled.div`
  color: #172b4d;
  font-size: 16px;
  font-weight: 600;
  padding: 5px;
`;

const ListLabel = styled.div`
  position: absolute;
  top: 0;
  left: 130px;
  background-color: white;
  border: 1px solid;
  border-radius: 5px;
  box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25), 0 0 0 1px rgba(9, 30, 66, 0.08);
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items; center;
`;

const Arrow = styled.div`
  width: 20px;
  height: 20px;
  border-top: 3px solid #00ba00;
  border-left: 3px solid #00ba00;
  transform: rotate(-45deg);
`;

function Priority(props) {
  const { task, project, sendData } = props;
  const [ openMenu, setOpenMenu ] = useState(false);

  const order = ["low", "lower-middle", "middle", "up-middle", "high"];

  const handleChange = (priority) => {
    if (priority !== task.priority) {
      const changinProject = cloneDeep(project);
      changinProject.task_list.find( item => item.id === task.id ).priority = priority;
      sendData(changinProject);;
    }
    setOpenMenu(false);
  }

  return (
    <Container>
      <div>
        <Title>Приоритет</Title>
        <Label data={task.priority} onClick={() => setOpenMenu(true)}>
          {task.priority}
        </Label>
      </div>
      {
        openMenu && <ListLabel>
          <Title>Изменить приоритет</Title>
          {
            order.map( item => <Row key={item}>
              <Label  data={item} onClick={() => handleChange(item)}>{item}</Label>
              { (item === task.priority ) && <Arrow/> }
              </Row> )
          }
        </ListLabel>
      }
    </Container>
  )
}

Priority.propTypes = {}

export default Priority;
