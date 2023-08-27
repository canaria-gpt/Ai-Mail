import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const navigate = useNavigate();// 페이지 이동을 위한 navigate

  const handleSignup = async (e) => {
  e.preventDefault(); // 기본 동작 중단
    try {
      const response = await axios.post('http://localhost:8080/auth/join', {
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
      alert("외원가입 실패");
    }
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'
              , width: '100%', height: '100vh', margin: '30px'}}>
       <form style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="text"
            placeholder="Login ID"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          /><br/>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br/>
          <input
            type="password"
            placeholder="PasswordCheck"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          /><br/>
          <input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          /><br/>
          <button onClick={handleSignup}>회원가입</button>
       </form>
    </div>
  );
};

export default SignUpPage;
