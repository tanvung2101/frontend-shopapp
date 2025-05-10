import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastContainer } from "react-toastify";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()
import { AppProvider } from './contexts/app.context'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <AppProvider>
          <App />
        </AppProvider>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </StrictMode>,
)
