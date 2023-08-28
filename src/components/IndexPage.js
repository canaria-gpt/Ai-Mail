import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle, css } from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import TypeIt from "typeit-react";
import { BiChevronRight, BiInfoCircle, BiMobile } from "react-icons/bi";
import { BsApple, BsAndroid, BsBoxArrowUp, BsPlusSquare, BsGithub, BsGlobe, BsFillEnvelopeFill } from "react-icons/bs";

import profile1 from "../img/github.png";
import profile2 from "../img/github.png";

function IndexPage(props) {
  const Navigate = useNavigate();
  const category = [
    "이메일",
    "카카오톡",
    "메신저",
    "자기소개서",
    "이메일",
    "카카오톡",
    "메신저",
    "자기소개서",
    "이메일",
    "카카오톡",
    "메신저",
    "자기소개서",
  ];

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [showInfo, setShowInfo] = useState(false);

  // 뷰포트 Resize 이벤트
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };


    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <SContainer>
        <Rectangle>
          <SRow>
            <StyeldTypeit
              getBeforeInit={(instance) => {
                for (let i = 0; i <= 50; i++) {
                  const idx = Math.floor(Math.random() * 10);
                  instance.type(category[idx]).pause(2000).delete(category[idx].length).pause(1000);
                }
                return instance;
              }}
              options={{ loop: true, speed: 130 }}
            />
            <Title> 문장 교정은 어떠세요?</Title>
          </SRow>
          <SubTitle>
            이과생들의 절망적인 어휘력!{viewportWidth < 768 && <br />} <b>📧AI-Mail</b>이 도와드릴게요.
          </SubTitle>
        </Rectangle>
        <FooterDiv>
          <StartBtn
            onClick={() => {
              Navigate("/MainPage", { state: { direction: "right" } });
            }}
          >
            <div>시작하기</div>
            <BiChevronRight style={{ fontSize: "40px" }}></BiChevronRight>
          </StartBtn>
          <FooterText
            onClick={() => {
              setShowInfo(true);
            }}
            style={{ cursor: "pointer" }}
          >
            <BiInfoCircle />
            서비스 정보
          </FooterText>
        </FooterDiv>
      </SContainer>
      <Wrapper className={showInfo ? "show" : ""}>
        <WContainer>
          <WRow>
            <FooterText style={{ fontWeight: "600", fontSize: "20px" }}>📧 About</FooterText>
            <Text>
              <b>Ai-Mail</b>은 ChatGPT API를 이용한 문장 교정 서비스입니다.
              프로젝트에 관한 자세한 정보와 개발 로그는{" "}
              <b
                style={{ textDecoration: "underLine", cursor: "pointer" }}
                onClick={() => {
                  window.open("https://github.com/canaria-gpt/Ai-Mail", "_blank");
                }}
              >
                이곳
              </b>
              을 통해 확인하실 수 있습니다.
            </Text>
          </WRow>
          <WRow>
            <FooterText style={{ fontWeight: "600", fontSize: "20px" }}>🧑🏻‍💻 Credit</FooterText>
            <WImg src={profile1} style={{ borderRadius: "50%" }} />
            <Text style={{ fontSize: "20px", marginBottom: "40px" }}>
              백준원(Junwon) {""}
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "900",
                  padding: "5px 10px",
                  backgroundColor: "#352e29",
                  borderRadius: "10px",
                  color: "#f2f0ef",
                }}
              >
                Frontend
              </span>
              <div
                style={{ fontSize: "13px", margin: "10px 0px", cursor: "pointer" }}
                onClick={() => {
                  window.open("https://github.com/joonwonBaek", "_blank");
                }}
              >
                <BsGithub /> https://github.com/joonwonBaek
              </div>
              <div
                style={{ fontSize: "13px", margin: "10px 0px", cursor: "pointer" }}
                onClick={() => {
                  window.open("https://velog.io/@joonwon97", "_blank");
                }}
              >
                <BsGlobe /> https://velog.io/@joonwon97
              </div>
            </Text>

            <WImg src={profile2} style={{ borderRadius: "50%" }} />
            <Text style={{ fontSize: "20px", marginBottom: "40px" }}>
              이현도 (Hyeondo) {""}
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "900",
                  padding: "5px 10px",
                  backgroundColor: "#352e29",
                  borderRadius: "10px",
                  color: "#f2f0ef",
                }}
              >
                Frontend
              </span>
              <div
                style={{ fontSize: "13px", margin: "10px 0px", cursor: "pointer" }}
                onClick={() => {
                  window.open("https://github.com/leehyeondol", "_blank");
                }}
              >
                <BsGithub /> https://github.com/leehyeondol
              </div>
            </Text>
            <WImg src={profile2} style={{ borderRadius: "50%" }} />
            <Text style={{ fontSize: "20px", marginBottom: "40px" }}>
              신승용 (Seungyong) {""}
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "900",
                  padding: "5px 10px",
                  backgroundColor: "#352e29",
                  borderRadius: "10px",
                  color: "#f2f0ef",
                }}
              >
                Backend
              </span>
              <div
                style={{ fontSize: "13px", margin: "10px 0px", cursor: "pointer" }}
                onClick={() => {
                  window.open("https://github.com/sso9594", "_blank");
                }}
              >
                <BsGithub /> https://github.com/sso9594
              </div>
            </Text>
            <WImg src={profile2} style={{ borderRadius: "50%" }} />
            <Text style={{ fontSize: "20px", marginBottom: "40px" }}>
              하지민 (Jimin) {""}
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "900",
                  padding: "5px 10px",
                  backgroundColor: "#352e29",
                  borderRadius: "10px",
                  color: "#f2f0ef",
                }}
              >
                Backend
              </span>
              <div
                style={{ fontSize: "13px", margin: "10px 0px", cursor: "pointer" }}
                onClick={() => {
                  window.open("https://github.com/hajimin1", "_blank");
                }}
              >
                <BsGithub /> https://github.com/hajimin1
              </div>
            </Text>
          </WRow>
        </WContainer>

        <CloseBtn
          onClick={() => {
            setShowInfo(false);
          }}
        >
          닫기
        </CloseBtn>
      </Wrapper>
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

