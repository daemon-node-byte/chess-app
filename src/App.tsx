import React from "react";
import styled from "styled-components";
import Board from "./components/Board";
import { Chess } from "chess.js";
import "./App.css";

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #330666;
  color: #fff;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  `

const ControlsCenter = styled.div``

const ControlButton = styled.button``

const TurnInfo = styled.div``

const CurrentTurn = styled.p``

const TurnCount = styled.p``

const GameStatus = styled.p``

const GameHistory = styled.ol``

const GameHistoryItem = styled.li``

type PlayerColorType = "white" | "black";
type PieceRoleType = "rook" | "knight" | "bishop" | "queen" | "king" | "pawn";
type CastlingRightsValueType = boolean | null
type CastlingRightsType = {
  white: {
    king: CastlingRightsValueType,
    queen: CastlingRightsValueType,
  },
  black: {
    king: CastlingRightsValueType,
    queen: CastlingRightsValueType,
  }
}

interface BoardSquare {
  coords: string;
  player: PlayerColorType;
  piece: PieceRoleType;
}

type BoardRow = Array<BoardSquare | null>

type GameType = {
  board: BoardRow[];
  whoMovesNext: PlayerColorType;
  fullTurn: number;
  movesSinceCapture: number;
  castlingRights: CastlingRightsType;
  enPassant: boolean;
}

const model = [
  [{ coords: 'a8', player: 'black', piece: 'rook' }],
]



function App() {
  const [game, setGame] = React.useState<GameType | null>(null)

  const handleClick = () => {
  } 

  return (
    <main>
      <ControlsCenter>
        <ControlButton onClick={handleClick}>NEW GAME</ControlButton>
        <ControlButton>MOVE KINGS PAWN</ControlButton>
      </ControlsCenter>
      <Container>
        <Board />
      </Container>
    </main>
  );
}

export default App;
