import { useEffect, useId } from 'react';

import { useTrueFalseContext } from './true-false-context';

import type { RadioStates } from './types/types';

import css from './true-false.module.css';

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

export const Option = ({ id, addClass, state, label, name, ...props }: Props) => {
  const reactId = useId();
  const { addRadiosValues, addRadioElementsId, validation, options } = useTrueFalseContext();

  const uid = id || reactId;
  const radioName = `radio-group-name-${name}`;

  const optionState = options.find((option) => option.id === uid)?.state;
  const dataState = validation ? (optionState ? STATES[optionState] : undefined) : undefined;

  /**
   * Maneja el evento onChange.
   */
  const handleChange = () => {
    addRadiosValues({ id: uid, name: radioName, state });
  };

  useEffect(() => {
    addRadioElementsId(uid);
  }, [uid, addRadioElementsId]);

  const gradientLeft = useId();
  const gradientRight = useId();

  return (
    <div className={css.wrapper}>
      {/* SVG izquierdo */}
      <svg className={css.leftBorder} viewBox="0 0 60 60">
        <defs>
          <linearGradient id={gradientLeft} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--linear-svg)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--white)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d="M30 0 L18 0 L0 18 L0 42 L18 60 L30 60 L30 0"
          stroke={`url(#${gradientLeft})`}
          strokeWidth="2"
          fill="none"
        />
      </svg>
    <div className={`${css['wrapper-radio']}  ${addClass ?? ''}`}>
      <label htmlFor={reactId}>{label}</label>
      <input
        data-state={dataState}
        name={name}
        id={reactId}
        onChange={handleChange}
        disabled={validation}
        {...(validation && { state: STATES[state] })}
        {...props}
        type="radio"
      />
    </div>

    {/* SVG derecho */}
      <svg className={css.rightBorder} viewBox="0 0 60 60">
        <defs>
          <linearGradient id={gradientRight} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--white)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--linear-svg)" stopOpacity="1" />
          </linearGradient>
        </defs>

        <path
          d="M30 0 L42 0 L60 18 L60 42 L42 60 L30 60 L30 0"
          stroke={`url(#${gradientRight})`}
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
    
  );
};
