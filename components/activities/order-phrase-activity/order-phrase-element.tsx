import { useEffect } from 'react';

import { OrderPhraseChip } from './order-phrase-chip';
import { useOrderPhraseActivityContext } from './order-phrase-context';

import type { SentenceItem } from './types/types';

import css from './order-phrase.module.css';

interface Props {
  sentence: SentenceItem;
  addClass?: string;
}

export const OrderPhraseElement: React.FC<Props> = ({ sentence, addClass }) => {
  const { sentenceStates, registerSentence, moveWord, validation } = useOrderPhraseActivityContext();

  useEffect(() => {
    registerSentence(sentence);
  }, []);

  // Re-registra cuando el estado desaparece tras un reset
  useEffect(() => {
    if (!sentenceStates[sentence.id]) {
      registerSentence(sentence);
    }
  }, [sentenceStates, registerSentence, sentence]);

  const sentenceState = sentenceStates[sentence.id];

  if (!sentenceState) return null;

  const { order, checked, correct } = sentenceState;

  const chipVariant = !checked ? css.chipDefault : correct ? css.chipCorrect : css.chipIncorrect;

  const feedbackLabel = checked ? (correct ? 'Oración correcta' : 'Oración incorrecta') : undefined;

  return (
    <div
      className={`${css.chipsRow}${addClass ? ` ${addClass}` : ''}`}
      role="group"
      aria-label={`Oración ${sentence.id}${feedbackLabel ? `. ${feedbackLabel}` : ''}`}
      aria-disabled={validation}>
      {order.map((word, idx) => (
        <OrderPhraseChip
          key={`${sentence.id}-${idx}`}
          word={word}
          idx={idx}
          total={order.length}
          sentenceId={sentence.id}
          checked={checked}
          chipVariant={chipVariant}
          onMove={moveWord}
        />
      ))}
    </div>
  );
};
