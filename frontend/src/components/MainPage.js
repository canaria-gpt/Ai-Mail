import React, {useState} from 'react'
import styled, { createGlobalStyle, css } from "styled-components";
import { BsArrowRight} from "react-icons/bs";
import { Container } from "react-bootstrap";
import Select from "react-select";
import axios from 'axios';
import { setCookie, getCookie, removeCookie } from './Cookie.js';


const BASE_URL = 'http://localhost:8080/chat-gpt';

const selectOptions = [
  {value: "mail", label: "이메일"},
  {value: "intro", label: "자기소개서"},
  {value: "kakao", label: "카카오톡"}
];

function MainPage() {
  const [selectedValue, setSelectedValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

    const sendQuestion = async () => {
        if (!inputValue) return;

        try {
            const response = await fetch(`${BASE_URL}/${selectedValue}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: inputValue }),
            });

            const data = await response.json();
            const responseMessage = {
                text: data.choices[0].text,
            };
            console.log(responseMessage);

            setMessages([...messages, responseMessage]);

        } catch (error) {
            console.error('Error sending question:', error);
        }
    };

    const SaveData = async (e) => {
      e.preventDefault(); // 기본 동작 중단

/////여기부턴 쓸모없는거


      const authToken = getCookie("is_login2");
      const api = axios.create({
          baseURL: 'http://20.214.111.0:8080/',
          headers: {
              Authorization: `Bearer ${authToken}`, // 토큰을 헤더에 추가
          },
      });

      api.get('http://localhost:3000')
          .then(response => {
              console.log('Protected resource response:', response.data);
          })
          .catch(error => {
              console.error('Error accessing protected resource:', error);
          });




        try {
          const response = await axios.post('http://localhost:8080/chat/save', {
            messages
          });

          const responseMessage = {
            text: response.choices[0].text,
          };

          console.log(responseMessage);

          alert("저장 성공");
    
        } catch (error) {
          alert("저장 실패");
        }
      };

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <Select
        className="selectItem"
        onChange={(e) => setSelectedValue(e.value)}
        options={selectOptions}
        placeholder="유형 선택"
        value={selectOptions.filter(function (option) {
          return option.value === selectedValue;
        })}
      />
      <TContainer>
        <InputTextArea
            placeholder='내용을 입력해주세요'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} >
        </InputTextArea>
        <OutputButton
          onClick={sendQuestion}>
          <BsArrowRight style={{ fontSize: "25px", color: "#f2f0ef" }}></BsArrowRight>
        </OutputButton>
        {messages.map((message, index) => (
        <OutputText key={index}>
            <span className="chat-box">{message.text}&nbsp;</span>
        </OutputText>
        ))}
        {messages.length === 0 && (
        <OutputText>
          <span className="chat-box">&nbsp;</span>
        </OutputText>
        )}
      </TContainer>
      <SaveBtn onClick={SaveData}>
        <div>
          저장
        </div>
      </SaveBtn>
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
const InputTextArea = styled.textarea`
  width:45%;
  height: 65%;
`;
const OutputText = styled.div`
  width:45%;
  height: 65%;
  background-color: #FFFFFF;
  padding: 8px;
  word-spacing: 3px;
  border: solid 0.6px;
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
const FContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 50px;
  display: flex;
  justify-content: center;
`;
const OutputButton = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20px;
  background-color: #352e29;
  box-shadow: 0px 10px 20px -5px rgba(29, 18, 10, 0.317);

  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;
const SaveBtn = styled.div`
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


export default MainPage