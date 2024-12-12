import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import { RecoilRoot } from 'recoil';

function App() {
  let router = createBrowserRouter([{path:'' , element:<Layout/> , children:[
    {index:true , element:  <Register/>},
    {path:'login' , element: <Login/>},
    {path:'home' , element: <Home/>},
  ]}])

  return<>
 <RecoilRoot>
 <RouterProvider router={router}></RouterProvider>
    </RecoilRoot>

  </>  
}
export default App
