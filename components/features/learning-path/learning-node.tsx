import { Icon } from '@ui';
import { Tooltip } from 'books-ui';
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
        className={css['learning-path__node']}
        data-kind={page.kind}
        data-locked="true"
        aria-label={`${page.title} (bloqueado)`}>
        <div className={css['learning-path__node-visual']} aria-hidden="true">
          <div className={css['learning-path__node-ring']}></div>
          <div className={css['learning-path__node-icon']}>
            <Icon name="lock" />
          </div>
        </div>
      </span>
    );
  }

  return (
    <Tooltip label={page.title} placement="top" addClass={css['learning-path__tooltip']} hasArrow distance={13}>
      <Link
        to={page.path}
        className={css['learning-path__node']}
        data-kind={page.kind}
        aria-label={page.title}
        aria-current={isCurrent ? 'page' : undefined}>
        {/* Contenedor principal del círculo visual — oculto a lectores de pantalla */}
        <div className={css['learning-path__node-visual']} aria-hidden="true">
          {/* Capa 1: El anillo (las rayitas) */}
          <div className={css['learning-path__node-ring']}></div>

          {/* Capa 2: El centro donde va el icono */}
          <div className={css['learning-path__node-icon']}>{getPageIcon(page.kind)}</div>
        </div>
      </Link>
    </Tooltip>
  );
};
