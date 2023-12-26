import { useEffect, useState } from "react";
import styles from './SelecaoHospitais.module.css';

function SelecaoHospitais({setHospitais, setValueHospital, valueHospital}) {
    const [hospitaisSelecionados, setHospitaisSelecionados] = useState([]);
    const [hospitaisDaSelecao, setHospitaisDaSelecao] = useState([]);

    useEffect(() => {
        fetch("http://18.223.1.172:5000/cadastros/hospitais", {
            method: "GET",
        })
        .then((response) => response.json())
        .then((response) => {
            setHospitaisDaSelecao(response['hospitais']);
        });
    }, [hospitaisSelecionados]);

    const toggleCheckbox = (hospital) => {
        if (hospitaisSelecionados.includes(hospital)) {
            setHospitaisSelecionados(hospitaisSelecionados.filter(item => item !== hospital));
        } else {
            setHospitaisSelecionados([...hospitaisSelecionados, hospital]);
        }
    }
    const sedData = {
        "hospitais": hospitaisSelecionados
    }
    const deletarSelecionados = () => {
        fetch("http://18.223.1.172:5000/cadastros/hospitais", {
            method:'DELETE',
            body:JSON.stringify(sedData),
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then(response => response.json())
        .then(response => {
            alert("Hospitais deletados com sucesso!")
            setHospitaisSelecionados([])
          setValueHospital([])
          setHospitais([])
            
        })
        .catch(err => console.log(err))
        // Aqui você pode realizar a ação de deleção ou qualquer outra ação necessária
    }

    return (
        <div className={`${styles.container} selecao`}>
            <button className={styles.button} onClick={deletarSelecionados}>Deletar selecionados</button>
            {hospitaisDaSelecao.map(el => (
                <div className={styles.input} key={el}>
                    <input
                        className={styles.cursor}
                        type="checkbox"
                        id={el}
                        name={el}
                        checked={hospitaisSelecionados.includes(el)}
                        onChange={() => toggleCheckbox(el)}
                    />
                    <label className={styles.cursor} htmlFor={el}>{el}</label>
                </div>
            ))}
        </div>
    );
}

export default SelecaoHospitais;