const SContainer = styled(Container)`
  width: 100%;
  height: 85%;
  margin: 0px 0px 0px 0px;

  position: fixed;
  bottom: 0px;

  @media (min-width: 768px) {
  }
`;

const SRow = styled.div`
  margin: 0px 0px 0px 0px;
  padding: 0px 0px 0px 0px;

  gap: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin-bottom: 10px;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 12px;
  }
`;

const SCol = styled(Col)`
  margin: 0px 0px 7% 0px;
  padding: 0px;
  height: 100%;

  @media (min-width: 768px) {
  }
`;

const Rectangle = styled.div`
  width: 100%;
  height: 100%;
  margin: 0px 0px 0px 0px;
  overflow-y: auto;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: white;
`;

const Title = styled.span`
  font-size: 30px;
  font-weight: 100;
  color: #352e29;

  @media (min-width: 768px) {
    font-size: 35px;
  }
`;

const SubTitle = styled.span`
  font-size: 20px;
  color: #352e29;
  margin: 10px 0px 200px 0px;

  @media (min-width: 768px) {
    font-size: 25px;
  }
`;

const StyeldTypeit = styled(TypeIt)`
  font-size: 33px;
  font-weight: 700;
  background-color: #352e29;
  color: #f2f0ef;
  padding: 0px 8px;

  @media (min-width: 768px) {
    font-size: 40px;
  }
`;

const FooterDiv = styled.div`
  width: 100%;
  position: fixed;
  bottom: 70px;
  margin: 0 auto;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    bottom: 90px;
  }
`;

const FooterText = styled.span`
  font-size: 16px;
  color: #352e29;

  margin-bottom: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;

  border-bottom: 2px solid #352e29;

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const StartBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #352e29;
  font-weight: 800;

  font-size: 20px;
  cursor: pointer;
  gap: 12px;

  background-color: #f2f0ef;
  border: 3px solid #352e29;
  border-radius: 80px;
  padding: 8px 20px;
  margin-bottom: 30px;

  transition: all 0.5s ease;

  @media (min-width: 768px) {
    font-size: 25px;
  }

  &:hover {
    background-color: #352e29;
    color: #f2f0ef;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  /* overflow-y: none; */

  background-color: #f2f0ef;
  position: fixed;
  top: 0px;
  padding-top: 100px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease-in-out, visibility 0s linear 0.3s;

  &.show {
    opacity: 1;
    visibility: visible;
    transition: opacity 0.4s ease-in-out, visibility 0s linear;
  }
`;

const WContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  overflow-x: none;

  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: column;

  padding: 0px 8%;
  gap: 30px;

  @media (min-width: 768px) {
    padding: 0px 20%;
  }
`;

const WRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  justify-content: start;
  align-items: center;
  gap: 12px;
  /* height: 100%; */
`;

const WImg = styled.img`
  width: 250px;
  box-shadow: 0px 10px 15px -5px rgba(153, 153, 153, 0.3);
`;

const CloseBtn = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  color: #f2f0ef;
  font-weight: 800;
  font-size: 20px;
  cursor: pointer;

  background-color: #352e29;
  padding: 20px 20px;
`;

const Text = styled.div`
  font-size: 15px;

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

export default IndexPage;