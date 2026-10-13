import { Children, isValidElement, type ReactNode, useId } from 'react';

import { useOvaStore } from '@/store/ova-store';

import { GameFishPositionContext, useGameFishActivityContext } from './game-fish-context';
import { GameParallax } from './game-parallax';
import { BG, i18n } from './lib/constant';

import css from './game-fish.module.css';

interface Props {
  children: ReactNode;
  label: string;
}

export const GameFishLevel = ({ children, label }: Props) => {
  const { selectedLabel, validation, result } = useGameFishActivityContext();
  const lang = useOvaStore((state) => state.lang);
  const questionId = useId();

  const renderQuestion = () => {
    // Si la etiqueta no contiene el marcador de completar, se muestra normal
    if (!label.includes('___')) return <strong>{label}</strong>;

    const parts = label.split('___');
    return (
      <strong>
        {parts[0]}
        <span className={css['fill-blank']}>
          {selectedLabel || (
            <>
              <span aria-hidden="true">____</span>
              <span className="u-sr-only">{i18n[lang]['blank-space']}</span>
            </>
          )}
        </span>
        {parts[1]}
      </strong>
    );
  };

  return (
    <div className={css['init-container']}>
      <GameParallax />
      <div className={css['init-content']}>
        <div className={css['init-message-box']}>
          <img src={BG.ancla} className={css['anchor-icon']} alt="" />
          <div id={questionId} className={css['question-text']}>
            {renderQuestion()}
          </div>
          <img src={BG.ancla} className={css['anchor-icon']} alt="" />
        </div>

        {/* Región viva siempre montada para que el lector de pantalla anuncie el resultado */}
        <p role="status" className="u-sr-only">
          {validation ? (result ? i18n[lang]['answer-correct'] : i18n[lang]['answer-wrong']) : ''}
        </p>

        <div role="radiogroup" aria-labelledby={questionId} className={css['fish-elements-wrapper']}>
          {Children.toArray(children).map((child, index) => (
            <GameFishPositionContext.Provider key={isValidElement(child) ? child.key : index} value={index + 1}>
              {child}
            </GameFishPositionContext.Provider>
          ))}
        </div>
      </div>
    </div>
  );
};
