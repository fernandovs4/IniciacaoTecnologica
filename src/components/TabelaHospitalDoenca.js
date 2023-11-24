import React, { useState, useRef, useEffect } from 'react';
import './Tabela.css';
import $ from 'jquery';
import 'select2/dist/css/select2.min.css';
import 'select2';
import * as XLSX from 'xlsx';
import Select from 'react-select';



const TabelaHospitalDoenca = ({dados, tipo1, tipo2, inversed}) => {
  const [data, setData] = useState([]);
  const [linhasSelecionadas, setLinhasSelecionadas] = useState([]);
  const [colunasSelecionadas, setColunasSelecionadas] = useState([]);
  const [checkboxStatus, setCheckboxStatus] = useState({});
  
const [selectedColunas, setSelectedColunas] = useState([]);
const [selectedLinhas, setSelectedLinhas] = useState([]);

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
  const hospitalOptions = []
  for (let i = 0; i < hospitais.length; i++){
    hospitalOptions.push({"value": hospitais[i], "label": hospitais[i]})
  }

  const doencasOptions = []
  for (let i = 0; i < doencas.length; i++){
    doencasOptions.push({"value": doencas[i], "label": doencas[i]})
  }

  hospitalOptions.sort((a, b) => a.label.localeCompare(b.label))
  doencasOptions.sort((a, b) => a.label.localeCompare(b.label))
 
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


const handleHospitalChange = (selectedOption) => {
  setSelectedColunas(selectedOption);
};

const handleDoencaChange = (selectedOption) => {
  setSelectedLinhas(selectedOption);
}

  return (
    <div>
      <div className='btn-botoes' >
        <div>
            <button onClick={handleExcluirLinhasSelecionadas}>Excluir Linhas Selecionadas</button>
            <button onClick={handleExcluirColunasSelecionadas}>Excluir Colunas Selecionadas</button>
        <div className='dropdown_selection_table' >
        <h5>Selecione as colunas</h5>
          <Select
            isMulti
            value={selectedColunas}
            onChange={handleHospitalChange}
            closeMenuOnSelect={false}
            options={hospitalOptions}
            hideSelectedOptions={false}
            isSearchable
            styles={{
              menu: (provided, state) => ({
                ...provided,
                zIndex: 2, // ajuste o valor conforme necessário
                maxWidth: '400px',
              }),
            }}
        />
        <h5>Selecione as linhas</h5>
        <Select
            isMulti
            value={selectedLinhas}
            onChange={handleDoencaChange}
            closeMenuOnSelect={false}
            options={doencasOptions}
            hideSelectedOptions={false}
            isSearchable
            styles={{
              menu: (provided, state) => ({
                ...provided,
                zIndex: 2, // ajuste o valor conforme necessário
                maxWidth: '400px',

              }),
            }}
        />

        <button>Atualizar tabela</button>

        </div>
            
      
              
              
            
        </div>
        <div>
            <button onClick={handleExportToExcel}>Exportar para Excel</button>
        </div>
      </div>
      <div>
      </div>
      <div className='container-table'>
      <table>
        <thead>
          <tr>
          <th className="sticky_header hoverable">{inversed ? tipo2: tipo1}/ <br></br> {inversed? tipo1: tipo2}</th>
            {hospitais.map((hospital, index) => (
              hospital == "Total"? (
                <th className="sticky_header hoverable" onClick={() => handleColunaSelecionada(hospital)} key={index} >
                <span>
                  {hospital}
                </span>
              </th>
              ):(
                <th className="sticky_header hoverable" onClick={() => handleColunaSelecionada(hospital)} key={index} >                
                <input
                  type="checkbox"
                  checked={checkboxStatus[hospital]}
                  onChange={() => handleColunaSelecionada(hospital)}
                />

                <span>
                  {hospital}
                </span>
              </th>
              )
            ))}
          </tr>
        </thead>
        <tbody>
          {doencas.map((doenca, index) => (
            doenca == "Total"? (
            <tr key={index}>
            <td 
              className="total hoverable sticky_cell">
              <span
              >
        {doenca}
              </span>
            </td>
            {hospitais.map((hospital, hIndex) => (
                data[doenca][hospital] == "Total"? (
                  <td className='total' key={hIndex}>{data[doenca][hospital]}</td>
                ):(
                  <td key={hIndex}>{data[doenca][hospital]}</td>
                )
            ))}
          </tr>
            ): (

            <tr key={index}>
            <td onClick={() => handleLinhaSelecionada(doenca)}
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
              
                data[doenca][hospital] == "Total"? (
                  <td className='total' key={hIndex}>{data[doenca][hospital]}</td>
                ):(
                  <td key={hIndex}>{data[doenca][hospital]}</td>
                )
            ))}
          </tr>
            ) 
          )
          )}
        </tbody>
      </table>
      </div>
      
    </div>
  );
};

export default TabelaHospitalDoenca;
