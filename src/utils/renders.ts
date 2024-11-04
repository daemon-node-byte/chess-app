
const isWhiteOrBlack = (char: string) =>
  char === char.toUpperCase() ? "solid" : "solid";


function getChessPieceType(char: string) {
  const pieces = ["pawn", "rook", "bishop", "queen", "king"];
  for (const piece of pieces) {
    if (char.toLowerCase() === piece[0]) {
      return piece
    }
    if (char.toLowerCase() === 'n') {
      return 'knight';
    }
  }
}

export function createIconString (char: string) {
  const color = isWhiteOrBlack(char);
  const piece = getChessPieceType(char);
  return `fa6-${color}:chess-${piece}`;
}