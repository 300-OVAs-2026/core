import { createContext } from 'books-ui';

import type { GameCasinoContextType } from './types/types';

export const [GameCasinoProvider, useGameCasinoProvider] = createContext<GameCasinoContextType>({
  name: 'GameCasinoContext'
});
