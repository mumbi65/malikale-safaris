import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AboutUs from './components/aboutus.jsx';
import ContactUs from './components/contactus.jsx';
import Gallery from './components/gallery.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element:<App/>
  },
  {
    path: '/aboutus',
    element: <AboutUs/>
  },
  {
    path: '/contactus',
    element: <ContactUs/>
  },
  {
    path: '/gallery',
    element: <Gallery/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
