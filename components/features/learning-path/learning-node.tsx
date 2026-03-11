import { Icon } from '@ui';
import { Link } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';

import { getPageIcon } from '@/shared/utils/get-page-icon';

import type { OvaPageType } from '@/types/types';

import css from './learning-path.module.css';

interface Props {
  page: OvaPageType;
  isLocked: boolean;
}

export const PageNode: React.FC<Props> = ({ page, isLocked }) => {
  const [location] = useHashLocation();
  const isCurrent = location === page.path;

  if (isLocked) {
    return (
      <span
        role="img"
        className={`${css.pageNode}`}
        data-kind={page.kind}
        data-locked="true"
        aria-label={`${page.title} (bloqueado)`}>
        <div className={css.nodeVisual} aria-hidden="true">
          <div className={css.nodeRing}></div>
          <div className={css.iconContainer}>
            <Icon name="lock" />
          </div>
        </div>
      </span>
    );
  }

  return (
    <Link
      to={page.path}
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
