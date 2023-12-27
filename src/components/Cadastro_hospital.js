import { useState, useRef } from 'react'
import styles from './Cadastro_hospital.module.css'
import host from '../constantes'

function Cadastro_hospital(props){
    
    const [valueHospital,setValueHospital] = useState("")
    
    const sendData = {
        hospital: valueHospital
    }
    const cadastro_hospital= () => {
        fetch(host + "/cadastros/hospitais", {
            method: "POST",
            body: JSON.stringify(sendData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(response  => {
                alert("Hospital cadastrado com sucesso!")
                props.setControle(false)
            })
            
        .catch(err => console.log(err))

    }
    return (
        <>

            <div className={styles.container}>
                <input onChange={e => setValueHospital(e.target.value)} className={styles.input} type="text" placeholder ="Digite o nome do novo hospital" ></input>
                <button onClick={cadastro_hospital} className={styles.button} >Cadastrar</button>
            </div>
        
        </>
    )
}

export default Cadastro_hospital