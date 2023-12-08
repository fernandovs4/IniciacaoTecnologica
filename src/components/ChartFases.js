import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#34495e', '#1abc9c'];

const ChartFases = () => {
  const [dados, setDados] = useState({});
  const [selectedFase, setSelectedFase] = useState("fase 3");
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/construirTabela?&stdage=todas&fase=todas&gender=todas&tipo=fase_condicao&inversed=false&simetric=false&sort_externo=true&sort_interno=true', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {

        let dd = {};

        for (const key in data) {
          const fase = data[key];
          const novo_dd = {};
          let i = 0;

          for (const key2 in fase) {
            if (i === 0) {
              i++;
              continue;
            }
            if (i < 9) {
              novo_dd[key2] = fase[key2];
            }
            i++;
          }

          dd[key] = novo_dd;
        }

        setDados(dd);
      })
  }, []);

  useEffect(() => {
    if (Object.keys(dados).length > 0) {
      setChartData(generateChartData(selectedFase));
    }
  }, [dados, selectedFase]);

  function generateChartData(fase) {
    const color = colors.pop();
    const dataset = {
      label: fase,
      backgroundColor: color,
      data: Object.values(dados[fase])
    };

    return {
      labels: Object.keys(dados[fase]),
      datasets: [dataset]
    };
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    title: {
      display: true,
      text: 'Quantidade de estudos por doença'
    },
    scales: {
      x: {
        stacked: false,
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        stacked: false
      }
    }
  };

  const handleFaseChange = (e) => {
    const selectedFase = e.target.value;
    setSelectedFase(selectedFase);
  };

  return (
    <div>
      <div>
        estudos por fase <br/>
        <select onChange={handleFaseChange} value={selectedFase}>
          {Object.keys(dados).map((fase) => (
            <option key={fase} value={fase}>
              {fase}
            </option>
          ))}
        </select>
      </div>
      <div className='grafico_fase'>
        {chartData.labels ? <Bar data={chartData} options={options} /> : <div>Carregando...</div>} 
        
      </div>
    </div>
  );
};

export default ChartFases;
