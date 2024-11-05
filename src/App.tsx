import React from "react";
import styled from "styled-components";
import Board from "./components/Board";
import GameInfo from "./components/GameInfo";
import ControlCenter from "./components/ControlCenter";
import type {  } from "./types";
import "./App.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  color: #fff;
  `;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  `
const MainApp = styled.main`
  height: 100vh;
  width: 100vw;
  background-color: #330666;
  padding: 32px;
`
const Details = styled.div`
  height: 100%;
  border: 1px solid #fff;
`

function App() {

  return (
    <MainApp>
      <Wrapper>
      <Details>
        <GameInfo />
        <ControlCenter />
      </Details>
      <Container>
        <Board />
      </Container>
      </Wrapper>
    </MainApp>
  );
}

export default App;
