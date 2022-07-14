

const tarefas = (state = [], action) => {
switch (action.type) {
    case 'ADD_TAREFA': 
        return state.concat(action.novaTarefa)
    case 'CLEAR_ALL':
        return []
    case 'SET_TAREFAS':
            return action.tarefas
    default: 
        return state
}
}


export default tarefas
