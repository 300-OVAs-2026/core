import { Children, isValidElement, useEffect, useMemo, useReducer, useRef } from 'react';
import gsap from 'gsap';

import { GameMillionProvider } from './game-million-context';
import { GameMillionElement } from './game-million-element';
import { GameMillionButton } from './game-millions-button';
import { STATES } from './utils/consts';
import { convertNumber } from './utils/convert-number';

import type { InitialState } from './types/types';
import type { gameMilionAnswer } from './types/types';

import css from './game-millions.module.css';

const INITIAL_STATE = Object.freeze({
  validation: false,
  button: true,
  result: false,
  options: [],
  level: 0,
  money: 0,
  selects: [],
  isVerify: false
});

type SubComponents = {
  Element: typeof GameMillionElement;
  Button: typeof GameMillionButton;
};

export interface GameMilionsProps {
  onQuestionChange?: (index: number) => void;
  onResult?: ({ result, options }: { result: boolean; options: gameMilionAnswer[] }) => void;
  onMoneyChange?: (value: number) => void;

  children: React.ReactNode;
  question: React.ReactNode | JSX.Element;
  money: number;
  alt: React.ReactNode | JSX.Element;
}

const GameMilions: React.FC<GameMilionsProps> & SubComponents = ({
  question,
  money,
  alt,
  children,
  onQuestionChange,
  onResult,
  onMoneyChange
}) => {
  const counterRef = useRef<HTMLParagraphElement>(null);
  const refAddCounter = useRef<HTMLSpanElement>(null);
  const previousMoney = useRef<number>(0);
  const [activity, updateActivity] = useReducer(
    (prev: InitialState, next: Partial<InitialState>) => ({ ...prev, ...next }),
    INITIAL_STATE
  );

  const radioElementsId = useRef<string[]>([]);

  /**
   * Agrega el ID de un componente RadioElement
   * para realizar la validación de la actividad.
   * @param {string} uid - El ID del componente RadioElement.
   */
  const addRadioElementsId = (uid: string): void => {
    if (!radioElementsId.current.includes(uid)) {
      radioElementsId.current = [...radioElementsId.current, uid];
    }
  };

  /**
   * Creada para almacenar los radio seleccionados,
   * se crea un nuevo objecto con el id de la pregunta y el valor del radio.
   *
   * @param {String} id - id de la pregunta.
   * @param {Object} value - valor del radio seleccionado.
   */
  const addRadiosValues = ({ id, label, name, state }: gameMilionAnswer) => {
    updateActivity({
      options: [...activity.options.filter((option) => option.name !== name), { id, name, label, state }]
    });
  };

  const answerElements = useMemo(() => {
    return Children.toArray(children).filter((child) => isValidElement(child) && child.type === GameMillionElement);
  }, [children]);

  const actions = useMemo(() => {
    return Children.toArray(children).filter((child) => !(isValidElement(child) && child.type === GameMillionElement));
  }, [children]);

  useEffect(() => {
    if (onQuestionChange) {
      onQuestionChange(activity.level);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity.level]);

  const handleStateClass = (id: string, state: 'success' | 'wrong') => {
    if (!activity.selects.includes(id)) return '';
    if (activity.isVerify) return STATES[state];
    return STATES.select;
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputID = (event.target as HTMLInputElement).id;

    if (!activity.isVerify) {
      updateActivity({ selects: [inputID] });
    }
  };

  const handleVerify = () => {
    const result = verifySelect();

    updateActivity({
      isVerify: true,
      result,
      money: result ? activity.money + 1_000_000 : activity.money
    });

    const newMoney = result ? money + 1_000_000 : money;

    onResult?.({ result, options: activity.options });

    onMoneyChange?.(newMoney);
  };

  const handleReset = () => {
    updateActivity({ selects: [], result: false, isVerify: false });
  };

  const verifySelect = () => {
    if (activity.selects.length === 0) return false;

    for (const selected of activity.selects) {
      const dt = activity.options?.find((ans) => ans.id === selected);

      if (!dt) return false;
      if (dt.state !== 'success') return false;
    }

    return true;
  };

  useEffect(() => {
    const obj = { value: previousMoney.current };

    gsap.to(obj, {
      value: money,
      duration: 1,
      ease: 'power2.out',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = convertNumber(Math.floor(obj.value));
        }
      }
    });

    previousMoney.current = money;
  }, [money]);

  return (
    <GameMillionProvider
      value={{
        points: activity.money,
        activity,

        addRadioElementsId,
        addRadiosValues,
        verifySelect,
        handleReset,
        handleStateClass,
        handleChange,
        handleVerify
      }}>
      <div className={css.container}>
        <img
          className={css['logo']}
          src="assets/images/main_icon.webp"
          alt="Logotipo del programa How wants to be millionaire"
        />
        <p ref={counterRef} className={css.counter} aria-live="polite" aria-atomic="true" role="status">
          <span className={css['counter-add']} ref={refAddCounter} aria-hidden="true" hidden>
            +100$
          </span>

          <span ref={refAddCounter}>{convertNumber(money)}</span>
        </p>

        <fieldset className={css['wrapper-question']}>
          <legend className={`${css.question} u-mb-3`}>{question}</legend>
          <div className={`${css['wrapper-answer']}`}>{answerElements}</div>
        </fieldset>
      </div>

      <figcaption className="u-text-center">
        <p>{alt}</p>
      </figcaption>

      <div>{actions}</div>
    </GameMillionProvider>
  );
};

GameMilions.Element = GameMillionElement;
GameMilions.Button = GameMillionButton;

export { GameMilions };
