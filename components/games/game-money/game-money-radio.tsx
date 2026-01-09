import { useEffect, useId, useMemo } from 'react';

import { RadioStates } from './types/types';
import { useGameMoneyActivityContext } from './game-money-context';

import css from './game-money.module.css';

const STATES: Partial<Record<RadioStates, 'wrong' | 'right'>> = {
  wrong: 'wrong',
  success: 'right'
};

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  addClass?: string;
  label: string;
  state: RadioStates;
}

export const GameMoneyRadio: React.FC<Props> = ({ id, addClass, state, label, ...props }) => {
  const reactId = useId();
  const { addSelectedOption, addRadioElementsId, validation, options } = useGameMoneyActivityContext();

  const uid = id || reactId;
  const radioName = `game-money-radio-${name}`;

  /**
   * Verifica si el elemento radio esta seleccionado.
   */
  const isSelected = useMemo(() => {
    return options?.some((opt) => opt.name === radioName && opt.id === uid);
  }, [options, radioName, uid]);


  /**
   * Maneja el evento onChange.
   */
  const handleChange = () => {
    addSelectedOption({ id: uid, name: radioName, state });
  };

  
/**
 * Devuelve una cadena con las clases CSS para un elemento radio
 * dependiendo de si está seleccionado, si es válido o no, y si es correcto o no.
 * @returns {string} La cadena con las clases CSS
 */
  const getClassName = () => {
    return [
      css['option-button'],
      addClass ?? '',
      isSelected ? css['selected'] : '',
      validation && isSelected && state === 'success' ? css['correct'] : '',
      validation && isSelected && state === 'wrong' ? css['incorrect'] : ''
    ].join(' ');
  };

  /**
   * Añade un ID de elemento radio al estado de la actividad.
   * Si el ID no está presente en el array `radioElementsId`, lo agrega.
   */
  useEffect(() => {
    addRadioElementsId(uid);
  }, [uid, addRadioElementsId]);

  return (
    <div
      className={getClassName()}
      onClick={() => !validation && handleChange()}
      data-option-id={uid}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (validation) return;
        if (e.key === 'Enter' || e.key === ' ') handleChange();
      }}>
      <input
        type="radio"
        id={uid}
        name={radioName}
        className={css['radio']}
        onChange={handleChange}
        checked={isSelected}
        disabled={validation}
        {...(validation && { state: STATES[state] })}
        {...props}
      />
      <label htmlFor={uid} className="u-font-bold">
        {label}
      </label>
    </div>
  );
};
