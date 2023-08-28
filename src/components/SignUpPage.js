import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styled, {createGlobalStyle ,css} from 'styled-components';
import { Container } from 'react-bootstrap';

const SignUpPage = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const navigate = useNavigate();// 페이지 이동을 위한 navigate

  const handleSignup = async (e) => {
  e.preventDefault(); // 기본 동작 중단
    try {
      const response = await axios.post('http://20.214.111.0:8080/auth/join', {
        loginId,
        password,
        nickname,
        passwordCheck,
      });

      // 회원가입 성공 시 처리
      console.log(response.data);
      alert("회원가입 성공");
      navigate("/LoginPage");

    } catch (error) {
      console.error('회원가입 실패', error);
      alert("회원가입 실패");
    }
  };

  return (
    <>
    <GlobalStyle></GlobalStyle>
    <TContainer>
       <form>
          <LogInForm
            type="text"
            placeholder="아이디"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          /><br/>
          <LogInForm
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br/>
          <LogInForm
            type="password"
            placeholder="비밀번호 확인"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          /><br/>
          <LogInForm
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          /><br/>
          <SignUpBtn onClick={handleSignup}>회원가입</SignUpBtn>
       </form>
    </TContainer>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
${css`
  ::-webkit-scrollbar {
    width: 0px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #352e29;
    border-radius: 50px;
    width: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #352e29;
  }
`}
   
@media (min-width: 768px) {
   ${css`
     ::-webkit-scrollbar {
       width: 5px;
     }

     ::-webkit-scrollbar-track {
       background-color: transparent;
     }

     ::-webkit-scrollbar-thumb {
       background-color: transparent;
     }

     ::-webkit-scrollbar-thumb:hover {
       background-color: transparent;
     }
   `}
 }
`;

 const TContainer = styled(Container)`
 width: 100%;
 height: 85%;
 margin: 0px 0px 0px 0px;
 justify-content: center;
 align-items: center;


 display: flex;

 @media (min-width: 768px) {
 }
`;

const SignUpBtn = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 color: #f2f0ef;
 font-weight: 800;

 font-size: 10px;
 cursor: pointer;
 gap: 10px;

 background-color: #352e29;
 border: 3px solid #352e29;
 border-radius: 80px;
 padding: 4px 16px;
 margin-bottom: 10px;

 transition: all 0.5s ease;

 @media (min-width: 768px) {
   font-size: 25px;
 }

 &:hover {
   background-color: #f2f0ef;
   color: #352e29;
 }
`;

const LogInForm = styled.input`
 display: flex;
 justify-content: center;
 align-items: center;
 color: #352e29;
 font-weight: 800;

 font-size: 10px;
 gap: 10px;

 background-color: #f2f0ef;
 border: 3px solid #352e29;
 border-radius: 80px;
 padding: 4px 16px;
 margin-bottom: 10px;

 transition: all 0.5s ease;

 @media (min-width: 768px) {
   font-size: 25px;
 }
`;

export default SignUpPage;
