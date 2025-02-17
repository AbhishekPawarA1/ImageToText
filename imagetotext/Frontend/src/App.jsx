import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ImageToText } from './components/ImageToText'
import { Route, Routes } from 'react-router'
import Signup from './components/Signup'
import Login from "./components/Login"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ImageToText />} />
      </Routes>
    </>
  );
}

export default App
