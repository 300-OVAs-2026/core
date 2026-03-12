import { COL_W, MOBILE_COLS, NODE_W, ROW_H } from './lib/constants';

import css from './learning-path.module.css';

interface Props {
  count: number;
  svgClass: string;
}

/***
 * Function to build the SVG path string for the mobile version of the learning bridge.
 * This version assumes a simple vertical list with 2 columns, where nodes alternate between left and right.
 * The path is constructed by connecting the centers of the nodes with straight lines and smooth arcs at the corners.
 * The function calculates the center positions of each node based on its index and constructs the path string accordingly.
 *
 * @param count - The total number of nodes/pages in the learning path.
 * @returns A string representing the 'd' attribute of the SVG path element, which defines the shape of the bridge.
 */
function buildMobileBridgePath(count: number): string {
  if (count < 2) return '';

  const getCenter = (idx: number) => {
    const gridRow = idx + 1;
    const gridColumn = idx % 2 === 0 ? 1 : 2;

    let x = (gridColumn - 1) * COL_W + NODE_W / 2;

    if (gridColumn === 1) {
      x = x + 1; // R
      // se resta para empujar la línea más a la izd
    } else {
      x = x + 4; // Se suma para empujar la línea más a la der
    }

    return {
      cx: x,
      cy: (gridRow - 1) * ROW_H + ROW_H / 2
    };
  };

  let d = '';
  const r = 1.5;

  for (let i = 0; i < count - 1; i++) {
    const p1 = getCenter(i);
    const p2 = getCenter(i + 1);

    if (i === 0) d += `M ${p1.cx} ${p1.cy} `;

    if (p2.cx > p1.cx) {
      // Movimiento hacia la DERECHA y ABAJO
      d += `L ${p2.cx - r} ${p1.cy} `; // Línea horizontal recta
      d += `A ${r} ${r} 0 0 1 ${p2.cx} ${p1.cy + r} `; // Codo suave hacia abajo
      d += `L ${p2.cx} ${p2.cy} `; // Línea vertical recta hasta el nodo
    } else {
      // Movimiento hacia la IZQUIERDA y ABAJO
      d += `L ${p2.cx + r} ${p1.cy} `; // Línea horizontal recta
      d += `A ${r} ${r} 0 0 0 ${p2.cx} ${p1.cy + r} `; // Codo suave hacia abajo
      d += `L ${p2.cx} ${p2.cy} `; // Línea vertical recta hasta el nodo
    }
  }
  return d;
}

export const BridgeSvgMobile: React.FC<Props> = ({ count, svgClass }) => {
  const pathD = buildMobileBridgePath(count);
  const vbW = MOBILE_COLS * COL_W;
  const vbH = count * ROW_H;

  return (
    <svg className={svgClass} viewBox={`0 0 ${vbW} ${vbH}`} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d={pathD} className={css['bridge-path-outer']} />
      <path d={pathD} className={css['bridge-path-inner']} />
    </svg>
  );
};
