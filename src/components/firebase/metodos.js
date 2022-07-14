import { db } from '../../components/firebase/index'
import { collection } from "firebase/firestore";
import { setTarefas } from '../../components/store/actions/tarefasActions'
import { getDocs,  addDoc,  updateDoc,  deleteDoc,  doc} from "firebase/firestore";
import store from '../../components/store/store';

export const usersCollectionRef = collection(db, "tarefas")

export const createTarefa = async (descricao,tarefaId) => {
    await addDoc(usersCollectionRef, { tarefaId, descricao, completa: false });
  };

 export const getTarefas = async () => {
    const data = await getDocs(usersCollectionRef);
    const dados = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    console.log(dados)
    store.dispatch(setTarefas(dados))
}
 

export const updateTarefa = async (id, completa) => {
    const tarefaDoc = doc(db, "tarefas", id);
    const newFields = { completa: completa };
    await updateDoc(tarefaDoc, newFields);
  };


  export const deleteAllTarefasFirebase = (tarefas) => {
    tarefas.map((tarefa) =>{
        const tarefaDoc = doc(db, "tarefas", tarefa.id);
        deleteDoc(tarefaDoc);
        return true
    })
    store.dispatch(setTarefas([]))
  }

  export const deleteTarefasConcluidasFirebase = (apenasCompletas) => {
    apenasCompletas.map((tarefa) =>{
        const tarefaDoc = doc(db, "tarefas", tarefa.id);
        deleteDoc(tarefaDoc);
        return true
    })
  }