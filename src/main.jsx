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
import SafariPackage from './components/safaripackages.jsx';
import SafariDetail from './components/safaridetail.jsx';
import { SafariProvider } from './components/safaricontext.jsx';
import Login from './components/login.jsx';
import Register from './components/register.jsx';
import Profile from './components/profile.jsx';
import Payment from './components/payment.jsx';

const router = createBrowserRouter([
  {
    path: '/home',
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
  },
  {
    path: '/safaripackages',
    element:<SafariPackage/>
  },
  {
    path: '/safari/:safariId',
    element: <SafariDetail/>
  },
  {
    path: '/',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/profile',
    element: <Profile/>
  },
  {
    path: '/payment/:safariId',
    element: <Payment/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SafariProvider>
      <RouterProvider router={router}/>
    </SafariProvider>
  </React.StrictMode>,
)
