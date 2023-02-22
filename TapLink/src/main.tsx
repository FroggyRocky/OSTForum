import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Admin} from "./Components/Admin/Admin";
import './index.css'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <BrowserRouter>
      <QueryClientProvider client={queryClient}>
          <Routes>
          <Route path={'/'} element={<App />}  />
              <Route path={'/admin'} element={<Admin />}  />
          <Route path='*' element={<div>not found</div>} />
          </Routes>
      </QueryClientProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
