import { ButtonHTMLAttributes, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';

import { SpaceResult } from './types/types';
import { BALLONS } from './const';

import css from './game-balloons.module.css';

export interface GameBalloonsElementProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  balloonRole: number; // <- antes "role"
  letter: string;
  index: string;
  enable: boolean;
  onResult?: (result: SpaceResult) => void;
}

export const GameBalloonsElement: React.FC<GameBalloonsElementProps> = ({
  balloonRole = 0,
  letter = 'A',
  index = 'hasdh767803h',
  enable = true,
  onResult,
  ...props
}) => {
  const refWord = useRef<HTMLDivElement>(null);

  const balloonList = useMemo(() => Object.values(BALLONS), []); // Array de globos
  const balloonSrc = balloonList[balloonRole % balloonList.length]; // Selección de globo según role

  /**
   * Efecto que se encarga de animar
   * la entrada y salida de los globos.
   */
  useEffect(() => {
    if (!refWord.current) return;

    const animationProps = enable
      ? { y: 0, opacity: 1, duration: 1 }
      : { ease: 'power3.in', y: 90, opacity: 0, duration: 0.7 };

    gsap.to(refWord.current, {
      ...animationProps,
      onComplete: () => onResult?.({ index, letter })
    });
  }, [enable, index, letter, onResult]);

  return (
    <button
      {...props}
      className={css.container}
      style={{ animationDelay: `${balloonRole * 0.5}s` }}
      aria-label={letter}
      disabled={!enable}
      type={props.type ?? 'button'}
    >
      <div className={css.container__responsive}>
        <img src={balloonSrc} alt="" />
        <div ref={refWord} className={css.letter}>
          <p>{letter}</p>
        </div>
      </div>
    </button>
  );
};
