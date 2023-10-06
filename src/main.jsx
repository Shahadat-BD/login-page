import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from './Component/Home/Home.jsx';
import Login from './Component/Login/Login.jsx';
import Register from './Component/Register/Register.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import PrivateRoute from './privateRoute/PrivateRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      {
        path:'/',
        element:<PrivateRoute><Home></Home></PrivateRoute>
      },
      {
        path : '/login',
        element:<Login></Login>
      },
      {
        path : '/Register',
        element:<Register></Register>
      }
    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
         <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
