import './App.css';
import { BrowserRouter as Router, Route, Routes,  Link } from 'react-router-dom';
import Navbar from './components/Navbar'
import Buscador from './pages/Buscador';
import Home from './pages/Home';
import Filtros from './components/Filtros';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />  } /> */}
          {/* Add more routes for other components if needed */}
          <Route path='/buscador' element={<Buscador></Buscador>} ></Route>
          <Route path='/tabela' element={<Home></Home>} ></Route>
          <Route path='/' element={<Dashboard/>} ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
