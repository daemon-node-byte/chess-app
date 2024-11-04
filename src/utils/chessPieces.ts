const whiteOrBlack = (char: string) =>
  char === char.toUpperCase() ? "solid" : "regular";

function getChessPieces(char: string) {
  const pieces = ["pawn", "rook", "knight", "bishop", "queen", "king"];
  for (const piece of pieces) {
    if (char.toLowerCase() === piece[0]) {
      return piece
    }
  }
}

export default function iconString (char: string) {
  const color = whiteOrBlack(char);
  const piece = getChessPieces(char);
  return `fa6-${color}:chess-${piece}`;
}