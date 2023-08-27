import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/ai-logo-1.png";


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

  return (
    <>
      <NavBar>
        <StyledImg
          alt="logo"
          src={logo}
          onClick={() => {
            Navigate("/", { state: { direction: "left" } });
          }}
        ></StyledImg>
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
      </NavBar>
    </>
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