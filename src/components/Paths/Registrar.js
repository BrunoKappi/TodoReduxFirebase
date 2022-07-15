import React, { useState, useEffect } from 'react'
import { register  } from '../firebase/auth'
import { useNavigate } from 'react-router-dom';
import store from '../store/store'
import { setLoggedUser } from '../store/actions/LoggedUserActions'
import { connect } from 'react-redux'
import { signInWithGoogle } from "../firebase/auth";
import { Link } from 'react-router-dom'
import './css/Registrar.css'

const Registrar = (props) => {

    const [Email, setEmail] = useState('');
    const [Senha, setSenha] = useState('');
    const [Erro, setErro] = useState('');

    const navigate = useNavigate();


    useEffect(() => {
        if (props.LoggedUser.email !== 'Vazio' && props.LoggedUser.email)
            navigate("/App")
    }, [props.LoggedUser.email,navigate]);


    const HandleSubmitSigin = (e) => {
        e.preventDefault()
       if(Email && Senha){
        register(Email, Senha).then((message) => {
            console.log("REGISTRAR", message)
            const user = {
                email: message.user.email,
                Id: message.user.uid
            }
            store.dispatch(setLoggedUser(user))
            navigate('/App')
        }
        ).catch((error) => { 
            console.log("ERRADO REGISTRO",error.code)
            let SenhaFraca = error.code.includes("password");
            let EmailEmUso = error.code.includes("use");
            if(SenhaFraca)
                setErro('A senha deve ter pelo menos 6 caracteres')
            if(EmailEmUso)
                setErro('Esse Email já está em uso')
            setTimeout(() => {
                setErro('')
            }, 3000);
        })
       }
    }
    return (
        <div className='DivRegisterForm'>
        {Erro && <p className='Erro'>{Erro}</p>}
            <form onSubmit={HandleSubmitSigin} className="RegisterForm">
                <h1>Criar Conta</h1>               
                <input type="email" placeholder='Email' onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder='Senha' onChange={e => setSenha(e.target.value)} />
                <button className='SignInButton'>Criar Conta</button>
                <button className='login-with-google-btn' onClick={signInWithGoogle}>Entrar com o Google</button>               
                <Link className='Link' to="/">Entrar</Link>
            </form>
            

        </div>
    )
}


const ConnectedRegistrar = connect((state) => {
    return {
        LoggedUser: state.LoggedUser
    }
})(Registrar)

export default ConnectedRegistrar

