import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/ai-logo-1.png";
import { getCookie, removeCookie } from './Cookie.js';

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
      const [nickname, setNickname] = useState(""); // 변경: username -> nickname

//
      const [user, setUser] = useState({ email: '', pw: '' });
    /** Get User Login Info 쓸모있는지는 모르겠음 */
      const onChange = async (event: any) => {
          const { name, value } = event.target
          setUser({
            ...user,
            [name]: value,
          })
        }
//

      useEffect(() => {
          const loginId = user.name; // 쿠키에서 가져온다면 "is_login"다 이걸로 바꿔도 됨.
          // Check if user is logged in by checking the accessToken in local storage
          const accessToken = getCookie("is_login");
          if (accessToken) {
              setIsLoggedIn(true);

              // Get nickname from local storage
              const storedNickname = "User";
              if (storedNickname) {
                  setNickname(storedNickname);
              }
          }
      }, []);

      const handleLogout = () => {
          removeCookie('is_login');
          setIsLoggedIn(false);
          alert("로그아웃 되었습니다.");
          window.location.reload(); // 새로고침 실행
          setNickname(""); // 변경: setUsername -> setNickname
      };

      return (
          <nav style={{ padding: "1rem", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              {isLoggedIn ? (
                  <>
                      <p style={{ color: "#444", marginRight: "14px",marginTop: "0",marginBottom: "0", fontSize: "16px", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                          {`${nickname} 님 환영합니다`}
                      </p>
                      <button onClick={handleLogout} style={{ color: "#080808", border: "none", background: "transparent", cursor: "pointer",textOverflow: "ellipsis",fontSize: "16px", // 버튼 폰트 크기 키우기
          textDecoration: "underline"}}>로그아웃</button>
                  </>
              ) : (
                  <>
                      <a href="/LoginPage" style={{ color: "#444", marginRight: "1rem" }}>로그인</a>
                      <a href="/SignUpPage" style={{ color: "#444" }}>회원가입</a>
                  </>
              )}
          </nav>
      );
  }

const StyledImg = styled.img`
  height: 40px;
  cursor: pointer;

  @media (min-width: 768px) {
    height: 40px;
  }
`;
const SignInBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #352e29;
  font-weight: 800;

  font-size: 10px;
  cursor: pointer;
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

  &:hover {
    background-color: #352e29;
    color: #f2f0ef;
  }
`;

export default NavBar;