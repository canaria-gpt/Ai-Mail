import React, {useState} from 'react'
import styled, { createGlobalStyle, css } from "styled-components";
import { BsArrowRight} from "react-icons/bs";
import { Container } from "react-bootstrap";
import Select from "react-select";

const selectOptions = [
  {value: "e-mail", label: "이메일"},
  {value: "unused", label: "자기소개서"},
  {value: "report", label: "보고서"}
];

function MainPage() {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <>
    <GlobalStyle></GlobalStyle>
    
      <Select
        className="selectItem"
        onChange={(e) => setSelectedValue(e.value)}
        options={selectOptions}
        placeholder="유형 선택"
        value={selectOptions.filter(function (option) {
          console.log(selectedValue);
          return option.value === selectedValue;
        })}
      />
      <TContainer>
        <InputTextArea placeholder='내용을 입력해주세요'>
        </InputTextArea>
        <OutputButton
          onClick={() => {
            
          }}
        >
          <BsArrowRight style={{ fontSize: "25px", color: "#f2f0ef" }}></BsArrowRight>
        </OutputButton>
        <OutputTextArea>
        </OutputTextArea>
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
const InputTextArea = styled.textarea`
  width:40%;
  height: 60%;
`;
const OutputTextArea = styled.textarea`
  width:40%;
  height: 60%;
`;

const TContainer = styled(Container)`
  width: 100%;
  height: 85%;
  margin: 0px 0px 0px 0px;
  justify-content: center;
  align-items: center;


  position: fixed;
  display: flex;
  bottom: 0px;

  @media (min-width: 768px) {
  }
`;
const FContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 50px;
  display: flex;
  justify-content: middle;
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


export default MainPage