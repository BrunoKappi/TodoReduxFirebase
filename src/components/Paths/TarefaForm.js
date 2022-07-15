import React, { useState } from 'react'
import './css/TarefaForm.css'

export default function TarefaForm({addTarefa,clearAll,clearConcluded}) {

    const [tarefaDigitada, settarefaDigitada] = useState('');

    function AdicionarTarefa() {
        addTarefa(tarefaDigitada)
    }

    
    function LimparTudo() {
        clearAll()
    }

    function LimparConcluidas() {
        clearConcluded()
    }


    return (
        <div className='TarefasForm'>

            <input 
                className='TarefaInput'
                value={tarefaDigitada}
                onChange={e => settarefaDigitada(e.target.value)}
                type="text"
                placeholder='Digite sua tarefa'
            />
            <button className='TarefaFormButton Add' onClick={AdicionarTarefa}>Adicionar</button>
            <button className='TarefaFormButton Concluded' onClick={LimparConcluidas}>Limpar Concluídas</button>
            <button className='TarefaFormButton All' onClick={LimparTudo}>Limpar Tudo</button>
          

        </div>
    )
}
