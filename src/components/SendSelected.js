import styles from './SendSelected.module.css'

function SendSelected({hospitaisEncontrados, hospitaisSelecionados,selectedHospital, setHospitaisSelecionados}){
    const enviarSelecionados  = () =>  {
        if(hospitaisSelecionados.length == 0 && hospitaisEncontrados.length == 0){
            alert("Nenhum hospital selecionado!")
        }else{
            const resposta =  window.confirm("Confirma o envio dos hospitais selecionados para o hospital " + selectedHospital + " ?")

        if (resposta){
            const sendData = {
                [selectedHospital]: hospitaisSelecionados
            }
    
            
    
             fetch("http://18.223.1.172:5000/apelidos", {
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
       

        }
        
    }

    return (
        <div className={`${styles.button} ${styles.cursor}`  } onClick={() => enviarSelecionados()} >
            Salvar selecionados
        </div>
       
    )
}
export default SendSelected
