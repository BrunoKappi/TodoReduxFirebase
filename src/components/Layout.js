import React from 'react'
import {  Outlet } from "react-router-dom"
import Sidebar from './Sidebar'
import './Layout.css'
import { connect } from 'react-redux'


const Layout = (props) => {    

    console.log("LAYOUT",props.LoggedUser !== {})

    if(props.LoggedUser.email !== 'Vazio' && props.LoggedUser.email){
        return (
            <div className='Layout'>
                <Sidebar />
                <main className='Content'>
                    <Outlet />
                </main>
            </div>
        )
    }else{
        return (
            <div className='Layout'>
              Redirecionando
            </div>
        )
    }

    
}


const ConnectedLayout = connect((state) => {
    return {
        LoggedUser: state.LoggedUser
    }
})(Layout)

export default ConnectedLayout