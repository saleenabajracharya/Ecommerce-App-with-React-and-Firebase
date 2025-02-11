import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { HomePage } from './components/pages/home/HomePage'
import { NoPage } from './components/pages/noPage/NoPage'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/*' element={<NoPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

