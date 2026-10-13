import { createContext as createReactContext } from 'react';
import { createContext } from 'books-ui';

import type { GameFishContextType } from './types/types';

export const [GameFishActivityProvider, useGameFishActivityContext] = createContext<GameFishContextType>({
  name: 'GameFishActivityContext'
});

/** Posición (base 1) del pez dentro de su nivel; la provee GameFishLevel. */
export const GameFishPositionContext = createReactContext<number | null>(null);
