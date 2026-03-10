import type { CSSProperties } from 'react';

import { useOvaContext } from '@/context/ova-context';

import css from './learning-path.module.css';

type PageType = 'inicio' | 'fin' | 'contenido';

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

function getType(index: number, total: number): PageType {
  if (index === 0) return 'inicio';
  if (index === total - 1) return 'fin';
  return 'contenido';
}

// ── SVG: Función para construir la cadena 'd'(dibujo) del path SVG que conecta los nodos 

function buildBridgePathString(count: number, itemsPerRow: number, totalCols: number): string {
  if (count < 2) return '';

  // Función para obtener el CENTRO exacto de un nodo en unidades
const getCenter = (idx: number) => {
    const pos = calcPosition(idx, itemsPerRow, totalCols);
    return { 
      cx: (pos.gridColumn - 1) * COL_W + (COL_W / 2),
      cy: (pos.gridRow - 1) * ROW_H + (ROW_H / 2)
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

    let x = (gridColumn - 1) * COL_W + (NODE_W / 2);

    if (gridColumn === 1) {
      x = x + 1; // R
      // se resta para empujar la línea más a la izd
    } else {
      x = x + 4; // Se suma para empujar la línea más a la der
    }

    return {
      cx: x,
      cy: (gridRow - 1) * ROW_H + (ROW_H / 2)
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
      aria-hidden="true"
    >
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
    <svg
      className={svgClass}
      viewBox={`0 0 ${vbW} ${vbH}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d={pathD} className={css['bridge-path-outer']} />
      <path d={pathD} className={css['bridge-path-inner']} />
    </svg>
  );
};
export const LearningPath = () => {
  const { routes } = useOvaContext();

  if (!routes || routes.length === 0) return null;

  return (
    <nav className={css['navigation']}>
      <div className={css['navigation__block']}>
        {/* Nodos */}
        <ol className={css['list-wrapper']}>
          {routes.map((route, i) => (
            <li key={i} className={css['list-item']} style={getAllPositions(i)}>
              <PageNode type={getType(i, routes.length)} title={route} />
            </li>
          ))}
        </ol>
        
        {/* Capa SVG */}
        <div className={css['bridge-wrapper']}>
          <BridgeSvg
            count={routes.length}
            itemsPerRow={DESKTOP.itemsPerRow}
            totalCols={DESKTOP.totalCols}
            svgClass={css['bridge-svg-d']}
          />
          <BridgeSvg
            count={routes.length}
            itemsPerRow={TABLET.itemsPerRow}
            totalCols={TABLET.totalCols}
            svgClass={css['bridge-svg-t']}
          />
          <BridgeSvgMobile
            count={routes.length}
            svgClass={css['bridge-svg-m']}
          />
        </div>
      </div>
    </nav>
  );
};

/**
 * Componente PageNode para cada nodo del learning path
 */
interface PageNodeProps {
  type: PageType;
  title: string;
}

const PageNode = ({ type, title }: PageNodeProps) => {
  console.log(title);
  
  const getIcon = () => {
    switch (type) {
      case 'inicio':
        return (
          <svg className={css.icon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          </svg>
        );
      case 'fin':
        return (
          <svg className={css.icon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        );
      case 'contenido':
      default:
        return (
          <svg className={css.icon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
          </svg>
        );
    }
  };

  return (
    <a href="#" className={`${css.pageNode} ${css[type]}`}>
       {/* Contenedor principal del círculo visual */}
      <div className={css.nodeVisual}>
        
        {/* Capa 1: El anillo (las rayitas) */}
        <div className={css.nodeRing}></div>
        
        {/* Capa 2: El centro donde va el icono */}
        <div className={css.iconContainer}>
          {getIcon()}
        </div>
        
      </div>
    </a>
  );
};
