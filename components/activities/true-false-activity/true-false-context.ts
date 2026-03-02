import { createContext } from 'books-ui';

import { TrueFalseContextType } from './types/types';

export const [TrueFalseContextProvider, useTrueFalseContext] = createContext<TrueFalseContextType>({
  name: 'TrueFalseContext'
});
