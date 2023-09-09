import Select from "./Select"
import styles from './SearchBar.module.css';
import { useEffect, useRef } from "react";
function SearchBar(props){
    const campo_input = useRef();
    const atualiza_input = ()=> {
        console.log("entrou " , campo_input.current)
        campo_input.current.value = props.selectedHospital;
    }
    useEffect(()=>{
        atualiza_input()
    },[props.selectedHospital])
 
    return(
        <>
        
        <div className={`${styles.container} ${props.customClass != undefined? 'displayBlock': '' }`} >
            <input
            ref={campo_input}
            onChange={(e) => props.setPesquisadorPalavraChave(e.target.value)}
            className={styles.input}
            type="text"
            name="text"
            id="buscador_header_input_hospital"
            placeholder="Palavras chaves"
            ></input>
            <button 
            onClick={() => props.pesquisarPalavraChave()}
            className={styles.pesquisar}
            type="submit"
            id="buscador_header_btn_pesquisar"
            >
            Pesquisar
            </button>
        </div>
        </>
       
    )
}


export default SearchBar