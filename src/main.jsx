import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Register from "../src/components/auth/Register.jsx";
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "forgotpassword",
    element: <div>Forgot Pass</div>,
  },
  {
    path: "signup",
    element: <Register/>
  },
  {
    path: "dashboard",
    element: <div>Dsahboard</div>,
  },
]);
/*ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)*/
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
