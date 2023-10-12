import './App.css';
import { BrowserRouter as Router, Route, Routes,  Link } from 'react-router-dom';
import Navbar from './components/Navbar'
import Buscador from './pages/Buscador';
import Home from './pages/Home';
import Filtros from './components/Filtros';
function App() {
  return (
    <>

 
<Router>
      
      <Routes>
        <Route path="/home" element={<Home />  } />
        {/* Add more routes for other components if needed */}
        <Route path='/buscador' element={<Buscador></Buscador>} ></Route>
        <Route path='/home/tabela/filtros' element={<Filtros></Filtros>} ></Route>
      </Routes>

    </Router>
    
    </>
   
  
  );
}

export default App;
