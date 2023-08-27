import React, { useState } from 'react';
import axios from 'axios';
//import { useCookies } from 'react-cookie';
import { setCookie, getCookie, removeCookie } from './Cookie.js';
//import AxiosC from './AxiosC';
import { useLocation, useNavigate } from "react-router-dom";


function LoginPage() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
//  const [, setCookie] = useCookies(['token']); // Token을 저장할 쿠키

    const handleLogin = async (e) => { // e를 매개변수로 추가
      e.preventDefault(); // 기본 동작 중단

      try {
        const response = await axios.post('http://localhost:8080/auth/login', {
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
        navigate("/");
        window.location.reload(); // 새로고침 실행
      } catch (error) {
        alert("로그인 실패");
        console.error('로그인 실패', error);
      }
    };

    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'
                         , width: '100%', height: '100vh', margin: '30px'}}>
         <form style={{ display: 'flex', flexDirection: 'column' }}>
            <input
              type="text"
              placeholder="아이디"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
            <br/>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
              <br/>
            <button onClick={handleLogin}>로그인</button>
         </form>
      </div>
    );
  }

export default LoginPage;