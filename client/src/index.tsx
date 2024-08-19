import React from 'react';
import ReactDOM from 'react-dom/client';
import { RelayEnvironmentProvider } from 'react-relay';
import RelayEnvironment from './RelayEnvironment';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <App />
  </RelayEnvironmentProvider>
);
