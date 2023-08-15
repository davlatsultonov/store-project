import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './pages/ErrorPage.jsx';
import { Product } from './pages/Product.jsx';
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import {ApiProvider} from "@reduxjs/toolkit/query/react";
import {productsApi} from "./store/api/apiSlice.js";

export const productionPrefix = import.meta.env.MODE === 'production' ? '/store-project' : ''

const router = createBrowserRouter([
  {
    path: `${productionPrefix}/`,
    element: <App />,
  },
  {
    path: `${productionPrefix}/product/:id`,
    element: <Product />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApiProvider api={productsApi}>
        <RouterProvider router={router} />
      </ApiProvider>
    </Provider>
  </React.StrictMode>
);
