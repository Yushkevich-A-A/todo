import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import ButtonText from 'components/ButtonText';
import cloneDeep from 'lodash/cloneDeep';

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
  const { task, project, sendData } = props;
  const [ files, setFiles ] = useState([]);
  const ref = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const changinProject = cloneDeep(project);
    // changinProject.task_list.find( item => item.id === task.id ).files = files;
    // console.log(files);
    // sendData(changinProject);
  }

  const handlerChange = (e) => {
    const filesData = e.target.files
    if ( filesData === 0 ) {
      return;
    }

    for (let a = 0; a < filesData.length; a++) {
      const reader = new FileReader();
      reader.readAsDataURL(filesData[a]);

      reader.addEventListener("load", () => {
        setFiles(state => ([...state, reader.result]));
      }, false);
    }
  }

  const handlerLoadFiles = () => {
    const changinProject = cloneDeep(project);
    changinProject.task_list.find( item => item.id === task.id ).files = files;
    console.log(ref);
    sendData(changinProject);
  }

  return (
    <div>
      <Form onSubmit={handleSubmit} method="post" action="#" id="#">
            <div>
              <div>
                <label>Прикрепите файлы </label>
                <input ref={ref} type="file" onChange={handlerChange} multiple={true}/>
              </div>
            </div>
            {files.length !== 0 && <ButtonText type='add' handleClick={handlerLoadFiles}>Загрузить</ButtonText>}
      </Form>
      <FilesPreview>
        {
          task.files.map( ( item, index ) => <FileItem key={index} src={item}/> )
        }
      </FilesPreview>
    </div>
  )
}

FileLoader.propTypes = {}

export default FileLoader
