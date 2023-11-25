import React, { useState, useRef, useEffect } from 'react';
import './Tabela.css';
import $ from 'jquery';
import 'select2/dist/css/select2.min.css';
import 'select2';
import * as XLSX from 'xlsx';
import Select from 'react-select';



const TabelaHospitalDoenca = ({dados, tipo1, tipo2, inversed, setDadosExemplo, dadosCopia, setDadosCopia}) => {
  
  const [data, setData] = useState([]);
  const [linhasSelecionadas, setLinhasSelecionadas] = useState([]);
  const [colunasSelecionadas, setColunasSelecionadas] = useState([]);
  const [checkboxStatus, setCheckboxStatus] = useState({});
  const [botaoClicado, setBotaoClicado] = useState(false);
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

  const somarValoresDoObjeto = (objeto) => {
    let soma = 0;
  
    // Percorrer as propriedades do objeto e adicionar os valores
    for (const chave in objeto) {
      if (objeto.hasOwnProperty(chave)) {
        soma += objeto[chave];
      }
    }
  
    return soma;
  };
  console.log(dados)
  const handleClick = () => {
    
    const novos_dados = {}
    let linha = 0;
    for (linha in selectedLinhas){
      
      novos_dados[selectedLinhas[linha].value] = {}
    }
   
    linha = 0;
    let coluna = 0;
    for(linha in novos_dados){
      for (coluna in selectedColunas){
        novos_dados[linha][selectedColunas[coluna].value] = dadosCopia[linha][selectedColunas[coluna].value]
      
      }
      
    }
    for(linha in novos_dados){
      novos_dados[linha]["Total"] =   somarValoresDoObjeto(novos_dados[linha])
    }
    const total = {}
    for( linha in selectedLinhas){
      for (coluna in selectedColunas){
        if (total[selectedColunas[coluna].value] == undefined){
          total[selectedColunas[coluna].value] = dadosCopia[selectedLinhas[linha].value][selectedColunas[coluna].value]
        }else{
          total[selectedColunas[coluna].value] += dadosCopia[selectedLinhas[linha].value][selectedColunas[coluna].value]
        }
      }
   
      

    }
    
    total["Total"] = somarValoresDoObjeto(total)
    const novo_total = {"Total": total["Total"], ...total}

    console.log(novo_total)
    novos_dados["Total"] = total
  
    setDadosExemplo(novos_dados)


  };


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


  const doencas_copia = Object.keys(dadosCopia);
  let hospitais_copia = [];

  for (let i = 0; i < doencas_copia.length ; i++){
    hospitais_copia = [...hospitais_copia, ...Object.keys(dadosCopia[doencas_copia[i]]).filter((item) => !hospitais_copia.includes(item))]
  }
  const hospitalOptions = []
  for (let i = 0; i < hospitais_copia.length; i++){
    hospitalOptions.push({"value": hospitais_copia[i], "label": hospitais_copia[i]})
  }


  const doencasOptions = []
  for (let i = 0; i < doencas_copia.length; i++){
    doencasOptions.push({"value": doencas_copia[i], "label": doencas_copia[i]})
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

        <button onClick={handleClick} className='btn_update' >Atualizar tabela</button>

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
