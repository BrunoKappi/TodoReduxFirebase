import React from "react";
import './Content.css'
import { Routes, Route } from "react-router-dom";
import Home from './Paths/Home'
import NotFound from './Paths/NotFound'
import ListaTarefas from "./Paths/ListaTarefas";


function Content() {
  return (
    <main className='Content'>     
        <Routes>
          <Route path="/" element={<Home />} />         
          <Route path="/todo" element={<ListaTarefas />} />
          <Route path="*" element={<NotFound />} />
        </Routes>   
    </main>
  );
}

export default Content;

