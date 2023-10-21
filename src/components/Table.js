import React from 'react';
import styles from './Table.module.css'; // Importe o arquivo CSS
import * as XLSX from 'xlsx';





const Tabela = ({ dados }) => {

  console.log("aaaaaaaaaaaaaaaaaaaaaa",dados )
  const exportToExcel = () => {
    if (!dados || dados.length === 0) {
      return;
    }

    const ws = XLSX.utils.json_to_sheet(dados, { skipHeader: true }); // Configura skipHeader como true
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tabela');

    XLSX.writeFile(wb, 'tabela.xlsx');
  };

  // Certifique-se de que 'dados' seja uma matriz de objetos com chaves correspondentes às colunas da tabela
  if (!dados || dados.length === 0) {
    return <p>Nenhum dado disponível.</p>;
  }

  const colunas = Object.keys(dados[0]);

  return (
    <div>
      <div className='div_exportar_excel'>
      <button className='exportar_excel' onClick={exportToExcel}>Exportar para Excel</button>

      </div>
    <table className={styles.table} >
      
      <tbody>
        {dados.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {colunas.map((coluna, colIndex) => (
              <td key={colIndex}>{item[coluna]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default Tabela;
