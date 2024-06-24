'use client';

import { Provider } from 'react-redux';

import { persistor, store } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';

type Props = {
  children: React.ReactNode;
};

const ReduxProvider = ({ children }: Props) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);
export default ReduxProvider;
