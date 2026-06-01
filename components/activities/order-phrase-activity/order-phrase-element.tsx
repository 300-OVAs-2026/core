import { useEffect, useRef, useState } from 'react';

import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

import { useOrderPhraseActivityContext } from './order-phrase-context';

import type { SentenceItem } from './types/types';

import css from './order-phrase.module.css';

interface Props {
  sentence: SentenceItem;
}

interface ChipData {
  sentenceId: number;
  idx: number;
}

const CHIP_KEY = 'order-phrase-chip';

export const OrderPhraseElement: React.FC<Props> = ({ sentence }) => {
  const { sentenceStates, registerSentence, moveWord } = useOrderPhraseActivityContext();

  /**
   * Registra la sentence en el contexto al montar el componente.
   */
  useEffect(() => {
    registerSentence(sentence);
  }, [sentence, registerSentence]);

  const sentenceState = sentenceStates[sentence.id];

  if (!sentenceState) return null;

  const { order, checked, correct } = sentenceState;

  const chipVariant = !checked ? css.chipDefault : correct ? css.chipCorrect : css.chipIncorrect;

  return (
    <div className={css.chipsRow}>
      {order.map((word, idx) => (
        <OrderPhraseChip
          key={`${sentence.id}-${idx}`}
          word={word}
          idx={idx}
          sentenceId={sentence.id}
          checked={checked}
          chipVariant={chipVariant}
          onMove={moveWord}
        />
      ))}
    </div>
  );
};

interface ChipProps {
  word: string;
  idx: number;
  sentenceId: number;
  checked: boolean;
  chipVariant: string;
  onMove: (sentenceId: number, fromIdx: number, toIdx: number) => void;
}

const OrderPhraseChip: React.FC<ChipProps> = ({ word, idx, sentenceId, checked, chipVariant, onMove }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || checked) return;

    return combine(
      draggable({
        element: el,
        getInitialData: () => ({ [CHIP_KEY]: true, sentenceId, idx } satisfies ChipData & { [key: string]: unknown }),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false)
      }),
      dropTargetForElements({
        element: el,
        canDrop: ({ source }) => source.data[CHIP_KEY] === true && source.data.sentenceId === sentenceId,
        onDragEnter: () => setIsOver(true),
        onDragLeave: () => setIsOver(false),
        onDrop: ({ source }) => {
          setIsOver(false);
          const fromIdx = source.data.idx as number;
          if (fromIdx !== idx) {
            onMove(sentenceId, fromIdx, idx);
          }
        }
      })
    );
  }, [checked, idx, sentenceId, onMove]);

  return (
    <div
      ref={ref}
      className={`${css.chip} ${chipVariant} ${isDragging ? css.chipDragging : ''} ${isOver ? css.chipOver : ''}`}
      role="button"
      tabIndex={checked ? -1 : 0}
      aria-label={word}
    >
      {word}
    </div>
  );
};