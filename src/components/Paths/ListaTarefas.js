import TarefaForm from './TarefaForm'
import Tarefa from './Tarefa'
import { connect } from 'react-redux'
import { addTarefaAction, clearAllTarefas, setTarefas } from '../store/actions/tarefasActions'
import { v4 as uuidv4 } from 'uuid';
import { createTarefa, getTarefas, updateTarefa, deleteAllTarefasFirebase,deleteTarefasConcluidasFirebase } from '../firebase/metodos';


const ListaTarefas = (props) => {

    function addTarefa(tarefaToAdd) {
        if (!tarefaToAdd)
            return      
        const ID =   uuidv4()
        const newTarefa = { tarefaId: ID, descricao: tarefaToAdd, completa: false }
        props.dispatch(addTarefaAction(newTarefa)) 
        createTarefa(tarefaToAdd,ID)  
        getTarefas()
        
    }

    function toggleCheckbox(tarefaId) {
        const TarefasCopia = [...props.tarefas]
        const TarefaToggle = TarefasCopia.find(tarefa => tarefa.tarefaId === tarefaId)
        TarefaToggle.completa = !TarefaToggle.completa
        props.dispatch(setTarefas(TarefasCopia))
        updateTarefa(TarefaToggle.id,TarefaToggle.completa) 
    }

    function LimparTudo() {           
       props.dispatch(clearAllTarefas())
       deleteAllTarefasFirebase(props.tarefas)
    }

    function clearConcluded() {
        const apenasIncompletas = props.tarefas.filter((tarefa) => { return !tarefa.completa === true })
        const apenasCompletas = props.tarefas.filter((tarefa) => { return tarefa.completa === true })
        props.dispatch(setTarefas(apenasIncompletas))
        deleteTarefasConcluidasFirebase(apenasCompletas)     
     }
 

    return (
        <div>
            <TarefaForm clearConcluded={clearConcluded} clearAll = {LimparTudo} addTarefa={addTarefa} />

            <br></br>

            {props.tarefas && props.tarefas.map(tarefaItem => {
                return <Tarefa key={tarefaItem.tarefaId} tarefa={tarefaItem} toggleCheckbox={toggleCheckbox} />
            })}

        </div>
    )
}


const ConnectedListaTarefas = connect((state) => {
    return {
        tarefas: state.tarefas
    }
})(ListaTarefas)

export default ConnectedListaTarefas

