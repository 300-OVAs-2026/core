import type { CSSProperties } from 'react';

import { calcPosition } from './calc-position';
import { DESKTOP, TABLET } from './constants';

/**
 * Function to get the CSS properties for grid positioning of a node based on its index. It calculates the position for desktop, tablet, and mobile layouts and returns them as CSS custom properties.
 * The function uses the calcPosition function to determine the grid row and column for desktop and tablet layouts, while for mobile it calculates a simple two-column layout based on the index.
 *
 * @param index - The index of the node in the sequence.
 * @returns An object containing CSS custom properties for grid row and column for desktop, tablet, and mobile layouts.
 */
export function getAllPositions(index: number): CSSProperties {
  const d = calcPosition(index, DESKTOP.itemsPerRow, DESKTOP.totalCols);
  const t = calcPosition(index, TABLET.itemsPerRow, TABLET.totalCols);
  const m = { gridRow: index + 1, gridColumn: index % 2 === 0 ? 1 : 2 };

  return {
    '--pos-row': d.gridRow,
    '--pos-col': d.gridColumn,
    '--pos-row-t': t.gridRow,
    '--pos-col-t': t.gridColumn,
    '--pos-row-m': m.gridRow,
    '--pos-col-m': m.gridColumn
  } as CSSProperties;
}
