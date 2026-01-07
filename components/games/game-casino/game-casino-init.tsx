import React, { useState } from 'react';
import { Panel as PanelUI } from 'books-ui';

import { useOvaContext } from '@/context/ova-context';

import { loadCSS } from '../../utils/loadCSS';

import { i18n } from './const';

const css = await loadCSS({
  ui: 'game-casino/game-casino.module.css',
  local: 'game-casino/game-casino.module.css'
});

interface GameCasinoInitProps {
  className?: string;
  textInit?: string;
  alt?: string;
  title?: string;
}

export const GameCasinoInit: React.FC<GameCasinoInitProps> = ({
  textInit = 'Responde correctamente cinco preguntas y gana algo de dinero.',
  className,
  alt,
  title
}) => {
  const { lang } = useOvaContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsOpen(false);
    }
  };

  return (
    <figure className='u-flow'>
      <svg
        {...(className && { className })}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 1067 500">
        <image
          width={1068}
          height={501}
          xlinkHref="assets/images/game-casino-01.webp"
          transform="translate(-.84 -.671)"
          overflow="visible"
        />
        <image
          width={203}
          height={68}
          xlinkHref="assets/images/game-casino-02.webp"
          transform="translate(552.16 310.329)"
          overflow="visible"
        />
        <defs>
          <path id="a" d="M0 0H1067V500H0z" />
        </defs>
        <use xlinkHref="#a" overflow="visible" fill="#00b580" />
        <clipPath>
          <use xlinkHref="#a" overflow="visible" />
        </clipPath>
        <image
          width={1068}
          height={501}
          xlinkHref="assets/images/game-casino-03.webp"
          transform="translate(-.84 -.671)"
          overflow="visible"
        />

        {!isOpen && (
          <g>
            <image
              width={454}
              height={170}
              xlinkHref="assets/images/game-casino-13.webp"
              transform="translate(286.16 311.329)"
              overflow="visible"
            />

            <foreignObject width={300} height={100} x={400} y={320}>
              <p className="u-text-center" style={{ color: 'white', fontWeight: 'bold' }}>
                {textInit}
              </p>
            </foreignObject>
            <image
              width={561}
              height={283}
              xlinkHref="assets/images/game-casino-14.webp"
              transform="translate(271.16 15.329)"
              overflow="visible"
            />

            <text
              width={400}
              height={100}
              x={460}
              y={170}
              fill="#fff"
              fontSize={60}
              fontWeight={700}
              style={{ textTransform: 'uppercase' }}>
              Casino
            </text>
          </g>
        )}
        {isOpen && (
          <g>
            <image
              width={620}
              height={301}
              xlinkHref="assets/images/game-casino-15.webp"
              transform="translate(230.16 75.329)"
              overflow="visible"
            />
          </g>
        )}

        {!isOpen && (
          <foreignObject width={300} height={100} x={530} y={370}>
            <div
              className={css['button-init']}
              style={{ color: 'white', textTransform: 'uppercase', fontWeight: 'bold' }}>
              <button onClick={() => setIsOpen(true)}>{i18n[lang].play}</button>
            </div>
          </foreignObject>
        )}

        {isOpen && (
          <foreignObject width="580" height="120" x="250" y="247" style={{ color: 'white' }}>
            <div className="u-text-center u-flow">
              <p>{i18n[lang].text}</p>
              <PanelUI.Button section={1}>
                <button aria-label="Continuar" className={`u-font-bold ${css['button-init-game']}`}>
                  ¡{i18n[lang].goodLuck}!
                </button>
              </PanelUI.Button>
            </div>
          </foreignObject>
        )}

        {isOpen && (
          <g
            role="button"
            tabIndex={0}
            aria-label="Cerrar modal."
            onKeyDown={handleKeyDown}
            onClick={() => setIsOpen(false)}>
            <image
              width={50}
              height={50}
              xlinkHref="assets/images/game-casino-05.webp"
              transform="translate(817.16 65.329)"
              overflow="visible"
            />
          </g>
        )}
      </svg>
      {alt || title ? (
        <figcaption className={css['casino-figcaption']}>
          <p>
            <strong>{title}</strong>&nbsp;{alt}
          </p>
        </figcaption>
      ) : null}
    </figure>
  );
};
