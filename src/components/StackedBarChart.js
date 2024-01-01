import React from 'react';
import { Bar } from 'react-chartjs-2';


const StackedBarChart = ({dados}) => {
  // Extrair anos e clínicas dos dados
  const anos = Array.from(
    new Set(Object.values(dados).flatMap(clinica => Object.keys(clinica)))
  );
  const clinicas = Object.keys(dados);
  const cores = ['rgba(255,0,0,0.6)', 'rgba(0,255,0,0.6)', 'rgba(0,0,255,0.6)']
  // Inicializar dados para o Chart.js
  const data = {
    labels: anos,
    datasets: clinicas.map((clinica, i) => ({
      label: clinica,
      data: anos.map(ano => dados[clinica][ano] || 0),
      backgroundColor: cores[i] ,
      borderColor: 'white',
      borderWidth: 1,
    })),
  };

  // Configurações do gráfico
  const options = {
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

// Função auxiliar para gerar cores aleatórias
const getRandomColor = () => `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.6)`;

export default StackedBarChart;
