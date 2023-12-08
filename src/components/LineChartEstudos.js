import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#34495e', '#1abc9c'];

const LineChartEstudos = () => {
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
        scales: {
        yAxes: [{
            ticks: {
            beginAtZero: true,
            stepSize: 1
            }
        }]
        }
    };
    
    return (
        <div className="chart-container">
        <Line data={chartData} options={options} />
        </div>
    );
    }