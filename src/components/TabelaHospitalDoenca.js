import React, { useState, useEffect } from 'react';

const TabelaHospitalDoenca = ({dados}) => {
  const [data, setData] = useState([]);
  const [linhasSelecionadas, setLinhasSelecionadas] = useState([]);
  const [colunasSelecionadas, setColunasSelecionadas] = useState([]);
  const [checkboxStatus, setCheckboxStatus] = useState({});

  // useEffect(() => {
  //   // Fazer a solicitação HTTP para a rota
  //   fetch('http://localhost:5000/construirTabela?&stdage=todas&fase=todas&gender=todas&tipo=farma_condicao&inversed=false&simetric=false&sort_externo=true&sort_interno=true')
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       setData(responseData);
  //       const initialCheckboxStatus = {};

  //       for (const doenca of Object.keys(responseData)) {
  //         initialCheckboxStatus[doenca] = false;
  //       }

  //       setCheckboxStatus(initialCheckboxStatus);
  //     })
  //     .catch((error) => console.error('Erro na solicitação: ', error));
  // }, []);
  console.log(data)
  useEffect(() => {
    
        setData(dados);
        const initialCheckboxStatus = {};
        
        for (const doenca of Object.keys(dados)) {
          initialCheckboxStatus[doenca] = false;
        }

        setCheckboxStatus(initialCheckboxStatus);
      
  }, [dados]);
 

  if (data.length == 0) {
    console.log("não tem dados")
    return <p>Carregando dados...</p>;
  }
   
   const doencas = Object.keys(data);
   const hospitais = Object.keys(data[doencas[0]]);
  




  const handleLinhaSelecionada = (doenca) => {
    setCheckboxStatus({ ...checkboxStatus, [doenca]: !checkboxStatus[doenca] });

    if (!linhasSelecionadas.includes(doenca)) {
      setLinhasSelecionadas([...linhasSelecionadas, doenca]);
    } else {
      setLinhasSelecionadas(linhasSelecionadas.filter((item) => item !== doenca));
    }
  };

  const handleColunaSelecionada = (hospital) => {
    setCheckboxStatus({ ...checkboxStatus, [hospital]: !checkboxStatus[hospital] });

    if (!colunasSelecionadas.includes(hospital)) {
      setColunasSelecionadas([...colunasSelecionadas, hospital]);
    } else {
      setColunasSelecionadas(colunasSelecionadas.filter((item) => item !== hospital));
    }
  };

  const handleExcluirLinhasSelecionadas = () => {
    const newData = { ...data };
    linhasSelecionadas.forEach((doenca) => delete newData[doenca]);
    setData(newData);
    setLinhasSelecionadas([]);
  };

  const handleExcluirColunasSelecionadas = () => {
    const newData = { ...data };
    const hospitaisSelecionados = colunasSelecionadas.slice();

    doencas.forEach((doenca) => {
      hospitaisSelecionados.forEach((hospital) => {
        delete newData[doenca][hospital];
      });
    });

    setData(newData);
    setColunasSelecionadas([]);
  };

  return (
    <div>
      <button onClick={handleExcluirLinhasSelecionadas}>Excluir Linhas Selecionadas</button>
      <button onClick={handleExcluirColunasSelecionadas}>Excluir Colunas Selecionadas</button>
      <table>
        <thead>
          <tr>
            <th>Doenças</th>
            {hospitais.map((hospital, index) => (
              <th onClick={() => handleColunaSelecionada(hospital)} key={index} className="hoverable">
                <input
                  type="checkbox"
                  checked={checkboxStatus[hospital]}
                  onChange={() => handleColunaSelecionada(hospital)}
                />
                <span >
                  {hospital}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {doencas.map((doenca, index) => (
            <tr key={index}>
              <td  onClick={() => handleLinhaSelecionada(doenca)}
                  className="hoverable">
                <input
                  type="checkbox"
                  checked={checkboxStatus[doenca]}
                  onChange={() => handleLinhaSelecionada(doenca)}
                />
                <span
                 
                >
                  {doenca}
                </span>
              </td>
              {hospitais.map((hospital, hIndex) => (
                <td key={hIndex}>{data[doenca][hospital]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaHospitalDoenca;
