import { useEffect, useReducer, useRef } from 'react';

import { INITIAL_STATE } from './lib/constant';
import { OrderPhraseButton } from './order-phrase-button';
import { OrderPhraseActivityProvider } from './order-phrase-context';
import { OrderPhraseElement } from './order-phrase-element';

import type { InitialState, SentenceItem, SentenceState } from './types/types';

interface Props {
  children: JSX.Element | JSX.Element[];
  onResult?: ({ result, options }: { result: boolean; options: SentenceItem[] }) => void;
}

type SubComponents = {
  Button: typeof OrderPhraseButton;
  sentence: typeof OrderPhraseElement;
};

const OrderPhraseActivity: React.FC<Props> & SubComponents = ({ children, onResult }) => {
  const [activity, updatedActivity] = useReducer(
    (prev: InitialState, next: Partial<InitialState>) => ({ ...prev, ...next }),
    INITIAL_STATE
  );

  // Referencia mutable para almacenar las sentences registradas por cada OrderPhraseElement
  const sentencesRef = useRef<SentenceItem[]>([]);

  // Ref para acumular sentenceStates de forma síncrona, evitando el problema
  // de closure stale cuando múltiples OrderPhraseElement se registran al mismo tiempo
  const sentenceStatesRef = useRef<Record<number, SentenceState>>({});

  /**
   * Observa los cambios en sentenceStates para habilitar el botón
   * de validación en cuanto se realice cualquier movimiento.
   */
  useEffect(() => {
    const registered = sentencesRef.current;

    if (!registered.length) return;
    if (activity.validation) return;
    if (!activity.button) return;

    const anyMoved = registered.some((s) => {
      const current = activity.sentenceStates[s.id]?.order;
      return current && current.join(' ') !== s.words.join(' ');
    });

    if (anyMoved) {
      updatedActivity({ button: false });
    }
  }, [activity.sentenceStates, activity.validation, activity.button]);

  /**
   * Registra una sentence desde el OrderPhraseElement.
   * Usa sentenceStatesRef para acumular todos los estados de forma síncrona,
   * evitando que registros simultáneos se sobreescriban entre sí por closure stale.
   *
   * @param {SentenceItem} sentence - La oración a registrar.
   */
  const registerSentence = (sentence: SentenceItem): void => {
    if (sentencesRef.current.some((s) => s.id === sentence.id)) return;

    sentencesRef.current = [...sentencesRef.current, sentence];

    sentenceStatesRef.current = {
      ...sentenceStatesRef.current,
      [sentence.id]: {
        order: sentence.words,
        checked: false,
        correct: null
      }
    };

    updatedActivity({ sentenceStates: sentenceStatesRef.current });
  };

  /**
   * Mueve una palabra de una posición a otra dentro de una oración.
   *
   * @param {number} sentenceId - ID de la oración
   * @param {number} fromIdx - Índice origen
   * @param {number} toIdx - Índice destino
   */
  const moveWord = (sentenceId: number, fromIdx: number, toIdx: number): void => {
    const order = [...activity.sentenceStates[sentenceId].order];
    const [moved] = order.splice(fromIdx, 1);
    order.splice(toIdx, 0, moved);

    updatedActivity({
      sentenceStates: {
        ...activity.sentenceStates,
        [sentenceId]: { ...activity.sentenceStates[sentenceId], order }
      }
    });
  };

  /**
   * Valida todas las oraciones registradas comparando
   * el orden actual contra la respuesta correcta (string).
   * Llama a `onResult` con el resultado global si se proporcionó.
   */
  const handleValidation = (): void => {
    let allCorrect = true;
    const updatedStates = { ...activity.sentenceStates };

    sentencesRef.current.forEach((s) => {
      const correct = updatedStates[s.id].order.join(' ') === s.answer;
      if (!correct) allCorrect = false;
      updatedStates[s.id] = { ...updatedStates[s.id], checked: true, correct };
    });

    if (onResult) {
      onResult({ result: allCorrect, options: sentencesRef.current });
    }

    updatedActivity({
      sentenceStates: updatedStates,
      validation: true,
      button: true,
      result: allCorrect
    });
  };

  /**
   * Reinicia la actividad a su estado inicial.
   */
  const handleReset = (): void => {
    sentencesRef.current = [];
    sentenceStatesRef.current = {};
    updatedActivity(INITIAL_STATE);
  };

  return (
    <OrderPhraseActivityProvider
      value={{ ...activity, registerSentence, moveWord, handleValidation, handleReset }}
    >
      {children}
    </OrderPhraseActivityProvider>
  );
};

OrderPhraseActivity.Button = OrderPhraseButton;
OrderPhraseActivity.sentence = OrderPhraseElement;

export { OrderPhraseActivity };