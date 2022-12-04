import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import BattonText from 'components/ButtonText';
import FormCreateComment from 'components/Forms/FormCreateComment';
import CommentsList from 'components/TaskInformation/TaskInformationBlocks/CommentsList';
import ButtonText from 'components/ButtonText';

const WrapperContainer = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: #c4c4c4;
`;

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 5px 20px;
  background-color: black;
`;

const InfoBlock = styled.div`
  width: 100%;
  border: 1px solid black;
`;

const HeadComment = styled.div`
  border-bottom: 1px solid black;
  display: flex;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const DateComment = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const Message = styled.div`
  font-size: 14px;
  font-weight: 400;
`;

function Comment(props) {
  const { comment } = props;
  const [ openModal, setOpenModal ] = useState(false);
  const [ openCommentList, setOpenCommentList ] = useState(false);
  
  return (
    <WrapperContainer>
      <Container>
        <Avatar />
        <InfoBlock> 
          <HeadComment>
            <Name>{comment.name}</Name>
            <DateComment>{comment.created}</DateComment>
          </HeadComment>
          <Message>{comment.message}</Message>
          { !openModal && <BattonText  type='add' handleClick={() => setOpenModal(true)}>Добавить комментарий</BattonText> }
          { openModal && <FormCreateComment main_comment={comment} closeForm={() => setOpenModal(false)}/> }
          {
            comment.comments.length !== 0 && <ButtonText type='add' handleClick={() => setOpenCommentList(!openCommentList)}>{openCommentList ? 'Скрыть комментарии' : 'Показать комментарии'}</ButtonText>
          }
        </InfoBlock>
      </Container>
      { openCommentList && <CommentsList comments={comment.comments}/>}
    </WrapperContainer>
  )
}

Comment.propTypes = {}

export default Comment
