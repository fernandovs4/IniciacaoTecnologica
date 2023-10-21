import { useState, useRef, useEffect } from 'react'
import Navbar from '../components/Navbar'
import ListLeft from '../components/ListLeft'
import Container from '../components/Container'
import ListRight from '../components/ListRigth'
import SearchBar from '../components/SearchBar'
import SendSelected from '../components/SendSelected'
import Select from '../components/Select'
const Buscador = () => {
    const [hospitaisEncontrados, setHospitaisNaoSelecionados] = useState([])
    const [hospitais_registrados, setHospitaisRegistrados] = useState([])
    const [hospitaisSelecionados, setHospitaisSelecionados] = useState([])
    const [PesquisadorPalavraChave, setPesquisadorPalavraChave] = useState("")
    const [selectedHospital, setSelectedHospital] =  useState("")
    const [hospitaisNoBancoDeDados, setHospitaisNoBancoDeDados] = useState([])
    const pesquisarPalavraChave =  (evt) => {
            const fetchData = async () => {
                try{
                    const response = await fetch(`http://localhost:5000/hospitais?hospital=${PesquisadorPalavraChave}&hospital-selecionado=${selectedHospital}`, {
                        method: 'GET',
                    })
                    const data = await response.json()                    
                    setHospitaisRegistrados([...data['hospitais_registrados']]);
                    setHospitaisSelecionados([...hospitaisSelecionados, ...data['hospitais_registrados'].filter(el => !hospitaisSelecionados.includes(el))]);
                    setHospitaisNoBancoDeDados([...data['hospitais_registrados']])
                    setHospitaisNaoSelecionados(
                        [...data['hospitais_encontrados']['hospitais']].filter(
                            el => !hospitaisSelecionados.includes(el) && !data['hospitais_registrados'].includes(el)
                        )
                    );
                }catch(err){
                    console.log(err)
                }
            }   
            if (!(PesquisadorPalavraChave === '')) {
                fetchData()
            }
      };
      const [controle, setControle] = useState(true);
      console.log(hospitaisSelecionados)
    return (
        <>
            {/* <Navbar></Navbar> */}
            <Navbar />           
            <p className='buscador_p' >Para começar, selecione o hospital de referência da busca</p>
            <Select
                setControle ={setControle}
                hospitaisEncontrados ={hospitaisEncontrados} 
                setHospitaisNaoSelecionados ={setHospitaisNaoSelecionados}
                pesquisarPalavraChave = {pesquisarPalavraChave} 
                hospitaisSelecionados = {hospitaisSelecionados}
                setHospitaisRegistrados ={setHospitaisRegistrados}
                setPesquisadorPalavraChave={setPesquisadorPalavraChave} 
                setHospitaisSelecionados = {setHospitaisSelecionados}
                setSelectedHospital = {setSelectedHospital}
                selectedHospital = {selectedHospital}
                setHospitaisNoBancoDeDados = {setHospitaisNoBancoDeDados}>
            </Select>
            {
                (hospitaisEncontrados.length > 0 || hospitais_registrados.length > 0 || hospitaisSelecionados.length > 0) ? (
                    <>
                    <Container customClass = "sendSelected">
                    <SearchBar hospitaisEncontrados ={hospitaisEncontrados} 
                        setHospitaisNaoSelecionados ={setHospitaisNaoSelecionados}
                        pesquisarPalavraChave = {pesquisarPalavraChave} 
                        hospitaisSelecionados = {hospitaisSelecionados}
                        setHospitaisRegistrados ={setHospitaisRegistrados}
                        setPesquisadorPalavraChave={setPesquisadorPalavraChave} 
                        setHospitaisSelecionados = {setHospitaisSelecionados}
                        setSelectedHospital = {setSelectedHospital}
                        selectedHospital = {selectedHospital}
                        setHospitaisNoBancoDeDados = {setHospitaisNoBancoDeDados}
                    ></SearchBar>

                    <SendSelected  hospitaisEncontrados ={hospitaisEncontrados} hospitaisSelecionados={hospitaisSelecionados} selectedHospital ={selectedHospital} ></SendSelected>

                    </Container>
                    
                    <Container >
                        <ListLeft  
                        setHospitaisNaoSelecionados ={setHospitaisNaoSelecionados}
                        setHospitaisSelecionados = {setHospitaisSelecionados}
                        hospitaisEncontrados ={hospitaisEncontrados}
                        hospitaisSelecionados = {hospitaisSelecionados} ></ListLeft>  
                        <ListRight
                            setHospitaisNaoSelecionados = {setHospitaisNaoSelecionados}
                            hospitaisEncontrados = {hospitaisEncontrados}
                            setHospitaisSelecionados = {setHospitaisSelecionados}
                            hospitaisSelecionados={hospitaisSelecionados}
                            hospitaisNoBancoDeDados = {hospitaisNoBancoDeDados}
                        />
                    </Container>
                    </>
                ) : ("")
            }
        </>
    )
}
export default Buscador