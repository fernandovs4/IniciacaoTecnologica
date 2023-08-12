import { useState, useRef, useEffect } from 'react'
import Navbar from '../components/Navbar'
import ListLeft from '../components/ListLeft'
import Container from '../components/Container'
import ListRight from '../components/ListRigth'
import { contains } from 'jquery'
import SearchBar from '../components/SearchBar'
import SendSelected from '../components/SendSelected'
import SelecaoHospitais from '../components/SelecaoHospitais'
const Buscador = () => {
    const [input, setInput] = useState('');
    const [hospitaisEncontrados, setHospitaisNaoSelecionados] = useState([])
    const [hospitais_registrados, setHospitaisRegistrados] = useState([])
    const [hospitaisSelecionados, setHospitaisSelecionados] = useState([])
 
    const pesquisar = (evt) => {
        if (!(input === '')) {
          fetch(`http://localhost:5000/hospitais?hospital=${input}`, {
            method: 'GET',
          })
            .then((response) => response.json())
            .then((data) => {
                
                setHospitaisRegistrados([...data['hospitais_registrados'].filter(el => !hospitaisSelecionados.includes(el)), ...hospitaisSelecionados]); // Corrected prop name here
                setHospitaisNaoSelecionados(data['hospitais_encontrados']['hospitais']); // Corrected prop name here
                setHospitaisSelecionados( [...hospitaisSelecionados, ...data['hospitais_registrados'].filter(el => !hospitaisSelecionados.includes(el))])

            });
        }
      };

    const toggleHospitalSelection = (hospital) => {
        if (hospitaisSelecionados.includes(hospital)) {
            setHospitaisSelecionados(hospitaisSelecionados.filter((h) => h !== hospital));
        } else {
            setHospitaisSelecionados([hospital, ...hospitaisSelecionados]);
        }
    };
 
    
    // useEffect(() => {
    //     // Move os hospitais selecionados para o final da lista
    //     const updatedEncontrados = hospitaisEncontrados.filter(h => !hospitaisSelecionados.includes(h));
    //     setHospitaisNaoSelecionados([...updatedEncontrados, ...hospitaisSelecionados]);
    // }, [hospitaisSelecionados]);

    const [selectedHospital, setSelectedHospital] = useState("")
    const [valueHospital, setValueHospital] = useState("")
    console.log(valueHospital)
    const [hospitais, setHospitais] = useState([]);
    
    return (
        <>
            <Navbar  setHospitais ={ setHospitais} setInp= {setSelectedHospital} setValueHospital = {setValueHospital} valueHospital={valueHospital} ></Navbar>
            <SearchBar hospitais ={hospitais} setHospitais={setHospitais}  setInput={setInput} pesquisar={pesquisar}  selectedHospital={selectedHospital} setSelectedHospital = {setSelectedHospital} valueHospital = {valueHospital}></SearchBar>
           
            {
                (hospitaisEncontrados.length > 0 || hospitais_registrados.length > 0 || hospitaisSelecionados.length > 0) ? (
                    <>
                
                    <Container >
                         <ListLeft
                            setHospitaisNaoSelecionados={setHospitaisNaoSelecionados}
                            setHospitaisSelecionados={setHospitaisNaoSelecionados}
                            hospitaisEncontrados={hospitaisEncontrados}
                            hospitaisSelecionados={hospitaisSelecionados}
                            toggleHospitalSelection={toggleHospitalSelection}
                        />
                        <ListRight
                            hospitaisSelecionados={hospitaisSelecionados}
                            toggleHospitalSelection={toggleHospitalSelection}
                        />
                    </Container>
                    </>
                    
                ) : ("")
            }

        </>
    )
}

export default Buscador