import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#34495e', '#1abc9c'];

const ChartClinicasEstudos = () => {
  const [dados, setDados] = useState({});
  const [selectedHospital, setselectedHospital] = useState("A.C. Camargo");
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/construirTabela?&stdage=todas&fase=todas&gender=todas&tipo=farma_clinica&inversed=false&simetric=false&sort_externo=true&sort_interno=true', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      let dd = {};
      for (const key in data) {
        const hospital = data[key];
        const novo_dd = {};
        let i = 0;
        for (const key2 in hospital) { 
          if (i < 9) {
            novo_dd[key2] = hospital[key2];
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
      setChartData(generateChartData(selectedHospital));
    }
  }, [dados, selectedHospital]);

  function generateChartData(hospital) {
    const color = colors.pop();
    const dataset = {
      label: hospital,
      backgroundColor: color,
      data: Object.values(dados[hospital])
    };

    return {
      labels: Object.keys(dados[hospital]),
      datasets: [dataset]
    };
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    
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
    const selectedHospital = e.target.value;
    setselectedHospital(selectedHospital);
  };

  return (
    <div>
      <div>
      estudos por centros clínicos <br/>
        <select onChange={handleFaseChange} value={selectedHospital}>
          {Object.keys(dados).map((hospital) => (
            <option key={hospital} value={hospital}>
              {hospital}
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

export default ChartClinicasEstudos;
