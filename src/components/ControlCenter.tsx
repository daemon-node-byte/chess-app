import React, { useReducer } from 'react'
import styled from 'styled-components';
import { initContext } from '../gameContext';
import { gameReducer, ActionType } from '../gameReducer';
import { GameContextType } from '../types';
import { Chess } from 'chess.js'
import CONST from '../constants';

const { ACTIONS } = CONST
 
const Button = styled.button`
  padding: 8px 16px;
  background-color: #aaa;
  color: #000;
  border: 1px solid #777;
  border-radius: 4px;
  cursor: pointer;
  &:active {
    transform: translate(2px, 5px);
    transition: transform 0.1s ease-in-out;
  }
`

const ControlPanel = styled.div`
  color: #fff;
  padding: 24px;
  margin: 16px;
`

export default function ControlCenter() {
  const [state, dispatch] = useReducer<React.Reducer<GameContextType, ActionType>>(gameReducer, initContext)
  const startNewGame = () => {
    const game = new Chess()
    const fen = game.fen()
    
    dispatch({
      type: ACTIONS.NEW_GAME,
      payload: {
        chessGame: game,
        position: game.board(),
        currentFen: fen
      }
    })
  }
  return (
    <ControlPanel>
      <Button onClick={startNewGame}>Start Game</Button>
    </ControlPanel>
  )
}
