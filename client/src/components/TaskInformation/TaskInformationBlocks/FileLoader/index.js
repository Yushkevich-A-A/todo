import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import ButtonText from 'components/ButtonText';
import cloneDeep from 'lodash/cloneDeep';
import { useDispatch } from 'react-redux';

const Form = styled.form`
  margin-top: 20px;
`;

const FilesPreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
`

const FileItem = styled.img`
  display: block;
  width: 200px;
  margin: 10px;
`


function FileLoader(props) {
  const { task} = props;
  const [ file, setFiles ] = useState([]);
  const dispatch = useDispatch();
  const ref = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handlerChange = (e) => {
    if ( e.target.files.length === 0 ) {
      return;
    }
    setFiles(e.target.files[0]);
  }

  const handlerLoadFiles = () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id_project', task.id_project,);
    formData.append('id', task.id);
    dispatch({ type: "ADD_FILES_TASK_SAGA", payload: formData});
    ref.current.reset();
    setFiles([]);
  }

  return (
    <div>
      <Form ref={ref} onSubmit={handleSubmit} method="post" action="#" id="#">
            <div>
              <div>
                <label>Прикрепите файлы </label>
                <input type="file" onChange={handlerChange}/>
              </div>
            </div>
            {file.length !== 0 && <ButtonText type='add' handleClick={handlerLoadFiles}>Загрузить</ButtonText>}
      </Form>
      <FilesPreview>
        {
          task.files.map( ( item, index ) => <FileItem key={item.path} src={`${process.env.REACT_APP_SERVER_URL}${item.path}`}/> )
        }
      </FilesPreview>
    </div>
  )
}

FileLoader.propTypes = {}

export default FileLoader
