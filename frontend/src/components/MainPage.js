import React from 'react'
import styled, { createGlobalStyle, css } from "styled-components";
import { Container } from "react-bootstrap";

function MainPage() {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <TContainer>
        <InputTextArea>
        </InputTextArea>
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
  width:30%;
  height: 50%;
`;
const OutputTextArea = styled.textarea`
  width:30%;
  height: 50%;
`;
const TContainer = styled(Container)`
  width: 100%;
  height: 85%;
  margin: 0px 0px 0px 0px;

  position: fixed;
  bottom: 0px;

  @media (min-width: 768px) {
  }
`;

export default MainPage