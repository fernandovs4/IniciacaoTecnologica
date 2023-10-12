import React, { useEffect, useState } from 'react';
import styles from '../components/Filtro.module.css';

function Filtros() {
    const [estudos, setEstudos] = useState([]);
    const [estudosCarregados, setEstudosCarregados] = useState(false);
    const [farmacias, setFarmacias] = useState([]);
    const [farmaciasCarregadas, setFarmaciasCarregadas] = useState(false);
    const [clinicas, setClinicas] = useState([]);
    const [clinicasCarregadas, setClinicasCarregadas] = useState(false);
    const [opcaoFarmacias, setOpcaoFarmacias] = useState('');
    const [opcaoFarmaciasDetalhes, setOpcaoFarmaciasDetalhes] = useState('');
    const [opcaoClinicas, setOpcaoClinicas] = useState('');
    const [opcaoClinicasDetalhes, setOpcaoClinicasDetalhes] = useState('');
    const [periodoEstudo, setPeriodoEstudo] = useState('');
    const [faseEstudos, setFaseEstudos] = useState('');
    const [faseEstudosCarregadas, setFaseEstudosCarregadas] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/todosEstudos')
            .then(response => response.json())
            .then(dados => {
                setEstudos(dados);
                setEstudosCarregados(true);
            });
    }, []);

    const handleOpcaoFarmaciasChange = (event) => {
        setOpcaoFarmacias(event.target.value);
    };

    const handleOpcaoFarmaciasDetalhesChange = (event) => {
        setOpcaoFarmaciasDetalhes(event.target.value);
    };

    const handlePeriodoEstudoChange = (event) => {
        setPeriodoEstudo(event.target.value);
    };

    const handleOpcaoClinicasChange = (event) => {
        setOpcaoClinicas(event.target.value);
    };

    const handleOpcaoClinicasDetalhesChange = (event) => {
        setOpcaoClinicasDetalhes(event.target.value);
    };

    const handlefaseEstudosChange = (event) => {
        setFaseEstudos(event.target.value);
    };

    useEffect(() => {
        fetch('http://localhost:5000/farmas')
            .then(response => response.json())
            .then(dados => {
                setFarmacias(dados.LeadSponsorName);
                setFarmaciasCarregadas(true);
            });
    }, [opcaoClinicas]);

    useEffect(() => {
        fetch('http://localhost:5000/cadastros/hospitais')
            .then(response => response.json())
            .then(dados => {
                setClinicas(dados.hospitais);
                setClinicasCarregadas(true);
            });
    }, [opcaoClinicasDetalhes]);

    const renderOpcoesFarmacias = () => {
        if (opcaoFarmacias === 'personalizado' && opcaoFarmaciasDetalhes === 'opcao1') {
            return (
                <div className={styles.containerFarmas}>
                    {farmaciasCarregadas &&
                        farmacias.map((farmacia, index) => (
                            <div key={index}>
                                <label htmlFor={index}>{farmacia}</label>
                                <input type='checkbox' id={index} />
                            </div>
                        ))}
                </div>
            );
        } else if (opcaoFarmacias === 'personalizado' && opcaoFarmaciasDetalhes === 'opcao2') {
            return (
                <div>
                    <label>Quantidade de farmácias: </label>
                    <input type='number' />
                </div>
            );
        }
        return null;
    };

    const renderPeriodoEstudoOpcoes = () => {
        if (periodoEstudo === 'personalizado') {
            return (
                <div>
                    <label>Data inicial: </label>
                    <input type='date' />
                    <label>Data final: </label>
                    <input type='date' />
                </div>
            );
        }
        return null;
    };

    const renderOpcoesClinicas = () => {
        if (opcaoClinicas === 'personalizado2' && opcaoClinicasDetalhes === 'opcao1') {
            return (
                <div>
                    {clinicasCarregadas &&
                        clinicas.map((clinica, index) => (
                            <div key={index}>
                                <label>{clinica}</label>
                                <input type='checkbox' />
                            </div>
                        ))}
                </div>
            );
        } else if (opcaoClinicas === 'personalizado2' && opcaoClinicasDetalhes === 'opcao2') {
            return (
                <div>
                    <label>Quantidade de clínicas: </label>
                    <input type='number' />
                </div>
            );
        }
        return null;
    };

    const renderFasesEStudos = ()=> {
        return (
            <div>
                <label>Fase dos estudos: </label>
                <label id='faseestudos'  name='faseestudos'>Todos</label>
                <input id='faseestudos' name='faseestudos' defaultChecked value='todos' onChange={handlefaseEstudosChange} type='radio' ></input>
                <label  >Personalizado</label>
                <input name = 'faseestudos' onChange={handlefaseEstudosChange} value='personalizado' type='radio' ></input>
                {faseEstudos == 'personalizado' && (
                    <div>
                        <label>Selecione as fases dos estudos: </label><br></br>
                        <label name='fase1' >Fase 1: </label>
                        <input name='fase1' type='checkbox' ></input>
                        <label name='fase2' >Fase 2: </label>
                        <input name='fase2' type='checkbox' ></input>
                        <label name='fase3' >Fase 3: </label>
                        <input name='fase3' type='checkbox' ></input>
                        <label name='fase4' >Fase 4: </label>
                        <input name='fase4' type='checkbox' ></input>
                    </div>
                )}
            </div>
        )
    } 
    return (
        <div>
            <div className={styles.h1}>
            <h1>Filtros</h1>
            </div>
            
            <div className={styles.container}>
                <div className={styles.container_esquerdo}>
                    <select className={styles.select_esquerdo}>
                        <option value="todos">Farmácias</option>
                        <option value="farmacias">opcao2</option>
                        <option value="farmacias">opcao3</option>
                        <option value="farmacias">opcao4</option>
                    </select>
                    <label>Farmácias:</label>
                    <div>
                        <label name='op'>Todos</label>
                        <input type='radio' onChange={handleOpcaoFarmaciasChange} name='op' defaultChecked value='todos' />
                        <label>Personalizado</label>
                        <input type='radio' onChange={handleOpcaoFarmaciasChange} name='op' value='personalizado' />
                    </div>
                    {opcaoFarmacias === 'personalizado' && (
                        <div>
                            <select value={opcaoFarmaciasDetalhes} onChange={handleOpcaoFarmaciasDetalhesChange}>
                                <option value="">Selecione...</option>
                                <option value='opcao1'>Selecionar farmácias</option>
                                <option value='opcao2'>Escolher as farmácias que têm mais estudos</option>
                            </select>
                        </div>
                    )}
                    {renderOpcoesFarmacias()}
                   
                    <div>
                        <label>Período do estudo: </label>
                        <label name='op'>Todos</label>
                        <input type='radio' name='periodo' onChange={handlePeriodoEstudoChange} defaultChecked value='todos' />
                        <label>Personalizado</label>
                        <input type='radio' name='periodo' onChange={handlePeriodoEstudoChange} value='personalizado' />
                    </div>
                    {renderPeriodoEstudoOpcoes()}
                    {renderFasesEStudos()}
                </div>
                Por
                <div className={styles.container_direito}>
                    <select className={styles.select_direito}>
                        <option value="todos">Clínicas</option>
                        <option value="farmacias">opcao1</option>
                        <option value="farmacias">opcao2</option>
                        <option value="farmacias">opcao3</option>
                    </select>
                    <label>Clínicas:</label>
                    <div>
                        <label name='todasClinicas'>Todos</label>
                        <input type='radio' onChange={handleOpcaoClinicasChange} name='op' defaultChecked value='todos' />
                        <label>Personalizado</label>
                        <input type='radio' onChange={handleOpcaoClinicasChange} name='op' value='personalizado2' />
                    </div>
                    {opcaoClinicas === 'personalizado2' && (
                        <div>
                            <select value={opcaoClinicasDetalhes} onChange={handleOpcaoClinicasDetalhesChange}>
                                <option value="">Selecione...</option>
                                <option value='opcao1'>Selecionar clínicas</option>
                                <option value='opcao2'>Escolher as clínicas que têm mais estudos</option>
                            </select>
                        </div>
                    )}
                    {renderOpcoesClinicas()}
                   
                </div>
            </div>
        </div>
    );
}

export default Filtros;
