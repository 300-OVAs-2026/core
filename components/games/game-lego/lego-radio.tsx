import type { FC } from 'react';
import { useEffect, useId, useMemo } from 'react';

import { useGameLegoContext } from './game-lego-context';
import { LEGO, LEGO_CORRECT, LEGO_WRONG } from './lib/constant';
import { parseLabel } from './lib/parse-label';

import type { RadioStates } from './types/types';

import css from './game-lego.module.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  addClass?: string;
  label: string;
  state: RadioStates;
}

export const LegoRadio: FC<Props> = ({ id, addClass, state, label, name, ...props }) => {
  const reactId = useId();

  const { addOptionValues, addOptionElementsId, validation, options } = useGameLegoContext();

  const uid = id || reactId;
  const radioName = `radio-group-lego-${name}`;

  const { letter, text } = useMemo(() => parseLabel(label), [label]);

  const safeSrc = (rawSrc: string): string => rawSrc.replace(/\s/g, ''); // Elimina espacios en blanco accidentales

  // Selected sale del CONTEXTO
  const isSelected = useMemo(() => {
    return options?.some((opt) => opt.name === radioName && opt.id === uid);
  }, [options, radioName, uid]);

  // Obtener lego del CONTEXTO
  const lego = validation
    ? isSelected
      ? state === 'success'
        ? safeSrc(LEGO_CORRECT)
        : safeSrc(LEGO_WRONG)
      : safeSrc(LEGO)
    : LEGO;

  /**
   * Maneja el evento onChange.
   */
  const handleChange = () => {
    addOptionValues({ id: uid, name: radioName, state });
  };

  /**
   * Maneja el evento onChange.
   */
  useEffect(() => {
    addOptionElementsId(uid);
  }, [uid, addOptionElementsId]);

  /**
   * Obtiene la clase CSS para un botón según su estado y si está seleccionado.
   * @returns {string} La clase CSS correspondiente
   */
  const getLabelClass = (state: 'success' | 'wrong') => {
    if (validation) return css.disabled;
    if (isSelected) return css.focused;
    return `${css.option} ${state === 'success' ? css.success : css.wrong}`;
  };

  return (
    <div
      className={`${css.option} ${addClass ?? ''} ${getLabelClass(state)}`}
      style={{ '--bg-image': `url(${lego})` } as React.CSSProperties}>
      <input
        {...props}
        type="radio"
        id={uid}
        value={uid}
        name={radioName}
        disabled={validation}
        className={css.radioOption}
        checked={isSelected}
        onChange={handleChange}
      />
      <label htmlFor={uid} className={css.button}>
        {letter && (
          <span className={css['circle']} data-id="letter">
            {letter}
          </span>
        )}
        <span dangerouslySetInnerHTML={{ __html: text }} />
      </label>
    </div>
  );
};
