import { useEffect, useId, useState } from 'react';

import { Option } from './types/types';
import { useRadioBasketActivityContext } from './radio-basket-context';

import css from './radio-basket.module.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  addClass?: string;
  selects: Option[];
  question: string;
}

export const RadioBasketElement = ({ selects, question, addClass, ...props }: Props) => {
  const reactId = useId();
  const uid = reactId;
  const radioName = `radio-group-name-${uid}`;

  const { validation, addRadioElementsId, addRadiosValues } = useRadioBasketActivityContext();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    addRadioElementsId(radioName); // Agrega este grupo de radios al contexto
  }, [radioName, addRadioElementsId]);

  const getLabelClass = (inputId: string, state: 'success' | 'wrong') => {
    if (!validation || selectedId !== inputId) return css.button;
    return `${css.button} ${state === 'success' ? css.success : css.wrong}`;
  };

  return (
    <div className={`${css.radios__container} ${addClass ?? ''}`}>
      <div className={css.radio__options}>
        <div className={css.radio__options_container}>
          {selects.map((select) => {
            const inputId = `${uid}-${select.id}`;
            return (
              <div className={`${css.radio__option} ${validation ? css.disabled : ''}`} key={inputId}>
                <div className={css.radio_red}>
                  <img src="assets/images/red.webp" alt="Red para encestar" />
                  <span>{select.id}</span>

                  {validation && selectedId === inputId && (
                    <img
                      src="assets/images/ball.webp"
                      className={`${css.ball} ${
                        select.state === 'success' ? css.ball__success : css.ball__fail
                      }`}
                      alt="Balón"
                    />
                  )}
                </div>
                <div className={css.radio_button}>
                  <input
                    id={inputId}
                    type="radio"
                    name={radioName}
                    value={inputId}
                    disabled={validation}
                    className={css.radioButton}
                    checked={selectedId === inputId}
                    onChange={() => {
                      setSelectedId(inputId);
                      addRadiosValues({ name: radioName, id: inputId, state: select.state });
                    }}
                    {...props}
                  />
                  <label
                    htmlFor={inputId}
                    className={getLabelClass(inputId, select.state)}
                    dangerouslySetInnerHTML={{ __html: select.name }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={css.radio__question}>
        <div className={css.radio__question_container}>
          <img src="assets/images/left.webp" />
          <span dangerouslySetInnerHTML={{ __html: question }} />
          <img src="assets/images/right.webp" />
        </div>
      </div>
    </div>
  );
};
