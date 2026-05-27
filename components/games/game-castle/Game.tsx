import { useState } from 'react';

import { GameCastleButton } from './game-castle-button';
import { GameCastleProvider } from './game-castle-context';
import Level from './Level';

import type { question_game } from './types/types';

interface GameCastleProps {
  children: React.ReactNode;
  onResult?(result: boolean): void;
  question?: question_game;
}

type SubComponent = {
  Level: typeof Level;
  Button: typeof GameCastleButton;
};

export const GameCastle: React.FC<GameCastleProps> & SubComponent = ({ children, onResult, question }) => {
  const [selectAnswers, setSelectAnswers] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<'success' | 'wrong' | null>(null);

  const addSelectAnswer = (answer: string) => {
    setSelectAnswers(answer);
  };

  const checkAnswers = () => {
    const isCorrect = selectAnswers === question?.correct;
    setOpenModal(isCorrect ? 'success' : 'wrong');
    onResult?.(isCorrect);
  };

  const resetActivity = () => {
    setSelectAnswers(null);
    setOpenModal(null);
  };

  return (
    <GameCastleProvider value={{ selectAnswers, openModal, addSelectAnswer, checkAnswers, resetActivity, question }}>
      {children}
    </GameCastleProvider>
  );
};

GameCastle.Level = Level;
GameCastle.Button = GameCastleButton;
