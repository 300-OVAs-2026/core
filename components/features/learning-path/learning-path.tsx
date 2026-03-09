import type { CSSProperties } from 'react';

import { useOvaContext } from '@/context/ova-context';

import css from './learning-path.module.css';

type PageType = 'inicio' | 'fin' | 'contenido';

// Configuración de breakpoints
// desktop: 4 items/fila, 6 cols | tablet: 2 items/fila, 4 cols | mobile: zigzag 2 cols
const DESKTOP = { itemsPerRow: 4, totalCols: 6 };
const TABLET = { itemsPerRow: 2, totalCols: 4 };

/**
 * Calcula row/col para un layout S-shape dado itemsPerRow y totalCols.
 * Estructura:
 *   - Col 1            → giro izquierdo
 *   - Cols 2…(n-1)    → items en línea
 *   - Col totalCols    → giro derecho
 *   - Filas impares    → items en línea
 *   - Filas pares      → item de giro (esquina)
 */
function calcPosition(index: number, itemsPerRow: number, totalCols: number): { gridRow: number; gridColumn: number } {
  const segmentSize = itemsPerRow + 1;
  const segmentIndex = Math.floor(index / segmentSize);
  const posInSegment = index % segmentSize;
  const isForward = segmentIndex % 2 === 0;

  if (posInSegment < itemsPerRow) {
    return {
      gridRow: segmentIndex * 2 + 1,
      gridColumn: isForward
        ? posInSegment + 2 // 2, 3, …, itemsPerRow+1
        : itemsPerRow + 1 - posInSegment // inverso
    };
  }

  // Item de giro (esquina del S)
  return {
    gridRow: segmentIndex * 2 + 2,
    gridColumn: isForward ? totalCols : 1
  };
}

/** Devuelve las posiciones para los tres breakpoints como CSS custom properties. */
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

export const LearningPath = () => {
  const { routes } = useOvaContext();

  if (!routes || routes.length === 0) return null;

  return (
    <nav className={css['navigation']}>
      <div className={css['navigation__block']}>
        <ol className={css['list-wrapper']}>
          {routes.map((route, i) => (
            <li key={i} className={css['list-item']} style={getAllPositions(i)}>
              <PageNode type={getType(i, routes.length)} title={route} />
            </li>
          ))}
        </ol>
        {/* TODO: bridge-wrapper — conectores entre nodos */}
        <div className={css['bridge-wrapper']} />
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
      <div className={css.iconContainer}>{getIcon()}</div>
      <p className={css.title}>{title}</p>
    </a>
  );
};
