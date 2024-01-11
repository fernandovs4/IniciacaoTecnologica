import { useState, useRef, useEffect } from 'react'
import Navbar from '../components/Navbar'
import ListLeft from '../components/ListLeft'
import Container from '../components/Container'
import ListRight from '../components/ListRigth'
import SearchBar from '../components/SearchBar'
import SendSelected from '../components/SendSelected'
import Select from '../components/Select'
import host  from '../constantes'
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
                    const response = await fetch(`${host}hospitais?hospital=${PesquisadorPalavraChave}&hospital-selecionado=${selectedHospital}`, {
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
      console.log(selectedHospital)
    return (
        <>
            {/* <Navbar></Navbar> */}
            <Navbar />           
            <p className='buscador-explicacao'>Bem-vindo ao buscador! É essencial antes de gerar a tabela com todos os estudos associar as várias formas de nomes de
                 uma clínica (apelidos) com um nome único que representa a clínica. Por exemplo, pro hospital A.C Camargo existe
                  estudos no qual o seu nome está como a.c camargo, Antonio Prudente, Antônio Prudente, A. Camargo, etc. Dessa forma, 
                  para a plataforma saber que esses nomes é o hospital A.C. Camargo, faz se necessário o usuário associar esses nomes 
                  com o nome único (no caso, A.C. Camargo). Para fazer isso, é só selecionar o hospital na caixa abaixo ( se não tiver 
                  o hospital que você quer, é necessário cadastrá-lo no botão "Cadastrar novo hospital"), com isso o sistema irá trazer algumas varições 
                  do lado esquerdo, basta clicar nos nomes que corresponde ao hospital selecionado na caixa de hospitais, que o nome será selecionado. Com a finalização
                  basta clicar em "Enviar Selecionados".</p>
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
                (hospitaisEncontrados.length > 0 || selectedHospital != '' || hospitais_registrados.length > 0 || hospitaisSelecionados.length > 0) ? (
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