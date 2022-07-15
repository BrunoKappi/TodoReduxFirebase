import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import { resetarSenha } from "../firebase/auth";
import { Link } from 'react-router-dom'
import './css/Forget.css'

const Forget = (props) => {

    const [Email, setEmail] = useState('');  
    const [Erro, setErro] = useState('');

    const navigate = useNavigate();


    useEffect(() => {
        if (props.LoggedUser.email !== 'Vazio' && props.LoggedUser.email)
            navigate("/App")
    }, [props.LoggedUser.email,navigate]);


    const HandleSubmitSigin = (e) => {
        e.preventDefault()
       if(Email){
        resetarSenha(Email).then((message) => {
           setErro("Verifique seu Email")           
        }
        ).catch((error) => { 
            setErro("Email não encontrado")
            setTimeout(() =>{
                setErro("") 
            },4000)            
        }) 
       }
    }
    return (
        <div className='DivRegisterForm'>
        {Erro && <p className='Erro'>{Erro}</p>}
            <form onSubmit={HandleSubmitSigin} className="RegisterForm">
                <h1>Resetar Senha</h1>               
                <input type="email" placeholder='Email' onChange={e => setEmail(e.target.value)} />               
                <button className='SignInButton'>Criar Conta</button>                               
                <Link className='Link' to="/">Entrar</Link>
            </form>
            

        </div>
    )
}


const ConnectedForget = connect((state) => {
    return {
        LoggedUser: state.LoggedUser
    }
})(Forget)

export default ConnectedForget

