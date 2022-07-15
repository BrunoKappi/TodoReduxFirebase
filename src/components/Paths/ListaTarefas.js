import TarefaForm from './TarefaForm'
import Tarefa from './Tarefa'
import { useState } from 'react'
import { connect } from 'react-redux'
import { addTarefaAction, clearAllTarefas, setTarefas } from '../store/actions/tarefasActions'
import { v4 as uuidv4 } from 'uuid';
import { createTarefa, getTarefas, updateTarefa, deleteAllTarefasFirebase, deleteTarefasConcluidasFirebase } from '../firebase/metodos';
import { logout } from '../firebase/auth'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './css/ListaDeTarefas.css'
import { Oval } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import moment from "moment";

const ListaTarefas = (props) => {

    console.log("NOW",moment().unix())

    console.log("LISTA", props.LoggedUser.email)

    const [Loading, setLoading] = useState('')

    const navigate = useNavigate();

    const handleSair = () => {
        props.dispatch(clearAllTarefas())
        logout()
        navigate('../../')
    }


    useEffect(() => {
        setLoading('')
        getTarefas(props.LoggedUser.uid).then((message) => {
            setLoading('Não')
        })
    }, [props.LoggedUser.uid])



    function addTarefa(tarefaToAdd) {
        if (!tarefaToAdd)
            return
        const ID = uuidv4()
        const newTarefa = { tarefaId: ID, descricao: tarefaToAdd, completa: false }
        props.dispatch(addTarefaAction(newTarefa))
        createTarefa(tarefaToAdd, ID, props.LoggedUser.uid, moment().unix())
        getTarefas(props.LoggedUser.uid)
    }

    function toggleCheckbox(tarefaId) {
        const TarefasCopia = [...props.tarefas]
        const TarefaToggle = TarefasCopia.find(tarefa => tarefa.tarefaId === tarefaId)
        TarefaToggle.completa = !TarefaToggle.completa
        props.dispatch(setTarefas(TarefasCopia))
        updateTarefa(TarefaToggle.id, TarefaToggle.completa, props.LoggedUser.uid)
    }

    function LimparTudo() {
        props.dispatch(clearAllTarefas())
        deleteAllTarefasFirebase(props.tarefas, props.LoggedUser.uid)
    }

    function clearConcluded() {
        const apenasIncompletas = props.tarefas.filter((tarefa) => { return !tarefa.completa === true })
        const apenasCompletas = props.tarefas.filter((tarefa) => { return tarefa.completa === true })
        props.dispatch(setTarefas(apenasIncompletas))
        deleteTarefasConcluidasFirebase(apenasCompletas, props.LoggedUser.uid)
    }




    return (
        <div className='ListaDeTarefas'>

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
            

            {Loading &&

                <div className='ConteudoLista'>
                    <TarefaForm clearConcluded={clearConcluded} clearAll={LimparTudo} addTarefa={addTarefa} />

                    <br></br>

                    {props.tarefas && props.tarefas.map(tarefaItem => {
                        return <Tarefa key={tarefaItem.tarefaId} tarefa={tarefaItem} toggleCheckbox={toggleCheckbox} />
                    })}

                    {props.tarefas.length === 0 && <p className='Nenhumatarefa'>Ainda não há nenhuma tarefa</p>  }
                </div>

            }

            {!Loading &&

                <div className="Loading" >

                    <Oval color="#00BFFF" height={80} width={80} />

                </div>


            }




        </div>
    )
}


const ConnectedListaTarefas = connect((state) => {
    return {
        tarefas: state.tarefas,
        LoggedUser: state.LoggedUser
    }
})(ListaTarefas)

export default ConnectedListaTarefas

