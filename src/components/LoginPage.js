import React, { useState } from 'react';
import axios from 'axios';
import { setCookie, getCookie, removeCookie } from './Cookie.js';
import { useNavigate } from "react-router-dom";
import styled, {createGlobalStyle ,css} from 'styled-components';
import { Container } from 'react-bootstrap';


function LoginPage() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
//  const [, setCookie] = useCookies(['token']); // Token을 저장할 쿠키

    const handleLogin = async (e) => { // e를 매개변수로 추가
      e.preventDefault(); // 기본 동작 중단

      try {
        const response = await axios.post('http://20.214.111.0:8080/auth/login', {
          loginId,
          password,
        });
        console.log(loginId)
        console.log(response.data);
        console.log(response.data.accessToken);
        console.log(response.data.refreshToken);

        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        setCookie("is_login", `${accessToken}`);//"is_login"으로 바꿀것.
        setCookie("is_login2", `${refreshToken}`);//"is_login"으로 바꿀것.
        alert("로그인 성공");

        // 로그인 성공 시 mainPage로 이동
        navigate("/MainPage");
        window.location.reload(); // 새로고침 실행
      } catch (error) {
        alert("로그인 실패");
        console.error('로그인 실패', error);
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
            />
            <br/>
            <LogInForm
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
              <br/>
            <LogInBtn onClick={handleLogin}>
              <div>
                로그인
              </div>
            </LogInBtn>
         </form>
        </TContainer>
        </>
    );
  }

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

const LogInBtn = styled.div`
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


export default LoginPage;