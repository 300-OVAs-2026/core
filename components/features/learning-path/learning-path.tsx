import { Audio } from 'books-ui';

import { Content } from '@layouts';
import { useOvaStore } from '@/store/ova-store';

import { Avatar } from '../avatar';

import { BridgeSvg } from './learning-bridge-svg';
import { BridgeSvgMobile } from './learning-bridge-svg-mobile';
import { PageNode } from './learning-node';
import { DESKTOP, i18n, TABLET } from './lib/constants';
import { getAllPositions } from './lib/get-all-positionts';

import { AvatarVariation } from '../avatar/types/type';

import css from './learning-path.module.css';

export const LearningPath = () => {
  const pages = useOvaStore((state) => state.pages);
  const lang = useOvaStore((state) => state.lang);

  if (!pages || pages.length === 0) return null;

  return (
    <Content
      withOutTitle
      interpreter={{
        contentURL: 'content/learning-path.mp4',
        a11yURL: 'descriptives/learning-path-a11y.mp4'
      }}>
      <div className={css['learning-path']}>
        <div className={css['learning-path__avatar']}>
          <Avatar variation={AvatarVariation.GREETING} size="28.125rem" title={i18n[lang].avatar} alt="Avatar." />
        </div>

        <nav className={css['learning-path__navigation']} aria-label="Mapa de aprendizaje">
          <div className="u-flow u-my-2">
            <Audio src="assets/audios/base/aud_des_learning-path.mp3" a11y />
            <Audio src="assets/audios/base/aud_learning-path.mp3" />
          </div>
          <p className={css['learning-path__intro']}>{i18n[lang].instruction}</p>
          <div className={css['learning-path__map']}>
            {/* Nodos */}
            <ol className={css['learning-path__list']}>
              {(() => {
                const lastVisitedIndex = pages.reduce((acc, p, i) => (p.visited ? i : acc), -1);
                return pages.map((page, i) => (
                  <li key={i} className={css['learning-path__item']} style={getAllPositions(i)}>
                    <PageNode page={{ ...page, counter: i + 1 }} isLocked={i > lastVisitedIndex + 1} />
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
