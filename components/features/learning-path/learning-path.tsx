import { Content } from '@layouts';

import { useOvaStore } from '@/store/ova-store';

import { Avatar } from '../avatar';

import { BridgeSvg } from './learning-bridge-svg';
import { BridgeSvgMobile } from './learning-bridge-svg-mobile';
import { PageNode } from './learning-node';
import { DESKTOP, TABLET } from './lib/constants';
import { getAllPositions } from './lib/get-all-positionts';

import { AvatarVariation } from '../avatar/types/type';

import css from './learning-path.module.css';

export const LearningPath = () => {
  const pages = useOvaStore((state) => state.pages);

  if (!pages || pages.length === 0) return null;

  return (
    <Content withOutTitle>
      <div className={css['learning-path']}>
        <div className={css['learning-path__avatar']}>
          <Avatar variation={AvatarVariation.GREETING} size="28.125rem" title="Figure." alt="Avatar."  />
        </div>

        <nav className={css['learning-path__navigation']} aria-label="Mapa de aprendizaje">
          <p className={css['learning-path__intro']}>
            ¡Bienvenido! Este es tu mapa de aprendizaje. Completa cada sección en orden para avanzar y desbloquear
            nuevos contenidos. ¡Tú puedes lograrlo!
          </p>
          <div className={css['learning-path__map']}>
            {/* Nodos */}
            <ol className={css['learning-path__list']}>
              {(() => {
                const lastVisitedIndex = pages.reduce((acc, p, i) => (p.visited ? i : acc), -1);
                return pages.map((page, i) => (
                  <li key={i} className={css['learning-path__item']} style={getAllPositions(i)}>
                    <PageNode page={page} isLocked={i > lastVisitedIndex + 1} />
                  </li>
                ));
              })()}
            </ol>

            {/* Capa SVG */}
            <div className={css['learning-path__bridge']}>
              <BridgeSvg
                count={pages.length}
                itemsPerRow={DESKTOP.itemsPerRow}
                totalCols={DESKTOP.totalCols}
                svgClass={css['learning-path__bridge-svg--desktop']}
              />
              <BridgeSvg
                count={pages.length}
                itemsPerRow={TABLET.itemsPerRow}
                totalCols={TABLET.totalCols}
                svgClass={css['learning-path__bridge-svg--tablet']}
              />
              <BridgeSvgMobile count={pages.length} svgClass={css['learning-path__bridge-svg--mobile']} />
            </div>
          </div>
        </nav>
      </div>
    </Content>
  );
};
