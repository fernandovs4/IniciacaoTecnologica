import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BarChart from "../components/BarChart";
import ChartFases from "../components/ChartFases";
import ChartClinicasEstudos from "../components/ChartClinicasEstudos";
import ChartLineHospitais from "../components/ChartLineHospitais";
const Dashboard = () => {

    const [chartData, setChartData] = useState({})
    const [qtdEstudos, setQtdEstudos] = useState(0)
    const [tiposEstudos, setTiposEstudos] = useState([])
    const [dataLine, setDataLine] = useState({})
    useEffect(() => {
        fetch('http://localhost:5000/dashboard', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            const anos = []
            setTiposEstudos(data['tipos_estudos'])
            setQtdEstudos(data['qtd_estudos'])
            setDataLine(data['qtd_estudos_por_ano_por_clinica'])
            const labels = [{
                label: 'quantidade de estudos por ano',
                data: [],
                borderWidth: 4
            }]
            
            for(const key in data['qtd_estudos_por_ano']){
                anos.push(key)   
                labels[0].data.push(data['qtd_estudos_por_ano'][key])
            }
            setChartData({
                labels: anos,
                datasets: labels

            })

        })
    }, [])
  
    return (
        <div>
            <div className="header">
                <div className="dashboard-header-links">
                    <Link className="dashboard-header-link" to="/">Home</Link>
                    <Link className="dashboard-header-link" to="/buscador">Buscador</Link>
                    <Link className="dashboard-header-link" to="/tabela">Tabelas</Link>
                </div>
            </div>
            <div className="content">
                <div className="content_first" >
                    <div className="card_qtd_estudos">
                            <h2>Total de estudos</h2>
                            <h1>{qtdEstudos}</h1>
                            <h5>Completed: {tiposEstudos['Completed']}</h5>
                            <h5>Terminated: {tiposEstudos['Terminated']} </h5>
                            <h5>Withdrawn: {tiposEstudos['Withdrawn']} </h5>
                            <h5>Recruiting: {tiposEstudos['Recruiting']} </h5>
                            <h5>Active, not recruiting: {tiposEstudos['Active, not recruiting']} </h5>
                            <h5>Not yet recruiting: {tiposEstudos['Not yet recruiting']} </h5>
                            <h5>Enrolling by invitation: {tiposEstudos['Enrolling by invitation']} </h5>
                            <h5>Suspended: {tiposEstudos['Suspended']} </h5>
                            <h5>Available: {tiposEstudos['Available']} </h5>
                        </div>
                    <div className="graficoFase">
                        {
                            (chartData.labels) ? <BarChart chartData={chartData} /> : (<div>Carregando...</div>)
                        }
                    
                    
                    </div>

                    <div>
                        <ChartFases />
                    </div>

                </div>
                <div className="content_second">
                    <ChartClinicasEstudos />
                    <div className="content_third">
                        hospitais com maiores quantidades de estudos
                    { (Object.keys(dataLine).length > 0) ? <ChartLineHospitais data={dataLine} /> : (<div>Carregando...</div>)}
                </div>
                </div>
                
            </div>
        </div>
    )
      
}

export default Dashboard;
