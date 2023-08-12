import { useState, useRef } from 'react'
import styles from './Cadastro_hospital.module.css'


function Cadastro_hospital({setInp, setValueHospital, valueHospital, setCadastro}){
    const  inputRef = useRef()
   
 
    const sendData = {
        hospital: valueHospital
    }
    const cadastro_hospital= () => {
        fetch("http://localhost:5000/cadastros/hospitais", {
            method: "POST",
            body: JSON.stringify(sendData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(response  => {
           
            inputRef.current.value = ""
            setValueHospital("")
            if(response['response'] == 'Hospital já registrado!'){
                alert(response['response'])
            }else{
                setCadastro(false)
                alert(response['response'])}
            })
            
        .catch(err => console.log(err))

    }
    return (
        <>

            <div className={styles.container}>
                <input ref={inputRef} onChange={e => setValueHospital(e.target.value)} className={styles.input} type="text" placeholder ="Digite o nome do novo hospital" ></input>
                <button onClick={cadastro_hospital} className={styles.button} >Cadastrar</button>
            </div>
        
        </>
    )
}

export default Cadastro_hospital