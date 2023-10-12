import Navbar from "../components/Navbar"
import Tabela from "../components/Table"
import { useState } from 'react';
import Loading from "../components/Loading";
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import styles from '../components/Navbar.module.css';

import CustomizedMenus from "../components/CustomizedMenus";



function Home(){
    const [dados, setDados] = useState([]) // dados = [{}
    const [dadosExemplo, setDadosExemplo] = useState([]) // dados = [{}
    const [atualizarTabela, setAtualizarTabela] = useState(false) // dados = [{}
    const [todosAnos, setTodosAnos] = useState(true) // dados = [{}

    const formataDadosPraTabela = (dados) => {
        
            // Crie uma lista de todas as farmacêuticas e hospitais
            const farmaceuticas = Object.keys(dados);
            const hospitais = new Set();

            // Encontre todos os hospitais
            farmaceuticas.forEach(farmaceutica => {
            const hospitaisFarmaceutica = Object.keys(dados[farmaceutica]);
            hospitaisFarmaceutica.forEach(hospital => {
                hospitais.add(hospital);
            });
            });

            // Converta o conjunto de hospitais de volta para uma lista
            const hospitaisList = Array.from(hospitais);

            // Crie a estrutura de dados da tabela
            const tabela = [];

            // Adicione o cabeçalho da tabela (nomes dos hospitais) incluindo "Total"
            const cabecalho = ['Farmacêutica', ...hospitaisList, 'Total'];
            tabela.push(cabecalho);

            // Inicialize um objeto para rastrear os totais de cada hospital
            const totaisPorHospital = {};

            // Adicione as linhas da tabela com quantidades e calcule os totais
            farmaceuticas.forEach(farmaceutica => {
            const linha = [farmaceutica];
            let totalFarmaceutica = 0;

            hospitaisList.forEach(hospital => {
                const quantidade = dados[farmaceutica][hospital] || 0;
                linha.push(quantidade);

                // Atualize o total para este hospital
                totaisPorHospital[hospital] = (totaisPorHospital[hospital] || 0) + quantidade;
                totalFarmaceutica += quantidade;
            });

            // Adicione o total para esta farmacêutica à linha
            linha.push(totalFarmaceutica);
            tabela.push(linha);
            });

            // Adicione uma linha final com os totais de cada hospital
            const linhaTotal = ['Total'];
            let totalGeral = 0;

            hospitaisList.forEach(hospital => {
            const totalHospital = totaisPorHospital[hospital] || 0;
            linhaTotal.push(totalHospital);
            totalGeral += totalHospital;
            });

            // Adicione o total geral à linha final
            linhaTotal.push(totalGeral);
            tabela.push(linhaTotal);

            // Função de comparação para ordenar com base no total (último elemento de cada linha)
            function compararLinhas(linhaA, linhaB) {
            const totalA = linhaA[linhaA.length - 1];
            const totalB = linhaB[linhaB.length - 1];
            return totalB - totalA; // Classifique em ordem decrescente
            }

            // Ordene as linhas com base nos totais
            tabela.sort(compararLinhas);
            return tabela;
    }

    useEffect(() => {
        fetch('http://localhost:5000/estudos?cache=true', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(dados=> {               
            const tabela = formataDadosPraTabela(dados);
            setDadosExemplo(tabela)
            setAtualizarTabela(false)
    })

    }, [])

    const [dataInicial, setDataInicial] = useState('');
    const [dataFinal, setDataFinal] = useState('');
  
    const handleDataInicialChange = (event) => {
      setDataInicial(event.target.value);
    };
  
    const handleDataFinalChange = (event) => {
      setDataFinal(event.target.value);
    };

    const dadosHospitais = ()=> {
        console.log(dataFinal)
        console.log(dataInicial.substring(8,10) + "-" +dataInicial.substring(5,7) + "-" + dataInicial.substring(0,4))
        if(dataFinal && dataInicial){
            setAtualizarTabela(true)
            
            fetch(`http://localhost:5000/estudos?datainicial=${dataInicial.substring(8,10) + "-" +dataInicial.substring(5,7) + "-" + dataInicial.substring(0,4) }&datafinal=${dataFinal.substring(8,10) + "-" +dataFinal.substring(5,7) + "-" + dataFinal.substring(0,4)}`, {
                method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const tabela = formataDadosPraTabela(data);
                setDadosExemplo(tabela)
                setTodosAnos(false)
                setAtualizarTabela(false)
            })
        }else{
            setAtualizarTabela(true)
            fetch('http://localhost:5000/estudos', {
                method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const tabela = formataDadosPraTabela(data);
                setDadosExemplo(tabela)
                setAtualizarTabela(false)
            })

        }
       
    }
    
    return (
        <div>
                <div className={styles.buscadaor_header_container}>
                <Link className={styles.link} to="/buscador" > Buscador
                </Link>

                </div>
                
         
            <div className="filtros">
                <Link to="tabela/filtros" ><button>Filtros</button></Link>
            </div>

           <div className="div_btn_home">
            <button className="btn_home" onClick = {dadosHospitais}> <abbr title="Ao autualizar a tabela, novos estudos são buscados" >Atualizar dados na tabela</abbr> </button>

           </div>

           {todosAnos ? ( <div className="div_h1_home" >
                <h1 className="estudosH1" >Estudos de todos os anos</h1>
           </div>): (<h1 className="estudosH1">Estudo de {dataInicial} até {dataFinal}</h1>)}
          
            
            {atualizarTabela ? (<Loading></Loading>):(<Tabela dados = {dadosExemplo}></Tabela>) }
            
        </div>
    )
}

export default Home