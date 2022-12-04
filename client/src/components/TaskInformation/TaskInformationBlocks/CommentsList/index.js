import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Comment from 'components/TaskInformation/TaskInformationBlocks/CommentsList/Comment';

const Container = styled.div`
  margin-left: 15px;

`;



function CommentsList(props) {
  const { comments } = props;
  return (
    <Container>
      {
        comments.map( comment => <Comment key={comment.name} comment={comment}/>)
      }
    </Container>
  )
}

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
}

export default CommentsList
