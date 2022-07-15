import React from "react";
import './Sidebar.css'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className="Sidebar">
      <nav>
        <h1>TodoApp</h1>
        <ul>
          <li></li>
          <li>
            <Link to="/App">Inicio</Link>
          </li>
          <li>
            <Link to="/App/Todo">Tarefas</Link>
          </li>
        </ul>
      </nav>
    </div>


  );
}

export default Sidebar;
