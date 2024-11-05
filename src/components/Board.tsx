import React, { useContext } from "react";
import styled from "styled-components";
import { createIconString } from "../utils/renders";
import { Icon } from "@iconify/react";
import type { BoardSquare, BoardRow, BoardDataType } from "../types";
import { COLORS } from "../constants/colors";
import { GameContext } from "../gameContext";

const BoardWrapper = styled.div`
  display: grid;
  position: relative;
  grid-template-rows: repeat(8, 1fr);
  grid-template-columns: repeat(8, 1fr);
  width: 680px;
  height: 680px;
  background-color: transparent;
`;

const Square = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CoordinatesMarker = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  color: #fff;
  font-size: 14px;
`;

const Piece = ({
  className,
  icon,
}: {
  className: string;
  player: string;
  icon: string;
}) => {
  return <Icon icon={icon} className={`${className}`} />;
};

const ChessPiece = styled(Piece)<{ player: string }>`
  fill: ${(props) =>
    props.player === "white" ? COLORS.WHITE.PRIMARY : COLORS.BLACK.PRIMARY};
  stroke: ${(props) =>
    props.player === "white" ? COLORS.WHITE.SECONDARY : COLORS.BLACK.SECONDARY};
  stroke-width: 15px;
  max-width: 100%;
  max-height: 100%;
  width: 70px;
  height: 70px;
`;

const Tile = ({
  data,
  tileColor,
}: {
  data: BoardSquare;
  tileColor: string;
}) => {
  return (
    <Square id={`tile-${data.coords}`} color={tileColor}>
      {data.piece && (
        <ChessPiece
          player={data.player ?? ""}
          icon={createIconString(data.piece)}
          className={`${data.player}-piece`}
        />
      )}
      <CoordinatesMarker>{data.coords}</CoordinatesMarker>
    </Square>
  );
};

export default function Board() {
  const [state, setState] = React.useState<BoardDataType>([])
  const file = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const rank = ["8", "7", "6", "5", "4", "3", "2", "1"];
  const context = useContext(GameContext);
  React.useEffect(() => {
    console.log("🚀 ~ Board ~ state:", state)
    if (context?.position) {
      console.log("🚀 ~ React.useEffect ~ context:", context)
      setState([...context.position])
    }
  }, [context?.position, context?.position.length])
  if (state.length === 0) {
    return (
      <BoardWrapper>
        {file.map((fileVal, i) =>
          rank.map((rankVal, j) => {
            return (
              <Tile
                key={`${file[j]}${rank[i]}`}
                data={{
                  coords: `${file[j]}${rank[i]}`,
                  player: null,
                  piece: null,
                }}
                tileColor={
                  (parseInt(rankVal) + file.indexOf(fileVal)) % 2 === 0
                    ? COLORS.TILES.LIGHT
                    : COLORS.TILES.DARK
                }
              />
            );
          })
        )}
      </BoardWrapper>
    );
  } else if(state?.length && state.length > 0) {
    return (
      <BoardWrapper>
        {state.map((row: BoardRow, i: number) => {
          const tileColors =
            i % 2 === 0
              ? { a: COLORS.TILES.LIGHT, b: COLORS.TILES.DARK }
              : { a: COLORS.TILES.DARK, b: COLORS.TILES.LIGHT };
          return (<React.Fragment key={`${i}-frag-${i * 3}`}>
          {row.map((tileData: BoardSquare, j: number) => {
            const color = j % 2 === 0 ? tileColors.a : tileColors.b;
            return (
              <Tile key={`${tileData.coords}-${j * 3}`} data={tileData} tileColor={color} />
            );
          })}
          </React.Fragment>)
        })}
      </BoardWrapper>
    );
  } else {
    return null;
  }

}
