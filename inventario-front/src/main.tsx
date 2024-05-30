import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './routers/Login.tsx'
import Signup from './routers/Signup.tsx'
import Dashboard from './routers/Dahboard.tsx'
import ProtectedRoute from './routers/ProtectedRouter.tsx'
import { AuthProvider } from './auth/AuthPovider.tsx'
import './css/login.css';
import './css/DefaultLayout.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/",
    element: <ProtectedRoute/>,
    children:[
      {
        path:"/dashboard",
        element: <Dashboard/>
      }
    ]
  },
    
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
)
