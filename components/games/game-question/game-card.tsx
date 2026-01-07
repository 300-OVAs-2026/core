import { useEffect, useId, useState } from 'react';

import { RadioStates } from './types/types';
import { useGameQuestionContext } from './game-question-context';

import css from './game-question.module.css';

interface Props extends React.ButtonHTMLAttributes<HTMLInputElement> {
  addClass?: string;
  questionNumber?: string;
  background?: string;
  imagen?: string;
  title: string;
  alt: string;
  options: { id: string; label: string; state: 'wrong' | 'success' }[];
  question: string;
}

const STATES: Partial<Record<RadioStates, 'wrong' | 'right'>> = {
  wrong: 'wrong',
  success: 'right'
};

export const GameCard: React.FC<Props> = ({
  question,
  options,
  imagen,
  questionNumber,
  name,
  title,
  alt,
  addClass,
  ...props
}) => {
  const reactId = useId();
  const { addRadiosValues, addElementsId, result, validation } = useGameQuestionContext();

  const uid = questionNumber || reactId;
  const radioName = `radio-group-name-${name}`;

  const [selectedOption, setSelectedOption] = useState<string | null>(null); // Estado para manejar la opción seleccionada
  const [questionComplete, setQuestionComplete] = useState<string>(question); // Estado para almacenar la pregunta autocompletada

  /**
   * Maneja la selección de una opción.
   * @param {React.ChangeEvent<HTMLInputElement>} event - El evento de cambio de input.
   */
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const optionId = event.target.value;
    setSelectedOption(optionId);

    const selected = options.find((option) => option.id === optionId);
    if (selected) {
      addRadiosValues({ id: selected.id, name: radioName, state: selected.state });
    }
  };

  /**
   * Añade el ID del elemento al estado de la actividad.
   */
  useEffect(() => {
    addElementsId(uid);
  }, [addElementsId, uid]);

  /**
   * Actualiza la pregunta autocompletada cuando cambian las opciones o la pregunta.
   */
  useEffect(() => {
    if (validation) {
      const autocompletedQuestion = selectedOption
        ? question.replace('___', options.find((option) => option.id === selectedOption)?.label || '___')
        : question;
      setQuestionComplete(autocompletedQuestion);
    }
  }, [selectedOption, question, options, validation]);

  /**
   * Reinicia la pregunta y la selección cuando cambian la validación o el resultado.
   */
  useEffect(() => {
    if (!validation && !result) {
      setQuestionComplete(question);
      setSelectedOption(null);
    }
  }, [validation, result, question]);

  return (
    <figure className='u-flow'>
      <div className={`${css['container-element']} ${addClass ?? ''}`}>
        <div data-id="card" role="group" aria-labelledby={`question-${uid}`} className={css['card-element']}>
          {questionNumber && (
            <div className={css['number-question-container']} data-id="number-question">
              <p className={css['number-question']}>{questionNumber}</p>
            </div>
          )}
          <div className={`${css['question']}`} data-id="question" id={`question-${uid}`}>
            <p className="u-font-bold u-text-center">{questionComplete}</p>
            {imagen && <img src={imagen} alt="Imagen descriptiva de la pregunta" />}
          </div>
          <div
            className={css['container-options']}
            data-id="options"
            role="radiogroup"
            aria-labelledby={`question-${uid}`}>
            {options.map((option) => (
              <div key={option.id} className={`${validation ? css['disabled'] : ''}`}>
                <input
                  type="radio"
                  id={option.id}
                  name={radioName}
                  value={option.id}
                  disabled={validation}
                  className={css.radioOption}
                  checked={selectedOption === option.id}
                  aria-describedby={`description-${option.id}-${uid}`}
                  onChange={handleOptionChange}
                  data-state={validation ? STATES[option.state] : undefined}
                  {...props}
                />
                <label htmlFor={option.id} className={css['option-label']} id={`description-${option.id}-${uid}`}>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption>
        <p className="u-text-center u-font-italic">
          <strong>{title}</strong>&nbsp;{alt}
        </p>
      </figcaption>
    </figure>
  );
};
