// filepath: /C:/Users/Home PC/Desktop/Web ph/Chapter 12/A12/client/src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider as MaterialThemeProvider } from '@material-tailwind/react';

import { RouterProvider } from "react-router-dom";
import Router from './routes/Router.jsx';
import AuthProvider from './providers/AuthProvider.jsx';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ThemeProvider } from './providers/ThemeProvider.jsx';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MaterialThemeProvider>
      <ThemeProvider> {/* Wrap with ThemeProvider */}
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={Router}></RouterProvider>
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </MaterialThemeProvider>
  </StrictMode>,
);