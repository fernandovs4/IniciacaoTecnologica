import './App.css';
import { BrowserRouter as Router, Route, Routes,  Link } from 'react-router-dom';
import Navbar from './components/Navbar'
import Buscador from './pages/Buscador';
function App() {
  return (
    <>
    <Router>
      <Buscador></Buscador>

    </Router>
    
    </>
   
  
  );
}

export default App;
