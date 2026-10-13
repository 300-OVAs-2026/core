import { useContext, useId, useMemo, useRef } from 'react';

import { useOvaStore } from '@/store/ova-store';

import { GameFishPositionContext, useGameFishActivityContext } from './game-fish-context';
import { BG, i18n } from './lib/constant';

import type { GameFishStates } from './types/types';

import css from './game-fish.module.css';

interface Props {
  label: string;
  id: string;
  name: string;
  state: GameFishStates;
}

const fishState = { count: 0 };

export const GameFishElement = ({ label, id, name, state }: Props) => {
  const { addSelectedOption, options, validation } = useGameFishActivityContext();
  const fishNumber = useRef<number | null>(null);
  const position = useContext(GameFishPositionContext);
  const lang = useOvaStore((state) => state.lang);
  const inputId = useId();
  const feedbackId = useId();

  if (fishNumber.current === null) {
    // Esto genera un número del 1 al 7
    fishState.count = (fishState.count % 7) + 1;
    fishNumber.current = fishState.count;
  }

  // Verifica si este pez específico es el seleccionado
  const isSelected = useMemo(() => options.some((opt) => opt.id === id), [options, id]);

  // Verifica si el usuario ya hizo clic en cualquier pez del nivel
  const isAnythingSelected = options.length > 0;

  // Tras validar, solo el pez elegido muestra (y anuncia) si fue correcto o no
  const showFeedback = validation && isSelected;

  const getStatusClass = () => {
    // LÓGICA DE ESCALA DE GRISES:
    // Si hay algo seleccionado pero NO es este pez, aplicamos la clase de gris
    if (isAnythingSelected && !isSelected) {
      return css['is-not-selected'];
    }

    // LÓGICA DE VALIDACIÓN (Tu código original):
    if (!validation) return isSelected ? css.selected : '';

    if (isSelected && state === 'success') return css.success;
    if (isSelected && state === 'wrong') return css.wrong;

    return '';
  };

  return (
    <div className={css['fishs-element-container']}>
      <input
        type="radio"
        id={inputId}
        name={`fish-${name}`}
        className={css['fish-radio']}
        checked={isSelected}
        // Se puede cambiar de pez hasta que se valida la respuesta
        disabled={validation}
        onChange={() => addSelectedOption({ id, name, state, label })}
        aria-label={position ? `${i18n[lang]['fish-number']} ${position}, ${label}` : label}
        aria-describedby={showFeedback ? feedbackId : undefined}
      />

      <label htmlFor={inputId} className={`${css['fish-item']} ${getStatusClass()}`}>
        <img src={BG.peces[fishNumber.current - 1]} className={css['fish-image']} alt="" />

        <span className={css['fish-answer-box']}>
          {/* Iconos de validación en la esquina (el estado se anuncia con el texto oculto) */}
          {showFeedback && (
            <span className={css['status-icon']} aria-hidden="true">
              {state === 'success' ? (
                <span className={css['icon-check']}>✔</span>
              ) : (
                <span className={css['icon-x']}>✖</span>
              )}
            </span>
          )}
          <span>{label}</span>
        </span>
      </label>

      {showFeedback && (
        <span id={feedbackId} className="u-sr-only">
          {state === 'success' ? i18n[lang]['answer-correct'] : i18n[lang]['answer-wrong']}
        </span>
      )}
    </div>
  );
};
