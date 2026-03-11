import type { CSSProperties } from 'react';
import { Link } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';

import { useOvaContext } from '@/context/ova-context';
import { getPageIcon } from '@/shared/utils/get-page-icon';

import type { OvaPageType } from '@/types/types';

import css from './learning-path.module.css';

const DESKTOP = { itemsPerRow: 4, totalCols: 6 };
const TABLET = { itemsPerRow: 2, totalCols: 4 };

const COL_W = 10;
const ROW_H = 8;
const NODE_W = 5;
const MOBILE_COLS = 2;

function calcPosition(index: number, itemsPerRow: number, totalCols: number): { gridRow: number; gridColumn: number } {
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

function getAllPositions(index: number): CSSProperties {
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

// ── SVG: Función para construir la cadena 'd'(dibujo) del path SVG que conecta los nodos

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

interface BridgeSvgProps {
  count: number;
  itemsPerRow: number;
  totalCols: number;
  svgClass: string;
}

const BridgeSvg = ({ count, itemsPerRow, totalCols, svgClass }: BridgeSvgProps) => {
  const pathD = buildBridgePathString(count, itemsPerRow, totalCols);

  let maxRow = 1;
  for (let i = 0; i < count; i++) {
    maxRow = Math.max(maxRow, calcPosition(i, itemsPerRow, totalCols).gridRow);
  }

  const vbW = totalCols * COL_W;
  const vbH = maxRow * ROW_H;

  return (
    <svg
      className={svgClass}
      viewBox={`0 0 ${vbW} ${vbH}`}
      /* preserveAspectRatio="none" <- ELIMINADO: esto deformaba las curvas */
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true">
      {/*   <path d={pathD} className={css['bridge-path']} /> */}

      {/* 1. CAPA INFERIOR: Actúa como los bordes exteriores */}
      <path d={pathD} className={css['bridge-path-outer']} />

      {/* 2. CAPA SUPERIOR: Actúa como el relleno central */}
      <path d={pathD} className={css['bridge-path-inner']} />
    </svg>
  );
};

interface BridgeSvgMobileProps {
  count: number;
  svgClass: string;
}

const BridgeSvgMobile = ({ count, svgClass }: BridgeSvgMobileProps) => {
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
export const LearningPath = () => {
  const { pages } = useOvaContext();

  if (!pages || pages.length === 0) return null;

  return (
    <nav className={css['navigation']}>
      <div className={css['navigation__block']}>
        {/* Nodos */}
        <ol className={css['list-wrapper']}>
          {pages.map((page, i) => (
            <li key={i} className={css['list-item']} style={getAllPositions(i)}>
              <PageNode page={page} />
            </li>
          ))}
        </ol>

        {/* Capa SVG */}
        <div className={css['bridge-wrapper']}>
          <BridgeSvg
            count={pages.length}
            itemsPerRow={DESKTOP.itemsPerRow}
            totalCols={DESKTOP.totalCols}
            svgClass={css['bridge-svg-d']}
          />
          <BridgeSvg
            count={pages.length}
            itemsPerRow={TABLET.itemsPerRow}
            totalCols={TABLET.totalCols}
            svgClass={css['bridge-svg-t']}
          />
          <BridgeSvgMobile count={pages.length} svgClass={css['bridge-svg-m']} />
        </div>
      </div>
    </nav>
  );
};

/**
 * Componente PageNode para cada nodo del learning path
 */

const PageNode = ({ page }: { page: OvaPageType }) => {
  const [location] = useHashLocation();
  const isCurrent = location === page.path;

  return (
    <Link
      href={page.path}
      className={`${css.pageNode}`}
      data-kind={page.kind}
      aria-label={page.title}
      aria-current={isCurrent ? 'page' : undefined}>
      {/* Contenedor principal del círculo visual — oculto a lectores de pantalla */}
      <div className={css.nodeVisual} aria-hidden="true">
        {/* Capa 1: El anillo (las rayitas) */}
        <div className={css.nodeRing}></div>

        {/* Capa 2: El centro donde va el icono */}
        <div className={css.iconContainer}>{getPageIcon(page.kind)}</div>
      </div>
    </Link>
  );
};
