// import iconString from './chessPieces.js';
const DEFAULT_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - 0 1'

export const pieceletterToFullName = (piece: string) => {
  switch (piece) {
    case 'p':
    case 'P':  
      return 'pawn'
    case 'r':
    case 'R':
      return 'rook'
    case 'n':
    case 'N':
      return 'knight'
    case 'b':
    case 'B':
      return 'bishop'
    case 'q':
    case 'Q':
      return 'queen'
    case 'k':
    case 'K':
      return 'king'
    default:
      return ''
  }
}

export const parseTurns = (fen: string) => {
  const turnsIndex = fen.split(' ').length - 1
  const movesSinceLastCapture = fen.split(' ').length - 2
  return { fullTurn: +fen.split(' ').slice(turnsIndex), movesSinceCapture: +fen.split(' ').slice(movesSinceLastCapture) }
}

export function game2dToRenderData(gameLayout?: string[][]) {
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
  const layout = gameLayout || initLayout
  const file = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const rank = ['8', '7', '6', '5', '4', '3', '2', '1']
  return layout.map((row, i) => row.map((piece, j) => {
    const square = file[j] + rank[i]
    return {
      square,
      piece,
      player: piece === piece.toUpperCase() ? 'white' : 'black',
    }
  }))
}

export const castlingStatus = (fen: string) => {
  const castling = { king: false, queen: false }
  const canCastle = { 
    white: {...castling},
    black: {...castling}
  }
  const castlingRights = fen.split(' ')[2]
  if(castlingRights === '-' || castlingRights === 'w') return canCastle
  for(const char of castlingRights) {
    const player = char === char.toUpperCase() ? 'white' : 'black'
    if(char.toUpperCase() === 'K') canCastle[player].king = true
    if(char.toUpperCase() === 'Q') canCastle[player].queen = true
  }
  return canCastle
}

export const canInPassant = (fen: string) => {
  const enPassant = fen.split(' ')[3]
  const regEx = /[a-h][3-6]/
  return regEx.test(enPassant) ? enPassant : null
}

export const whoIsTurn = (fen: string) => fen.split(' ')[1] === 'w' ? 'white' : 'black'

export const parseFENToGameArray = (fen: string) => {
  const defaultFen = DEFAULT_POSITION
  const rows = (fen || defaultFen).split(' ')[0].split('/')
  const regEx = /\d/g
  const result: string[][] = []
rows.forEach((row) => {
   const rowArr = row.split('')
    const newRow: string[] = []
    rowArr.forEach((char) => {
      

      if(!regEx.test(char)) {
        newRow.push(char)
      } else {
        const num = parseInt(char)
        for(let i = 0; i < num; i++) {
          newRow.push(' ')
        }
      }

    })
    result.push(newRow) 
})
return result
}
