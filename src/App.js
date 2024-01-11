import './App.css';
import { BrowserRouter as Router, Route, Routes,  Link } from 'react-router-dom';
import Navbar from './components/Navbar'
import Buscador from './pages/Buscador';
import Tabela from './pages/Tabela';
import Filtros from './components/Filtros';
import Atualizar from './pages/Atualizar'
import Dashboard from './pages/Dashboard';
import Home from './pages/Home'
function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />   } /> */}
          {/* Add more routes for other components if needed */}
          <Route path='/buscador' element={<Buscador></Buscador>} ></Route>
          <Route path='/tabela' element={<Tabela></Tabela>} ></Route>
          <Route path='/' element={<Home></Home>} ></Route>
          <Route path='/atualizar' element={<Atualizar/>} ></Route>
          <Route path='/dashboard' element={<Dashboard/>} ></Route> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
