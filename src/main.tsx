import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import LandingPage from './pages/LandingPage/LandingPage'
import Login from './pages/Login/Login'
import FavoriteGame from './pages/FavoriteGame/FavoriteGame'

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Login />
  },
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "favorite",
    element: <FavoriteGame />
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
