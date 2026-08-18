import { Panel } from '@layouts';
import { useOvaStore } from '@/store/ova-store';

import { BACKGROUND, i18n, TITLE } from './lib/constant';

import css from './game-basketball.module.css';

interface Props {
  section?: number;
}

export const GameBasketballInitial: React.FC<Props> = ({ section = 1 }) => {
  const lang = useOvaStore((state) => state.lang);

  const safeSrc = (rawSrc: string): string => rawSrc.replace(/\s/g, ''); // Elimina espacios en blanco accidentales
  const bg = safeSrc(BACKGROUND.cover); // Fondo de pantalla
  const cover = safeSrc(TITLE);

  return (
    <div className={css.radio__options} style={{ '--bg-image': `url("${bg}")` } as React.CSSProperties}>
      <div className={css.cover}>
        <img src={cover} alt="" />
        <div className={css.startButtonWrapper}>
          <Panel.Button section={section}>
            <button className={css['instructions__button']}>{i18n[lang]['start-button']}</button>
          </Panel.Button>
        </div>
      </div>
    </div>
  );
};