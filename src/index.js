import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './components/store/store';
import { Provider } from 'react-redux'
import { getTarefas } from './components/firebase/metodos';

getTarefas()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
        <App />
    </Provider>


);


