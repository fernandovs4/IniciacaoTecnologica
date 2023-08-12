import styles from './SendSelected.module.css'

function SendSelected({hospitaisSelecionados,selectedHospital, setHospitaisSelecionados}){
    const enviarSelecionados  = () =>  {
        const sendData = {
            [selectedHospital]: hospitaisSelecionados
        }

        console.log(JSON.stringify(sendData))

         fetch("http://localhost:5000/apelidos", {
            method:"POST",
            body:JSON.stringify(sendData),
            headers: {
                "Content-Type": "application/json", // Definir o Content-Type como JSON
              }
         })
         .then(response => response.json())
         .then(response => {
 
            alert("Hospitais atualizados com sucesso!")
            window.location.reload()
         })
         .catch(error => console.log(error))
    }

    return (
        <div className={`${styles.button} ${styles.cursor}`  } onClick={enviarSelecionados} >
            Atualizar selecionados
        </div>
       
    )
}
export default SendSelected
