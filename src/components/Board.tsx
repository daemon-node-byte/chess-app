import React from 'react'
import styled from 'styled-components'
import { Chess } from 'chess.js'
import { createIconString } from '../utils/renders'
import { Icon } from '@iconify/react'


const BoardWrapper = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  gap: 1px;
  width: 650px;
  height: 650px;
  background-color: transparent;
`

const Square = styled.div<{ color: string}>`
  background-color: ${props => props.color};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const CoordinatesMarker = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  color: #fff;
  font-size: 14px;
`

const initLayout = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
]


type GameLayout = string[][];

export default function Board() {

  const [layout, setLayout] = React.useState<GameLayout>(initLayout)
  const tile = {lite: '#9b9b9b', dark: '#239f18'}
  const file = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const rank = ['8', '7', '6', '5', '4', '3', '2', '1']
  return (
    <BoardWrapper>
      {layout.map((row, i) => row.map((square, j) => {
        const tileColor = i % 2 === 0  ? {a: tile.lite, b: tile.dark} : {a: tile.dark, b: tile.lite}
      const isWhite = square === square.toUpperCase()      
      return (<Square key={`${i}-${j}`} color={j % 2 === 0 ? tileColor.a : tileColor.b}>
        <Icon icon={createIconString(square)} color={isWhite ? '#fff': '#000'} className={`game-piece ${isWhite ? 'white' : 'black'}-piece`} />
        {/* <ChessPiece name={getName()} /> */}
          <CoordinatesMarker>{file[j] + rank[i]}</CoordinatesMarker>
        </Square>
      )
      }))}
    </BoardWrapper>
  )
}
