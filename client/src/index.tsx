import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routes from './routes';
// @ts-ignore
import { QueryClientProvider } from 'react-query';
import { queryClient } from './lib/reactQuery';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
);
