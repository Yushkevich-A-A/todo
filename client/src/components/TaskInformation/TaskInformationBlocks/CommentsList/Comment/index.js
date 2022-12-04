import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import FormCreateComment from 'components/Forms/FormCreateComment';
import CommentsList from 'components/TaskInformation/TaskInformationBlocks/CommentsList';
import Avatar from 'components/TaskInformation/TaskInformationBlocks/CommentsList/Comment/Avatar';
import Button from 'components/Button';

const WrapperContainer = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const Container = styled.div`
  display: flex;
  align-items: stretch;
  background-color: #c4c4c4;
  border-radius: 10px;
  padding: 10px;
`;

const RightBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
`;

const InfoBlock = styled.div`
  width: 100%;
  border-left: 1px solid black;
`;

const HeadComment = styled.div`
  padding: 5px 10px;
  border-bottom: 1px solid black;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const DateComment = styled.div`
  font-size: 14px;
  font-weight: 400;
`;

const Message = styled.div`
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 400;
  font-style: italic
`;

const LinkText = styled.div`
  color: blue;
  font-size: 14px;
  text-decoration: underline;
  text-align: center;
`;

function Comment(props) {
  const { comment } = props;
  const [ openModal, setOpenModal ] = useState(false);
  const [ openCommentList, setOpenCommentList ] = useState(false);
  
  return (
    <WrapperContainer>
      <Container>
        <RightBlock>
          <Avatar />
          <Button type='comment' handleClick={() => setOpenModal(true)} />
        </RightBlock>
       
        <InfoBlock> 
          <HeadComment>
            <Name>{comment.name}</Name>
            <DateComment>{comment.created}</DateComment>
          </HeadComment>
          <Message>{comment.message}</Message>
          { openModal && <FormCreateComment main_comment={comment} closeForm={() => setOpenModal(false)}/> }
        </InfoBlock>
      </Container>
      { openCommentList && <CommentsList comments={comment.comments}/>}
      {
        comment.comments.length !== 0 && <LinkText onClick={
          () => setOpenCommentList(!openCommentList)
        }>{openCommentList ? 'Скрыть комментарии' : 'Показать комментарии'}</LinkText>
      }
    </WrapperContainer>
  )
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
}

export default Comment
