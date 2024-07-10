import React, { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './Component/Layout';
import RetrieveInfo from './Component/RetrievePerson';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:'/retrieve',
          element:<RetrieveInfo/>
        }
      ]
    },
  
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;