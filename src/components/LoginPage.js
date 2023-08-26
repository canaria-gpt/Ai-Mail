import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function LoginPage() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [, setCookie] = useCookies(['token']); // Token을 저장할 쿠키

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        data:{
          loginId: loginId,
          password: password,
        }
      });

      // const token = response.data.token;
      console.log(response.data.loginId);
      console.log(response.data);

      // 토큰을 쿠키에 저장 (경로를 '/'로 설정)
      //setCookie('token', token, { path: '/' });

      // 로그인 후 동작 수행 (예: 페이지 이동)
      // 예: history.push('/dashboard');
    } catch (error) {
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
