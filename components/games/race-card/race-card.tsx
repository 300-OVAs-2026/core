import { useReducer } from 'react';

import type { RaceCardStateType } from './types/types';
import { ALERT_MESSAGES } from './const';
import { ContextGame } from './race-card-context';
import { RaceCardInitial } from './race-card-initial';
import { RaceCardRender } from './race-card-render';

import css from './svg-card.module.css';

// Valores por defecto para el contexto
const INITIAL_STATE = {
  pointplayer1: 0,
  pointplayer2: 0,
  move1: 0,
  move2: 0,
  answeredCount: 0,
  rightAnswers: 0
};

// Componente Provider
interface SvgProviderProps {
  children: React.ReactNode;
  questionCount: number;
}

type SubComponents = {
  Scene: typeof RaceCardRender;
  Init: typeof RaceCardInitial;
};

const RaceCard: React.FC<SvgProviderProps> & SubComponents = ({ children, questionCount }) => {
  const [game, updateGame] = useReducer(
    (prev: RaceCardStateType, next: Partial<RaceCardStateType>) => ({ ...prev, ...next }),
    INITIAL_STATE
  );

  // If questionCount isn't provided, show an alert
  if (!questionCount) {
    return (
      <div role="alert" aria-live="assertive" aria-atomic="true" className={css['alert']}>
        <p dangerouslySetInnerHTML={{ __html: ALERT_MESSAGES[Math.floor(Math.random() * ALERT_MESSAGES.length)]}}></p>
      </div>
    );
  }

  return (
    <ContextGame
      value={{
        game,
        updateGame,
        questionCount
      }}>
      {children}
    </ContextGame>
  );
};

RaceCard.Scene = RaceCardRender;
RaceCard.Init = RaceCardInitial;

export { RaceCard };
