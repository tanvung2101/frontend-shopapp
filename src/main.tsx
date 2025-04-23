import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from "react-redux";
import App from './App.tsx'
import { store } from './store/index.ts';
import { ToastContainer } from "react-toastify";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()
import { AppProvider } from './contexts/app.context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppProvider>
          <App />
        </AppProvider>
        <ToastContainer />
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
