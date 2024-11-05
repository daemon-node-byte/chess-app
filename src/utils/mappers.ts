import type { DefaultBoardDataType, BoardDataType, BoardRow } from '../types'
import { pieceLetterToFullName } from './parsers'
import CONST from '../constants'

export function mapBoardDefaultToRenderable(defaultLayout: DefaultBoardDataType) {
  const file = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const rank = ['8', '7', '6', '5', '4', '3', '2', '1']

  const results = defaultLayout.map((row, i) =>  row.map((square, j) => {
      const coords = file[j] + rank[i]
        return {
          coords: square !== null ? square.square : coords,
          player: square !== null ? (square.color === 'w' ? 'white' : 'black') : null,
          piece: square !== null ? pieceLetterToFullName(square.type) : null
        }
      })
    ) as BoardDataType
    console.log("🚀 ~ mapBoardDefaultToRenderable ~ results:", results)
  return results
}

export const mapFenToRender = (fen?: string) => {
  const defaultFen = CONST.DEFAULT_POSITION
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1']
  const rows = (fen ?? defaultFen).split(' ')[0].split('/') as string[]
  const regEx = /\d/g
  const result: BoardDataType = [];
rows.forEach((row: string, i: number) => {
   const rowArr = row.split('')
    const newRow: BoardRow = []
    rowArr.forEach((char: string, j: number) => {
      if(!regEx.test(char)) {
        newRow.push({
          coords: files[j] + ranks[i],
          player: char === char.toUpperCase() ? 'white' : 'black',
          piece: pieceLetterToFullName(char)
        })
      } else {
        const num = parseInt(char)
        for(let k = 0; k < num; k++) {
          newRow.push(
            {
              coords: files[j] + ranks[i],
              player: null,
              piece: null
            }
          )
        }
      }

    })
    result.push(newRow) 
})
return result
}

