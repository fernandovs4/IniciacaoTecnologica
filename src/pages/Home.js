import Navbar from "../components/Navbar"
import { useState } from 'react';
import Loading from "../components/Loading";
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import styles from '../components/Navbar.module.css';
import FiltroTabela from "../components/FiltroTabela";
import TabelaHospitalDoenca from "../components/TabelaHospitalDoenca";

function Home(){
    const [dadosExemplo, setDadosExemplo] = useState({}) // dados = [{}
    const [atualizarTabela, setAtualizarTabela] = useState(true) // dados = [{}

 
    const [url, setUrl] = useState('http://localhost:5000/construirTabela?&stdage=todas&fase=todas&gender=todas&tipo=farma_clinica&totais=true&sort_interno=true&sort_externo=true')
    useEffect(() => {
        fetch(url, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(dados=> {            
           
            setDadosExemplo(dados)

        
            setAtualizarTabela(false)
    })

    }, [url])

 


    return (
        <div className="container-main">
                <div className={styles.buscadaor_header_container}>
                <Link className={styles.link} to="/buscador" > Buscador </Link>
                </div>
                   
                
                {<FiltroTabela setUrl ={setUrl} ></FiltroTabela>}
          
{/* 
           {todosAnos ? ( <div className="div_h1_home" >
                <h1 className="estudosH1" >Estudos de todos os anos</h1>
           </div>): (<h1 className="estudosH1">Estudo de {dataInicial} até {dataFinal}</h1>)} */}
        <div className="container-table" >
            {Object.keys(dadosExemplo).length == 0 ? (<Loading></Loading>):(<TabelaHospitalDoenca dados = {dadosExemplo} ></TabelaHospitalDoenca>) }
        </div>
            
        </div>
    )
}

export default Home