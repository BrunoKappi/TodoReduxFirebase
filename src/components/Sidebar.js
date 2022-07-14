import React from "react";
import './Sidebar.css'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className="Sidebar">     
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/tarefas">Tarefas</Link>
          </li>               
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
