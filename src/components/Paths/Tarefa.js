import React from 'react'
import './css/Tarefa.css'


export default function Tarefa({ tarefa, toggleCheckbox }) {

    function handleCheckboxChange(e) {
        toggleCheckbox(tarefa.tarefaId)
    }

   
    return (
        <div className='tarefaDiv'>
            <label className="container"  > {tarefa.descricao}                
                <input onChange={handleCheckboxChange} type="checkbox" checked = {tarefa.completa === true ? 'checked' : ''}/>
                <span className="checkmark"></span>
            </label>
        </div>
    )
}
