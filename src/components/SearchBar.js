import Select from "./Select"
import styles from './SearchBar.module.css';
function SearchBar({ hospitais, setHospitais,setInput, pesquisar, selectedHospital, setSelectedHospital, valueHospital}){
    

    return(
        <>
         <p className={styles.p}>Pesquisador de apelidos de hospitais</p>
        <div className={styles.container} >
           
            <Select hospitais ={hospitais} setHospitais={setHospitais} selectedHospital = {selectedHospital}  setSelectedHospital ={setSelectedHospital} valueHospital={ valueHospital} />
            <input
            onChange={(e) => setInput(e.target.value)}
            className={styles.input}
            type="text"
            name="text"
            id="buscador_header_input_hospital"
            placeholder="Digite o hospital"
            ></input>
            <button 
            onClick={pesquisar}
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