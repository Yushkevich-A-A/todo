import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Editor } from '@tinymce/tinymce-react';

function EditorText(props) {
  const { value, changeContent } = props;
  const editorRef = useRef(null);
  const edit = () => {
    if (editorRef.current) {
      console.dir(editorRef.current);
    }
  };
  return (
    <>
      <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={value}
        apiKey='v7g9clgm0jh4u19yntk4tpfdfiagwietyr3n008zz6f979nh'
        init={{
          height: 500,
          menubar: false,
          outputFormat: "text",
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={edit}>Log editor content</button>
    </>
  )
}

EditorText.propTypes = {}

export default EditorText
