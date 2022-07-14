

    export const addTarefaAction = (novaTarefa = {}) => {
        return ({
            type: 'ADD_TAREFA',
            novaTarefa
        })
    }

    export const clearAllTarefas = () => {
        return ({
            type: 'CLEAR_ALL'
        })
    }

    export const setTarefas = (tarefas) => {
        return ({
            type: 'SET_TAREFAS',
            tarefas
        })
    }


    