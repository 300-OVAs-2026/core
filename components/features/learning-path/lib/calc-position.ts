/**
 * Function to calculate the grid position of a node based on its index, the number of items per row, and the total number of columns.
 * The layout is designed to create a zig-zag pattern where nodes are placed in segments. Each segment consists of a row of nodes followed by a single node in the next row that connects to the next segment.
 *
 * Example with itemsPerRow = 4 and totalCols = 6:
 * Index: 0 1 2 3 | 4 | 5 6 7 8 | 9 | 10 11 12 13
 * Row:   1 1 1 1 | 2 | 3 3 3 3 | 4 | 5 5 5 5
 * Col:   2 3 4 5 | 6 | 5 4 3 2 | 1 | 2 3 4 5
 *
 * @param index - The index of the node in the sequence.
 * @param itemsPerRow - The number of nodes that should be placed in each row before moving to the next row.
 * @param totalCols - The total number of columns in the grid layout.
 *
 * @returns An object containing the gridRow and gridColumn for the given index.
 */
export function calcPosition(
  index: number,
  itemsPerRow: number,
  totalCols: number
): { gridRow: number; gridColumn: number } {
  const segmentSize = itemsPerRow + 1;
  const segmentIndex = Math.floor(index / segmentSize);
  const posInSegment = index % segmentSize;
  const isForward = segmentIndex % 2 === 0;

  if (posInSegment < itemsPerRow) {
    return {
      gridRow: segmentIndex * 2 + 1,
      gridColumn: isForward ? posInSegment + 2 : itemsPerRow + 1 - posInSegment
    };
  }

  return {
    gridRow: segmentIndex * 2 + 2,
    gridColumn: isForward ? totalCols : 1
  };
}
