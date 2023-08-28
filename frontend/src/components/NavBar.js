import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/ai-logo-1.png";
import { getCookie, removeCookie } from './Cookie.js';

function NavBar() {
  let Navigate = useNavigate();


  const NavBar = styled.div`
    width: 100vw;
    height: 70px;
    background-color: #f2f0ef;
    padding: 0px 4%;

    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0%;
    margin: 0 auto;
    left: 0;
    right: 0;
    z-index: 1;

    @media (min-width: 768px) {
      justify-content: space-between;
      height: 100px;
    }
  `;
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
        removeCookie('is_login2');
        setIsLoggedIn(false);
        alert("로그아웃 되었습니다.");
        window.location.reload(); // 새로고침 실행
        setNickname(""); // 변경: setUsername -> setNickname
    };

    return (
      <NavBar>
              {isLoggedIn ? (
                  <>
                    <StyledImg
                    alt="logo"
                    src={logo}
                    onClick={() => {
                      Navigate("/", { state: { direction: "left" } });
                    }}
                    ></StyledImg>
                    <BtnContainer>
                      <UserContainer>
                          {`${nickname} 님 환영합니다`}
                      </UserContainer>
                      <SignInBtn onClick={handleLogout}>
                        <div>
                          로그아웃
                        </div>
                      </SignInBtn>
                    </BtnContainer>
                  </>
              ) : (
                <>
                <StyledImg
                    alt="logo"
                    src={logo}
                    onClick={() => {
                      Navigate("/", { state: { direction: "left" } });
                    }}
                ></StyledImg>
                <BtnContainer>
                  <SignInBtn
                  onClick={() => {
                    Navigate("/LoginPage", { state: { direction: "right" } });
                  }}>
                  <div>로그인</div>
                </SignInBtn>
                <SignInBtn
                    onClick={() => {
                        Navigate("/SignUpPage", { state: { direction: "right" } });
                    }}>
                  <div>회원가입</div>
                </SignInBtn>
              </BtnContainer>
              </>
              )}
          </NavBar>
      );
  }

const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #352e29;
  font-weight: 800;
  font-size: 25px;
  `
const BtnContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
` 
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