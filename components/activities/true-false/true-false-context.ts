import { createContext } from 'books-ui';

import { TrueFalseContextType } from './tyes/types';

export const [TrueFalseContextProvider, useTrueFalseContext] = createContext<TrueFalseContextType>({
  name: 'TrueFalseContext'
});
