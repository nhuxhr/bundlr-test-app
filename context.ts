import { createContext } from 'react';

export const AppContext = createContext<IAppContext>({
  bundlr: {},
  balance: '0.0',
  init: async () => {},
  refreshBalance: async () => {},
});
