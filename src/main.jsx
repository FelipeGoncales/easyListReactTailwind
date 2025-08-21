import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TaskInfo from './pages/TaskInfo.jsx'
import Login from './pages/Login.jsx'
import Cadastro from './pages/Cadastro.jsx'
import ValidarCadastro from './pages/ValidarCadastro.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Perfil from './pages/Perfil.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/task',
    element: <TaskInfo />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/cadastro',
    element: <Cadastro />
  },
  {
    path: '/validar-cadastro',
    element: <ValidarCadastro />
  },
  {
    path: '/perfil',
    element: <Perfil />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
