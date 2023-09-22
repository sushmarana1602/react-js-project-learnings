import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Register from "./components/auth/Register.jsx";
import SignIn from "./components/auth/Login.jsx";
import CreateWidget from './components/dashoard/CreateWidget.jsx'
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
    path: "login",
    element: <SignIn/>
  },
  {
    path: "dashboard",
    element: <CreateWidget/>
  }
]);
/*ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)*/
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
