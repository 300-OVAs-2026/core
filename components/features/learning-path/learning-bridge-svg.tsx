import { calcPosition } from './lib/calc-position';
import { COL_W, ROW_H } from './lib/constants';

import css from './learning-path.module.css';

interface Props {
  count: number;
  itemsPerRow: number;
  totalCols: number;
  svgClass: string;
}

/**
 * Function to build the SVG path string for the desktop and tablet versions of the learning bridge. It calculates the center positions of each node based on its index and constructs a path that connects them with straight lines and smooth arcs at the corners. The function handles both horizontal and vertical connections, ensuring a visually appealing flow between nodes.
 *
 * @param count - The total number of nodes/pages in the learning path.
 * @param itemsPerRow - The number of nodes that should be placed in each row before moving to the next row (used to determine the layout pattern).
 * @param totalCols - The total number of columns in the grid layout (used to calculate positions and arcs).
 * @returns A string representing the 'd' attribute of the SVG path element, which defines the shape of the bridge.
 */
function buildBridgePathString(count: number, itemsPerRow: number, totalCols: number): string {
  if (count < 2) return '';

  // Función para obtener el CENTRO exacto de un nodo en unidades
  const getCenter = (idx: number) => {
    const pos = calcPosition(idx, itemsPerRow, totalCols);
    return {
      cx: (pos.gridColumn - 1) * COL_W + COL_W / 2,
      cy: (pos.gridRow - 1) * ROW_H + ROW_H / 2
    };
  };

  let d = '';
  for (let i = 0; i < count - 1; i++) {
    const p1 = getCenter(i);
    const p2 = getCenter(i + 1);

    // Mover al primer punto
    if (i === 0) d += `M ${p1.cx} ${p1.cy} `;

    const pos1 = calcPosition(i, itemsPerRow, totalCols);
    const pos2 = calcPosition(i + 1, itemsPerRow, totalCols);

    if (pos1.gridRow === pos2.gridRow) {
      // Misma fila: Línea recta hasta el siguiente centro (punto L linea recta)
      d += `L ${p2.cx} ${p2.cy} `;
    } else {
      // Cambio de fila (Esquina). Trazamos un Arco pasando por el nodo de giro.
      if (i + 2 < count) {
        const p3 = getCenter(i + 2);
        const radiusX = Math.abs(p2.cx - p1.cx);
        const radiusY = Math.abs(p3.cy - p1.cy) / 2;
        const sweep = p2.cx > p1.cx ? 1 : 0; // 1 = giro horario, 0 = antihorario

        // Arco hasta el inicio de la siguiente fila
        d += `A ${radiusX} ${radiusY} 0 0 ${sweep} ${p3.cx} ${p3.cy} `; // (punto A) Arco hasta el centro del siguiente nodo (p2)
        i++; // Saltamos 1 iteración porque el arco ya conectó p1 con p3 cruzando por p2
      } else {
        // Fin de la lista justo en la esquina (1/4 de círculo)
        const radiusX = Math.abs(p2.cx - p1.cx);
        const radiusY = Math.abs(p2.cy - p1.cy);
        const sweep = p2.cx > p1.cx ? 1 : 0;
        d += `A ${radiusX} ${radiusY} 0 0 ${sweep} ${p2.cx} ${p2.cy} `;
      }
    }
  }
  return d;
}

export const BridgeSvg: React.FC<Props> = ({ count, itemsPerRow, totalCols, svgClass }) => {
  const pathD = buildBridgePathString(count, itemsPerRow, totalCols);

  let maxRow = 1;
  for (let i = 0; i < count; i++) {
    maxRow = Math.max(maxRow, calcPosition(i, itemsPerRow, totalCols).gridRow);
  }

  const vbW = totalCols * COL_W;
  const vbH = maxRow * ROW_H;

  return (
    <svg className={svgClass} viewBox={`0 0 ${vbW} ${vbH}`} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* 1. CAPA INFERIOR: Actúa como los bordes exteriores */}
      <path d={pathD} className={css['bridge-path-outer']} />

      {/* 2. CAPA SUPERIOR: Actúa como el relleno central */}
      <path d={pathD} className={css['bridge-path-inner']} />
    </svg>
  );
};
