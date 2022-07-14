import './App.css';
import Content from './components/Content';
import Sidebar from './components/Sidebar';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>       
          <Sidebar></Sidebar>
          <Content></Content>      
      </BrowserRouter>
    </div>
  );
}

export default App;
