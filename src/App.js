import './App.css';
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from './components/Paths/Login';
import Home from './components/Paths/Home';
import ListaDeTarefas from './components/Paths/ListaTarefas';
import NotFound from './components/Paths/NotFound';
import Layout from './components/Layout';
import Registrar from './components/Paths/Registrar'


import { connect } from 'react-redux'

const App = (props) => {

  const RequireAuth = ({ children }) => {
    return props.LoggedUser.email !== 'Vazio' ? children : <Navigate to="/" />
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Registrar" element={<Registrar />} >
          <Route path="*" element={<RequireAuth><NotFound /></RequireAuth>} />
        </Route>
        <Route path="/App" element={<RequireAuth><Layout /></RequireAuth>} >
          <Route path="/App/" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="Todo" element={<RequireAuth><ListaDeTarefas /></RequireAuth>} />
          <Route path="*" element={<RequireAuth><NotFound /></RequireAuth>} />
        </Route>
      </Routes>
    </div>
  );
}


const ConnectedApp = connect((state) => {
  return {
    LoggedUser: state.LoggedUser
  }
})(App)

export default ConnectedApp

