import React from 'react';

import { FullScreenAlert } from '@features/full-screen-alert';
import { FullScreenButton } from '@features/full-screen-button';

import { useRelationConceptActivityContext } from './relation-concept-activity-context';

import css from './relation-concept.module.css';

interface CardProps {
  addClass?: string;
  title?: string;
  pairs: { id: string; label: string; pair: number }[];
  showDivider?: boolean;
  dividerIndex?: number;
}

export const RelationConceptCard: React.FC<CardProps> = ({
  pairs,
  title,
  addClass,
  showDivider = false,
  dividerIndex = 8,
  ...props
}) => {
  const { addSelectedPair, selectedPairs, correctPairs, removeSelectedPair } = useRelationConceptActivityContext();

  /**
   * Verifica si el botón está validado (correcto o incorrecto)
   */
  const isValidated = (id: string) => {
    return correctPairs.some((pair) => pair.id === id);
  };

  /**
   * Maneja el evento de clic en una tarjeta.
   * @param id - ID de la tarjeta.
   * @param label - Texto de la tarjeta.
   * @param pair - Número de par de la tarjeta.
   */
  const handleClick = (id: string, label: string, pair: number) => {
    // Si ya está validado, no hacer nada
    if (isValidated(id)) {
      return;
    }

    // Verificar si ya está seleccionado
    const isAlreadySelected = selectedPairs.find((p) => p.id === id && p.label === label);

    if (isAlreadySelected) {
      // Si ya está seleccionado, deseleccionarlo
      removeSelectedPair(id);
    } else {
      // Si no está seleccionado, agregarlo
      addSelectedPair({ id, label, pair });
    }
  };

  /**
   * Obtiene el nombre de la clase CSS para una tarjeta específica basado en su estado.
   * @param id - ID de la tarjeta.
   * @param label - Texto de la tarjeta.
   * @returns Nombre de la clase CSS.
   */
  const getClassName = (id: string, label: string) => {
    const selected = selectedPairs.find((pair) => pair.id === id && pair.label === label);
    const correct = correctPairs.find((pair) => pair.id === id && !pair.isIncorrect);
    const incorrect = correctPairs.find((pair) => pair.id === id && pair.isIncorrect);

    if (selected) return `${css.card} ${css.selected}`;
    if (incorrect) return `${css.card} ${css.incorrect}`;
    if (correct) return `${css.card} ${css.correct}`;

    return `${css.card}`;
  };

  /**
   * Obtiene el valor del atributo data-id para una tarjeta específica basado en su estado.
   * @param id - ID de la tarjeta.
   * @param label - Texto de la tarjeta.
   * @returns Valor del atributo data-id.
   */
  const getDataId = (id: string, label: string) => {
    const selected = selectedPairs.find((pair) => pair.id === id && pair.label === label);
    const correct = correctPairs.find((pair) => pair.id === id && !pair.isIncorrect);
    const incorrect = correctPairs.find((pair) => pair.id === id && pair.isIncorrect);

    if (incorrect) return 'incorrect';
    if (correct) return 'correct';
    if (selected) return 'selected';
  };

  return (
    <>
      <FullScreenAlert />
      <div className={`${css['grid-wrapper']} ${addClass ?? ''}`} id="relation-concept">
        <FullScreenButton elementId="relation-concept" addClass={css['fullScreen__button']} />
        {title && (
          <div className={`${css['grid-title']}`}>
            <h2>{title}</h2>
          </div>
        )}
        <div className={`${css['grid-container']}`} data-id="card-container">
          {pairs.map((pair, index) => (
            <React.Fragment key={`${pair.id}-${index}`}>
              {showDivider && index === dividerIndex && <div className={css['divider-line']} />}

              <button
                key={pair.id}
                id={pair.id}
                onClick={() => handleClick(pair.id, pair.label, pair.pair)}
                className={`${getClassName(pair.id, pair.label)} ${css['grid-item']}`}
                data-id={getDataId(pair.id, pair.label)}
                disabled={isValidated(pair.id)}
                style={{ cursor: isValidated(pair.id) ? 'not-allowed' : 'pointer' }}
                {...props}>
                <span>
                  {/.(jpg|jpeg|png|svg|gif|webp)$/i.test(pair.label) ? (
                    <img src={pair.label} alt={`Opción ${pair.id}`} />
                  ) : (
                    pair.label
                  )}
                </span>
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};
