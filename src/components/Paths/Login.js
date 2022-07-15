import React, { useState, useEffect } from 'react'
import { login,  } from '../firebase/auth'
import { useNavigate } from 'react-router-dom';
import store from '../store/store'
import { setLoggedUser } from '../store/actions/LoggedUserActions'
import { connect } from 'react-redux'
import { signInWithGoogle } from "../firebase/auth";
import { Link } from 'react-router-dom'
import './css/Login.css'

const Login = (props) => {

    const [Email, setEmail] = useState('');
    const [Senha, setSenha] = useState('');
    const [Erro, setErro] = useState('');

    const navigate = useNavigate();


    useEffect(() => {

        if (props.LoggedUser.email !== 'Vazio' && props.LoggedUser.email)
            navigate("App")
    }, [props.LoggedUser.email,navigate]);


    const HandleSubmitSigin = (e) => {
        e.preventDefault()
       if(Email && Senha){
        login(Email, Senha).then((message) => {
            console.log("LOGADO LOGIN", message)
            const user = {
                email: message.user.email,
                Id: message.user.uid
            }
            store.dispatch(setLoggedUser(user))
            navigate('/App')
        }
        ).catch((error) => {
            console.log("ERRADO LOGIN", error)
            setErro('Email ou Senha incorretos')
            setTimeout(() => {
                setErro('')
            }, 3000);
        })
       }
    }
    return (
        <div className='DivLoginForm'>
            <form onSubmit={HandleSubmitSigin} className="LoginForm">
                <h1>Logar</h1>
                {Erro && <p className='Erro'>{Erro}</p>}
                <input type="email" placeholder='Email' onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder='Senha' onChange={e => setSenha(e.target.value)} />
                <button className='SignInButton'>Entrar</button>
                <button className='login-with-google-btn' onClick={signInWithGoogle}>Entrar com o Google</button>
                
                <Link className='Link' to="/Registrar">Criar Conta</Link>
            </form>
           

        </div>
    )
}


const ConnectedLogin = connect((state) => {
    return {
        LoggedUser: state.LoggedUser
    }
})(Login)

export default ConnectedLogin

