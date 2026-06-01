import { createContext } from 'books-ui';

import type { OrderPhraseActivityContextType } from './types/types';

export const [OrderPhraseActivityProvider, useOrderPhraseActivityContext] = createContext<OrderPhraseActivityContextType>({
  name: 'OrderPhraseActivityContext'
});
