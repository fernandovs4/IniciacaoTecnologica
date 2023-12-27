import Navbar from "../components/Navbar"
import { useState } from 'react';
import Loading from "../components/Loading";
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import styles from '../components/Navbar.module.css';
import FiltroTabela from "../components/FiltroTabela";
import TabelaHospitalDoenca from "../components/TabelaHospitalDoenca";
import '../components/Tabela.css'
import host from '../constantes'
function Tabela(){
    const [dadosExemplo, setDadosExemplo] = useState({}) // dados = [{}
    const [atualizarTabela, setAtualizarTabela] = useState(true) 
    const [dadosCopia, setDadosCopia] = useState([])
    const [url, setUrl] = useState(host + '/construirTabela?&stdage=todas&fase=todas&gender=todas&tipo=farma_clinica&totais=true&sort_interno=true&sort_externo=true&total_interno=true&total_externo=true')
    useEffect(() => {
        fetch(url, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(dados=> {            
            setDadosExemplo(dados)
            setDadosCopia(dados)
            setAtualizarTabela(false)
    })


    }, [url])
    const [tipo1, setTipo1] = useState('farma');
    const [tipo2, setTipo2] = useState('clinica');
    const [inversed, setInversed] = useState(false);


    return (
        <div >
                <div className={styles.buscadaor_header_container}>
                <Link className={styles.link} to="/buscador" > Buscador </Link> 
                <Link className={styles.link} to="/" > Home </Link>
                </div>

                {<FiltroTabela tipo1 = {tipo1} tipo2 = {tipo2} inversed = {inversed} setInversed = {setInversed} setTipo1 = {setTipo1} setTipo2 = {setTipo2} setUrl ={setUrl} ></FiltroTabela>}

            {Object.keys(dadosExemplo).length == 0 ? (<Loading></Loading>):(<TabelaHospitalDoenca tipo1 = {tipo1}  inversed={inversed} tipo2 = {tipo2} dados = {dadosExemplo} setDadosExemplo = {setDadosExemplo} dadosCopia = {dadosCopia} setDadosCopia = {setDadosCopia}></TabelaHospitalDoenca>) }
        </div>
     
    )
}

export default Tabela