import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import ButtonText from 'components/ButtonText';
import { useDispatch } from 'react-redux';
import FileItemPreview from 'components/TaskInformation/TaskInformationBlocks/FileLoader/FileItemPreview';

const Form = styled.form`
  margin-top: 20px;
`;

const FilesPreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
`

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;


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
                <Label>Прикрепите файлы </Label>
                <input type="file" onChange={handlerChange}/>
              </div>
            </div>
            {file.length !== 0 && <ButtonText type='add' handleClick={handlerLoadFiles}>Загрузить</ButtonText>}
      </Form>
      <FilesPreview>
        {
          task.files.map( ( item, index ) => <FileItemPreview key={item.id} item={item}/> )
        }
      </FilesPreview>
    </div>
  )
}

FileLoader.propTypes = {
  task: PropTypes.object.isRequired
}

export default FileLoader
