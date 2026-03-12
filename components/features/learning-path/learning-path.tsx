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
      <div className={css['container']}>
        <Avatar
          variation={AvatarVariation.GREETING}
          size="37.5rem"
          title="Imagen 1."
          addClass={css['avatar']}
          alt="Personas mirando una diana."
          noCaption
        />
        <nav className={css['navigation']} aria-label="Mapa de aprendizaje">
          <p className={css['navigation__intro']}>
            ¡Bienvenido! Este es tu mapa de aprendizaje. Completa cada sección en orden para avanzar y desbloquear
            nuevos contenidos. ¡Tú puedes lograrlo!
          </p>
          <div className={css['navigation__block']}>
            {/* Nodos */}
            <ol className={css['list-wrapper']}>
              {(() => {
                const lastVisitedIndex = pages.reduce((acc, p, i) => (p.visited ? i : acc), -1);
                return pages.map((page, i) => (
                  <li key={i} className={css['list-item']} style={getAllPositions(i)}>
                    <PageNode page={page} isLocked={i > lastVisitedIndex + 1} />
                  </li>
                ));
              })()}
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
      </div>
    </Content>
  );
};
