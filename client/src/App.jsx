import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react'

import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Login from "./pages/Login";

import './App.css'
import SetAvatar from "./pages/SetAvatar";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/setavatar" element={<SetAvatar />}/>
        <Route path="/" element={<Chat />}/>
        <Route path="/chat" element={<Chat />}/>        
      </Routes>
    </BrowserRouter>
  );
}

export default App
