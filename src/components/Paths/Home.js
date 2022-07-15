import React from "react";
import { connect } from 'react-redux'
import './css/Home.css'
import { useNavigate } from 'react-router-dom';
import { logout } from '../firebase/auth'
import { clearAllTarefas } from '../store/actions/tarefasActions'
import { Link } from 'react-router-dom'



const Home = (props) => {

 

  const navigate = useNavigate();

  const handleSair = () => {
    props.dispatch(clearAllTarefas())
    logout()
    navigate('../../')
  }

  

  return (
    <div className="Home">


      <ul className="ulGrande">
        <li className="Verde"><a className="active" href="/" onClick={handleSair}>Sair</a></li>
      </ul>

      <ul className="ulMenor">
        <div className="LinksDoInicio">
          <li><Link to="/App/Todo">Tarefas</Link></li>
          <li><Link to="/App">Inicio</Link></li>
        </div>
        <li className="Verde"><a className="active" href="/" onClick={handleSair}>Sair</a></li>
      </ul>



      <div className="ConteudoHome">
        <h1>TodoApp</h1>
        {props.LoggedUser.photoURL && <img className="UserPhoto" src={props.LoggedUser.photoURL} alt="" />}
        <p>Email:{props.LoggedUser.email}</p>



      </div>


    </div>
  );
}

const ConnectedHome = connect((state) => {
  return {
    LoggedUser: state.LoggedUser
  }
})(Home)

export default ConnectedHome

