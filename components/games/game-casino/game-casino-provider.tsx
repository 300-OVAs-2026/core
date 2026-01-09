import React, { useState } from 'react';

import { Casino } from './game-casino-activity';
import { GameCasinoProvider } from './game-casino-context';
import { GameCasinoInit } from './game-casino-init';

interface Props {
  children: React.ReactNode;
}

type SubComponent = {
  CasinoInit: typeof GameCasinoInit;
  Casino: typeof Casino;
};

export const GameCasino: React.FC<Props> & SubComponent = ({ children }) => {
  const [points, setPoints] = useState(25);

  const handlePoint = (newPoint: number) => {
    setPoints((prev) => prev + newPoint);
  };

  return <GameCasinoProvider value={{ point: points, handlePoint }}>{children}</GameCasinoProvider>;
};

GameCasino.CasinoInit = GameCasinoInit;
GameCasino.Casino = Casino;
