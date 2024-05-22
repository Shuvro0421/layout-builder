import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Body from './components/Body.jsx';
import Alphabet from './components/Alphabet.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Body></Body>
  },
  {
    path: "/alphabet",
    element: <Alphabet></Alphabet>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
