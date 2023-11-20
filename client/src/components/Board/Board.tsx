import { useCallback } from 'react';
import { Box } from '@react-three/drei';
import PropTypes from 'prop-types';
import { Vector3 } from 'three';

type BoardProps = {
  onPiecePlaced: (newPosition: Vector3, cell: number[]) => void;
};

const Board = (props: BoardProps) => {
  const boardSize = 3; // 3x3 board
  const cellSize = 4.8; // size of each tile
  const cellHeight = 0.1; // height of the tile
  const gap = 0.6; // gap between tile
  const separatorHeight = 0.1; // height of the separator, slightly higher than the tile
  const totalSize = boardSize * cellSize + (boardSize - 1) * gap + 1.5; // total size of the board including gaps

  const { onPiecePlaced } = props;

  const cells = [];

  const separators = [];

  const handlePlacePiece = useCallback(
    (position: Vector3, cell: number[]) => {
      onPiecePlaced(position, cell);
    },
    [onPiecePlaced]
  );
  
  // Create cells
  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      // Calculate position for each cell
      const position = new Vector3(
        (x - (boardSize - 1) / 2) * (cellSize + gap),
        cellHeight / 2,
        (y - (boardSize - 1) / 2) * (cellSize + gap)
      );

      cells.push(
        <Box
          key={`cell-${x}-${y}`}
          position={position}
          args={[cellSize, cellHeight, cellSize]}
          onClick={() => {
            handlePlacePiece(position, [x, y]);
          }}
        >
          <meshBasicMaterial attach='material' color={'#f4f4f4'} />
        </Box>
      );
    }
  }

  // Create horizontal separators
  for (let i = 0; i < boardSize - 1; i++) {
    const position = new Vector3(
      0,
      separatorHeight / 2,
      (i - (boardSize - 1) / 2) * (cellSize + gap) + cellSize / 2 + gap / 2
    );

    separators.push(
      <Box
        key={`h-sep-${i}`}
        position={position}
        args={[totalSize, separatorHeight, gap]}
      >
        <meshBasicMaterial attach='material' color={'#c9b29a'} />
      </Box>
    );
  }

  // Create vertical separators
  for (let i = 0; i < boardSize - 1; i++) {
    const position = new Vector3(
      (i - (boardSize - 1) / 2) * (cellSize + gap) + cellSize / 2 + gap / 2,
      separatorHeight / 2,
      0
    );

    separators.push(
      <Box
        key={`v-sep-${i}`}
        position={position}
        args={[gap, separatorHeight, totalSize]}
      >
        <meshBasicMaterial attach='material' color={'#c9b29a'} />
      </Box>
    );
  }

  return (
    <group>
      {cells}
      {separators}
    </group>
  );
};

Board.propTypes = {
  onPiecePlaced: PropTypes.func.isRequired,
};

export default Board;
