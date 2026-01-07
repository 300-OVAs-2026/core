import { useMemo, useState } from 'react';
import { FullScreenAlert, FullScreenButton } from '@core/components';

import { DriversType } from './types/types';
import { InputRadio } from './race-card-input';
import { RaceCardScene } from './race-card-scene';

import css from './svg-card.module.css';

interface Props {
  options: { choices: { state: string; option: string }[]; activity: string };
  modal: { audioSuccess: string; textSuccess: string; audioWrong: string; textWrong: string };
  question: string;
  title: string;
  alt: string;
  toShowModal?: boolean;
  id: string;
  drivers?: DriversType;
}

export const RaceCardRender: React.FC<Props> = ({ options, question, id, title, alt, modal,...props }) => {
  const inputElementUID = useMemo(() => options.activity, [options]);
  const newChoices = useMemo(() => {
    if (!options) return [];

    return options?.choices?.map((choice) => ({
      // Generate a unique ID for each choice using crypto.randomUUID()
      id: crypto.randomUUID(),
      ...choice // Spread the properties of the original choice
    }));
  }, [options]);

  const [selected, setSelected] = useState<string>('');

  const onChange = (value: string | React.ChangeEvent<HTMLInputElement>) => {
    let newValue: string;

    if (typeof value === 'string') {
      newValue = value;
    } else {
      newValue = value.target.value;
    }

    // Update the selected state with the new value
    setSelected(newValue);
  };

  const resetSelected = () => {
    setSelected(''); // Limpiar el estado seleccionado
  };

  return (
    <div className={css['game']}>
      <FullScreenAlert />
      <FullScreenButton elementId={id} />
      <div id={id} className={css['game-wrapper']}>
        <div className={css['game-wrapper__options']}>
          {newChoices.map((choise) => (
            <InputRadio
              key={choise.id}
              id={options.activity}
              answer={choise.state}
              label={choise.option}
              onChange={onChange}
            />
          ))}
        </div>

        <div className={css['game-wrapper__scene']}>
          <RaceCardScene
            id={inputElementUID}
            question={question}
            selected={selected}
            resetSelected={resetSelected}
            modalFinal={modal}
            {...props}
          />
        </div>
      </div>

      <p className="u-text-center u-font-italic u-my-2">
        <strong>{title}</strong> {alt}
      </p>
    </div>
  );
};
