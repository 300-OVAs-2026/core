import { useEffect, useId } from 'react';

import { useGameMillionContext } from './game-million-context';
import { CorrectIcon, WrongIcon } from './icons_/icons';

import css from './game-millions.module.css';

type GameMillionElementProps = {
  id: string;
  label: string;
  state: 'success' | 'wrong';
  name: string;
};

export const GameMillionElement = ({ id, state, label, name, ...props }: GameMillionElementProps) => {
  const reactId = useId();
  const { activity, handleStateClass, addRadioElementsId, addRadiosValues, handleChange } = useGameMillionContext();

  const uid = id || reactId;
  const radioName = `radio-group-${name}`;

  /**
   * Maneja el evento onChange.
   */
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    addRadiosValues({ id: uid, name: radioName, state, label });
    handleChange(event);
  };

  useEffect(() => {
    addRadioElementsId(uid);
  }, [uid, addRadioElementsId]);

  return (
    <label className={css['answer']} data-state={handleStateClass(uid, state)}>
      <input
        id={uid}
        type="radio"
        className={css['answer-input']}
        name={radioName}
        onChange={onChange}
        disabled={activity.isVerify}
        {...props}
      />

      <span>{label}</span>
      <WrongIcon />
      <CorrectIcon />
    </label>
  );
};
