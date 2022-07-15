
import { db } from '../../components/firebase/index'
import { collection } from "firebase/firestore";
import { setTarefas } from '../../components/store/actions/tarefasActions'
import { getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import store from '../../components/store/store';


export var usersCollectionRef = collection(db, "tarefas")
var colecao = "tarefas"

export const setCollection = (uid) => {
  colecao = "tarefas" + uid
  usersCollectionRef = collection(db, colecao)
}

export const createTarefa = async (descricao, tarefaId,uid,timestamp) => {
  colecao = "tarefas" + uid
  usersCollectionRef = collection(db, colecao)
  console.log("ADICIONANDO TAREFA",colecao)
  await addDoc(usersCollectionRef, { tarefaId, descricao, completa: false, timestamp });
};

export const getTarefas = async (uid) => {
  colecao = "tarefas" + uid
  usersCollectionRef = collection(db, colecao) 
  const data = await getDocs(usersCollectionRef);
  const dados = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  let DadosFiltrados = dados.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
  store.dispatch(setTarefas(DadosFiltrados))
  return dados
}

/*
export const getTarefas = async (uid) => {
  colecao = "tarefas" + uid
  usersCollectionRef = collection(db, colecao) 
  const data = await getDocs(usersCollectionRef);
  const dados = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  store.dispatch(setTarefas(dados))
}

*/


export const updateTarefa = async (id, completa,uid) => {
  colecao = "tarefas" + uid
  usersCollectionRef = collection(db, colecao)
  const tarefaDoc = doc(db, colecao, id);
  const newFields = { completa: completa };
  await updateDoc(tarefaDoc, newFields);
};


export const deleteAllTarefasFirebase = (tarefas,uid) => {
  colecao = "tarefas" + uid
  usersCollectionRef = collection(db, colecao)
  tarefas.map((tarefa) => {
    const tarefaDoc = doc(db, colecao, tarefa.id);
    deleteDoc(tarefaDoc);
    return true
  })
  store.dispatch(setTarefas([]))
}

export const deleteTarefasConcluidasFirebase = (apenasCompletas,uid) => {
  colecao = "tarefas" + uid
  usersCollectionRef = collection(db, colecao)  
  apenasCompletas.map((tarefa) => {
    const tarefaDoc = doc(db, colecao, tarefa.id);
    deleteDoc(tarefaDoc);
    return true
  })
}