import React from 'react';

function TabelaCondicao({ dados }) {
  // Obtenha uma lista de todas as farmacêuticas
  const farmaceuticas = Object.keys(dados);

  // Obtenha uma lista de todas as doenças
  const doencas = Object.keys(dados[farmaceuticas[0]]);

  return (
    <table>
      <thead>
        <tr>
          <th>Farmacêutica</th>
          {farmaceuticas.map((farmaceutica, index) => (
            <th key={index}>{farmaceutica}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {doencas.map((doenca, index) => (
          <tr key={index}>
            <td>{doenca}</td>
            {farmaceuticas.map((farmaceutica, index) => (
              <td key={index}>{dados[farmaceutica][doenca]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TabelaCondicao;
