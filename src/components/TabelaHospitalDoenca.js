import React, { useState, useEffect } from 'react';
import './Tabela.css';
import * as XLSX from 'xlsx';

const TabelaHospitalDoenca = ({dados}) => {
  const [data, setData] = useState([]);
  const [linhasSelecionadas, setLinhasSelecionadas] = useState([]);
  const [colunasSelecionadas, setColunasSelecionadas] = useState([]);
  const [checkboxStatus, setCheckboxStatus] = useState({});
  
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
   let hospitais = [];


   for (let i = 0; i < doencas.length ; i++){
    hospitais = [...hospitais, ...Object.keys(data[doencas[i]]).filter((item) => !hospitais.includes(item))]
   }
  




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
  const handleExportToExcel = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      [null, ...hospitais],
      ...doencas.map((doenca) => [doenca, ...hospitais.map((hospital) => data[doenca][hospital])]),
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'TabelaHospitalDoenca');

    // Use type: 'array' em vez de type: 'blob'
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Crie um Blob a partir do array e crie um link de download
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tabela_hospital_doenca.xlsx';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className='btn-botoes' >
        <div>
            <button onClick={handleExcluirLinhasSelecionadas}>Excluir Linhas Selecionadas</button>
            <button onClick={handleExcluirColunasSelecionadas}>Excluir Colunas Selecionadas</button>
        </div>
        <div>
            <button onClick={handleExportToExcel}>Exportar para Excel</button>
        </div>
      </div>
      <div className='container_tabela' >
      <table>
        <thead>
          <tr>
          <th className="sticky_header">Doenças</th>
            {hospitais.map((hospital, index) => (
              <th className="sticky_header hoverable" onClick={() => handleColunaSelecionada(hospital)} key={index} >
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
              <td   onClick={() => handleLinhaSelecionada(doenca)}
                  className="hoverable sticky_cell">
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
     
    </div>
  );
};

export default TabelaHospitalDoenca;
