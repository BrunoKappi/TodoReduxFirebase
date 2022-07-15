import { combineReducers, createStore } from 'redux'
import tarefas from './reducers/tarefas'
import LoggedUser from './reducers/LoggedUser'

const store = createStore(
    combineReducers({
        tarefas: tarefas,
        LoggedUser
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => {
    localStorage.setItem("Tarefas", JSON.stringify(store.getState()))            
    console.log("Store Changed", store.getState() )    
})


export default store



