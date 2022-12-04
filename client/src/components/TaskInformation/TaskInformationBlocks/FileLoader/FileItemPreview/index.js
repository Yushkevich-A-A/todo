import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from 'components/Button';
// import save from 'assets/icons/save.svg';
import { useDispatch } from 'react-redux';
import { downloadFile } from 'api';

const Container = styled.div``;
const ButtonsBlock = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
`;

const FileItemImg = styled.img`
  display: block;
  max-width: 100px;
  margin: 10px;
`

function FileItemPreview(props) {
  const { item } = props;
  const dispatch = useDispatch()

  const handleDeleteIMG = () => {
    dispatch({ type: "DELETE_FILE_TASK_SAGA", payload: {
      id_project: item.id_project,
      id_main_task: item.id_main_task,
      id: item.id,
      path: item.path,
    }});
  }

  const handleDownload = () => {
    downloadFile(item.path, item.name);
  }

  return (
    <Container>
      <FileItemImg src={`${process.env.REACT_APP_SERVER_URL}${item.path}`} />
      <ButtonsBlock>
        <Button type='delete' handleClick={handleDeleteIMG}/>
        <Button type='save' handleClick={handleDownload}/>
      </ButtonsBlock>
    </Container>
  )
}

FileItemPreview.propTypes = {
  item: PropTypes.object.isRequired
}

export default FileItemPreview
