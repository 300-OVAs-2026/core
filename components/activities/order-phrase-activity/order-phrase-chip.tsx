import { useEffect, useRef, useState } from 'react';

import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

import css from './order-phrase.module.css';

interface ChipProps {
  word: string;
  idx: number;
  sentenceId: number;
  total: number;
  checked: boolean;
  chipVariant: string;
  onMove: (sentenceId: number, fromIdx: number, toIdx: number) => void;
}

interface ChipData {
  sentenceId: number;
  idx: number;
}

const CHIP_KEY = 'order-phrase-chip';

export const OrderPhraseChip: React.FC<ChipProps> = ({
  word,
  idx,
  total,
  sentenceId,
  checked,
  chipVariant,
  onMove
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const handle = handleRef.current;
    if (!el || !handle || checked) return;

    return combine(
      draggable({
        element: el,
        getInitialData: () => ({ [CHIP_KEY]: true, sentenceId, idx }) satisfies ChipData & { [key: string]: unknown },
        onDragStart: () => {
          setIsDragging(true);
          setMenuOpen(false);
        },
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

  /**
   * Cierra el menú al hacer click fuera del chip.
   */
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  /**
   * Cierra el menú con Escape.
   */
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        handleRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const handleMenuMove = (toIdx: number): void => {
    setMenuOpen(false);
    onMove(sentenceId, idx, toIdx);
    handleRef.current?.focus();
  };

  const canMoveLeft = idx > 0;
  const canMoveRight = idx < total - 1;

  return (
    <div
      ref={ref}
      className={`${css.chip} ${chipVariant} ${isDragging ? css.chipDragging : ''} ${isOver ? css.chipOver : ''}`}
      aria-label={`Palabra: ${word}. Posición ${idx + 1} de ${total}`}>
      {!checked && (
        <button
          ref={handleRef}
          className={css.chipHandle}
          aria-label={`Opciones para mover "${word}"`}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}>
          ⋮
        </button>
      )}
      <span aria-hidden="true">{word}</span>

      {menuOpen && (
        <ul className={css.chipMenu} role="menu" aria-label={`Mover "${word}"`}>
          <li role="none">
            <button
              role="menuitem"
              disabled={!canMoveLeft}
              aria-disabled={!canMoveLeft}
              onClick={() => handleMenuMove(idx - 1)}>
              Mover a la izquierda
            </button>
          </li>
          <li role="none">
            <button
              role="menuitem"
              disabled={!canMoveRight}
              aria-disabled={!canMoveRight}
              onClick={() => handleMenuMove(idx + 1)}>
              Mover a la derecha
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};
