import styled from 'styled-components';
import React, { useState, useReducer } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import Editor from '../components/Editor';
import { useAddDocMutation } from '../redux/modules/workspaces';



const DocsWrite = ()=>{
 const navigate = useNavigate();
 const params = useParams();
 const id = Number(params.id);

 const [addDoc] = useAddDocMutation();
 const [title, setTitle] = useState('')
 const [content, setContent] = useState('')
    
 const onTitleChange = (e) => {
      setTitle(e.target.value);
 };

 const handleSubmit = () => {
      
 if (title !== '' && content !== '') {
    const document = {
          id,
          title,
          content,
    };
      addDoc(document);
      window.alert('문서가 등록되었습니다');
      navigate(`/workspace/main/${id}/docs`);

      } else {
        window.alert('제목과 내용을 모두 채워주세요!');
      }
    };
    
return(
      <StEditorContainer>
            <StInputTitle onChange={onTitleChange} name='title' placeholder='제목' value={title}/>
            <Editor setCon={setContent}/>
            <EditorBlock>
              <StButton onClick={handleSubmit}>게시하기</StButton>
            </EditorBlock>
        </StEditorContainer>
    )}
export default DocsWrite


const StEditorContainer = styled.div`
 margin: 2%;
 width: 100%;
 min-height: 60%;
 display: flex;
 flex-direction: column;
`;

const StInputTitle = styled.input`
  margin-bottom: 2%;
  width: 94%;
  height: 30px;
  padding: 5px;
  padding-left: 15px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid #c6c6c6;
  :focus {
    outline: 1px solid #00a99d;
  }
`;

const EditorBlock = styled.div`
 align-items: center;
 text-align: center;
`;

const StButton = styled.button`
 background-color: #000000;
 margin-left: 3%;
 width: 20%;
 height: 35px;
 border-radius: 8px;
 border: 0px;
 color: #fff;
 text-align: center;
 font-size: 0.9rem;
 font-weight: 500;
 cursor: pointer;
 margin-top: 60px;
`;

