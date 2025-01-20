import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router';


import './App.css'

import ItemsList from './pages/ItemsList.jsx';
import ItemCreate from './pages/ItemCreate.jsx';
import ItemDetail from "./pages/ItemDetail.jsx";
import Layout from './components/Layout';
import ItemEdit from "./pages/ItemEdit.jsx";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <ItemsList/>,
            },
            {
                path: '/ItemCreate',
                element: <ItemCreate/>,
            },
            {
                path: '/ItemDetail/:id',
                element: <ItemDetail/>,
            },
            {
                path: '/ItemEdit/:id',
                element: <ItemEdit/>,
            },

        ]
    }
]);
function App() {


  return (
    <>
        <RouterProvider router={router}/>

    </>
  )
}

export default App
