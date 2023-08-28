import './App.css';
import styled from "styled-components";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from './components/NavBar';
import IndexPage from './components/IndexPage';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { TransitionGroup, CSSTransition } from "react-transition-group";

function App() {
  const location = useLocation();

  const App = styled.div`
    width: 100%;
    height: 100vh;
    padding: 70px 0px 40px 0px;
    background-color: #f2f0ef;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    text-align: center;

    overflow-x: hidden;
    overflow-y: none;

    @font-face {
      font-family: "NanumSquareNeo-Variable";
      src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2")
        format("woff2");
      font-weight: normal;
      font-style: normal;
    }

    @font-face {
      font-family: "Pretendard-Regular";
      src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff") format("woff");
      font-weight: 400;
      font-style: normal;
    }

    @media (min-width: 768px) {
      padding: 100px 0px 40px 0px;
    }
  `;
  return (
    <>
    <NavBar></NavBar>
    <TransitionGroup className="transitions-wrapper">
        <CSSTransition
          key={location.pathname}
          classNames={location.state?.direction === "left" ? "left" : "right"}
          timeout={300}
        >
          <App style={{ fontFamily: "NanumSquareNeo-Variable" }}>
            <Routes location={location}>
              <Route
                path="/"
                element={
                  <>
                    <IndexPage style={{ position: "absolute" }}></IndexPage>
                  </>
                }
              />
              <Route
                path="/MainPage"
                element={
                  <>
                    <MainPage style={{ position: "absolute" }}></MainPage>
                  </>
                }
              />
              <Route
                path="/LoginPage"
                element={
                  <>
                    <LoginPage style={{ position: "absolute" }}></LoginPage>
                  </>
                }
              />
              <Route
                path="/NavBar"
                element={
                  <>
                    <NavBar style={{ position: "absolute" }}></NavBar>
                  </>
                }
              />
            <Route
                path="/SignUpPage"
                element={
                  <>
                    <SignUpPage style={{ position: "absolute" }}></SignUpPage>
                  </>
                }
              />
            </Routes>
          </App>
        </CSSTransition>
      </TransitionGroup>
      </>
  );
}

export default App;
