import {Provider} from 'react-redux';
import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import LoadingPage from "./pages/LoadingPage/LoadingPage.tsx";
import {persistor, store} from "./store/Store.ts";
import App from './App.tsx';
import {BrowserRouter} from "react-router-dom";
import {PrimeReactProvider} from 'primereact/api';

const EntryPoint: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<LoadingPage/>}
        persistor={persistor}>
        <BrowserRouter>
          <PrimeReactProvider>
            <App/>
          </PrimeReactProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default EntryPoint;
