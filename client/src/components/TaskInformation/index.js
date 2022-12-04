import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled  from 'styled-components';
import BlockName from 'components/TaskInformation/TaskInformationBlocks/Name';
import Description from 'components/TaskInformation/TaskInformationBlocks/Description';
import Priority from 'components/TaskInformation/TaskInformationBlocks/Priority';
import OtherTasksBlock from 'components/TaskInformation/TaskInformationBlocks/OtherTasksBlock';
import Times from 'components/TaskInformation/TaskInformationBlocks/Times';
import FileLoader from 'components/TaskInformation/TaskInformationBlocks/FileLoader';
import Button from 'components/Button';
import { useDispatch } from 'react-redux';
import CommentsList from 'components/TaskInformation/TaskInformationBlocks/CommentsList';
import FormCreateComment from 'components/Forms/FormCreateComment';
import ButtonText from 'components/ButtonText';

const Container = styled.div`
  padding: 15px;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  transition: height 0.2s;
`;

const ButtonDeleteBlock = styled.div`
  display: flex;
`;

const Line = styled.div` 
  height: 2px;
  background: linear-gradient(to right, #f3f3f3, grey, #f3f3f3);
  margin-bottom: 10px;
`;

const BlockAddComment = styled.div` 
  position: relative;
`;

const BlockCommentList = styled.div` 

`;

function ItemInformation(props) {
  const { task, id_column, closeModal } = props;
  const dispatch = useDispatch();
  const [ openModal, setOpenModal ] = useState(false);

  const handleDeleteClick = (e) => {
    closeModal();
    dispatch({ type: "DELETE_TASK_SAGA", payload: { id_project: task.id_project, id: task.id, id_column: id_column } });
  } 

  const firstCommentlist = {
    id: null,
    id_project: task.id_project,
    id_task: task.id,
  }

  return (
    <Container>
      <ButtonDeleteBlock>
        <Button type='delete' handleClick={handleDeleteClick}/>
      </ButtonDeleteBlock>
      <BlockName task={task} />
      <Line />
      <Description task={task} />
      <Line />
      <Priority task={task} />
      <Line />
      <Times task={task} />
      <Line />
      <OtherTasksBlock task={task} />
      <Line />
      <FileLoader task={task} />
      <Line />
      <BlockAddComment>
        <ButtonText  type='add' handleClick={() => setOpenModal(true)}>Добавить комментарий</ButtonText>
        { openModal && <FormCreateComment main_comment={firstCommentlist} closeForm={() => setOpenModal(false)}/> }
      </BlockAddComment>
      <BlockCommentList>
        <CommentsList comments={task.comments}/>
      </BlockCommentList>
    </Container>
  )
}

ItemInformation.propTypes = {
  task: PropTypes.object.isRequired,
  id_column: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default ItemInformation
