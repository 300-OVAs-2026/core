import { useEffect, useId, useState } from 'react';

import { RadioStates } from './types/types';
import { useGameQuestionContext } from './game-question-context';

import css from './game-question.module.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  addClass?: string;
  label: string;
  state: RadioStates;
}

export const GameQuestionRadio: React.FC<Props> = ({ id, addClass, state, label, name, ...props }) => {
  const reactId = useId();

  const { addRadiosValues, addElementsId, validation } = useGameQuestionContext();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const uid = id || reactId;
  const radioName = `radio-group-question-${name}`;

  /**
   * Maneja el evento onChange.
   */
  useEffect(() => {
    addElementsId(uid);
  }, [uid, addElementsId]);

  /**
   * Devuelve una cadena con las clases CSS para un elemento radio
   * dependiendo de si está seleccionado, si es valido o no, y si es correcto o no.
   * @param inputId - ID del input
   * @param state - Estado del input
   * @returns 
   */
  const getLabelClass = (inputId: string, state: 'success' | 'wrong') => {
    if (!validation || selectedId !== inputId) return css.button;
    return `${css.button} ${state === 'success' ? css.success : css.wrong}`;
  };


  return (
    <div className={`${validation ? css.disabled : ''} ${addClass ?? ''}`}>
      <input
        {...props}
        type="radio"
        id={uid}
        value={uid}
        name={radioName}
        disabled={validation}
        className={css.radioOption}
        checked={selectedId === uid}
        onChange={() => {
          setSelectedId(uid);
          addRadiosValues({ id: uid, name: radioName, state });
        }}
      />
      <label htmlFor={uid} className={getLabelClass(uid, state)}>
        {label}
      </label>
    </div>
  );
};
