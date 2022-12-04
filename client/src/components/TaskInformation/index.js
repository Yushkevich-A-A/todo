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
  margin: 5px;
  padding: 15px;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  width: 700px;
`;

function ItemInformation(props) {
  const { task, id_column, closeModal } = props;
  const dispatch = useDispatch();
  const [ openModal, setOpenModal ] = useState(false);

  const handleDeleteClick = (e) => {
    closeModal();
    dispatch({ type: "DELETE_TASK_SAGA", payload: { id_project: task.id_project, id: task.id, id_column: id_column } });
  } 

  const initComment = [{
    name: 'Anton Yushkevich',
    created: Date.now(),
    message: "Hello World",
    comments: [
      {
        name: 'a Yushkevich',
        created: Date.now(),
        message: "Hello World",
        comments: [
          {
            name: 'Anaskevich',
            created: Date.now(),
            message: "Hello World",
            comments: [
              {
                name: 'nton evich',
                created: Date.now(),
                message: "Hello World",
                comments: []
              },
            ]
          },
          {
            name: 'Antossn nngich',
            created: Date.now(),
            message: "Hello World",
            comments: []
          },
        ]
      },
      {
        name: 'Pghjnton mushsich',
        created: Date.now(),
        message: "Hello World",
        comments: []
      }
    ]
  }]

  const firstCommentlist = {
    id: null,
    id_project: task.id_project,
    id_task: task.id,
  }

  return (
    <Container>
      <Button type='delete' handleClick={handleDeleteClick}/>
      <BlockName task={task} />
      <Description task={task} />
      <Priority task={task} />
      <Times task={task} />
      <OtherTasksBlock task={task} />
      <FileLoader task={task} />
      { !openModal && <ButtonText  type='add' handleClick={() => setOpenModal(true)}>Добавить комментарий</ButtonText> }
      { openModal && <FormCreateComment main_comment={firstCommentlist} closeForm={() => setOpenModal(false)}/> }
      <CommentsList comments={task.comments}/>
      
    </Container>
  )
}

ItemInformation.propTypes = {
  task: PropTypes.object.isRequired,
  id_column: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default ItemInformation
