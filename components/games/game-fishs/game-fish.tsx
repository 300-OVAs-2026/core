import { CorrectIcon, WrongIcon } from './icons_/icons';

import css from './game.module.css';

const scales = ['180', '0'];

interface Props {
  answer: string;
  isPressed: boolean;
  fish: string;
  margin: string;
  onClick: (answer: string) => void;
  addClass?: string;
  isCorrect: boolean;
  isDisabled: boolean;
  fishTop?: number;
}

export const GameFish: React.FC<Props> = ({
  answer,
  isPressed,
  isDisabled,
  isCorrect,
  fish,
  margin,
  onClick,
  addClass,
  fishTop,
}) => {
  const handleClick = () => {
    onClick?.(answer);
  };

  return (
    <button
      className={`${css.fish} ${addClass ?? ''}`}
      aria-label={answer}
      aria-pressed={isPressed}
      disabled={isDisabled}
      {...(isDisabled && { ['data-state']: isCorrect })}
      style={{
        top: `${10 + Math.random() * (fishTop || 40)}%`,
        left: margin,
        animationDelay: Math.random() * 2 + 's'
      }}
      onClick={handleClick}>
      <img src={fish} style={{ transform: `rotateY(${scales[Math.round(Math.random())]}deg)` }} alt={answer} />
      <p className={css.paragraph__fish}>{answer}</p>
      {isDisabled && isPressed ? isCorrect ? <CorrectIcon /> : <WrongIcon /> : null}
    </button>
  );
};
