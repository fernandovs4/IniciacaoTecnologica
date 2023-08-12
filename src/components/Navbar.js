import { Link } from 'react-router-dom';
import Select from './Select';
import styles from './Navbar.module.css';
import { useState } from 'react';
import Cadastro_hospital from './Cadastro_hospital';
import SelecaoHospitais from './SelecaoHospitais';

const Navbar = ({setHospitais, setInp, setValueHospital, valueHospital}) => {
  let [cadastro, setCadastro] = useState(false)
  let [selecaoHospitais, setSelecaoHospitais] = useState(false)
  const cadastrar_novo_hospital  = ()=> {
    setCadastro(!cadastro)
    
  }
  const handleClickSelecaoHospitais = ()=>{
      setSelecaoHospitais(!selecaoHospitais)
    }

  return (
    !cadastro ? (<div className={styles.buscadaor_header_container}>
      <div className={styles.buscadaor_header_search}>
        <Link className={styles.link} to="/home">
          Home
        </Link>
        <button className={styles.link} onClick={cadastrar_novo_hospital} > Cadastrar novo hospital</button>
        <button className={styles.link} onClick={handleClickSelecaoHospitais} >Seleção Hospitais</button>
        {selecaoHospitais && (
          <div> <SelecaoHospitais setHospitais= {setHospitais} setValueHospital = {setValueHospital}  valueHospital = {valueHospital}></SelecaoHospitais> </div>
        )}
          
        
      </div>
    </div>
  ): (
    <div className={styles.buscadaor_header_container}>
      <div className={styles.buscadaor_header_search}>
        <Link className={styles.link} to="/home">
          Home
        </Link>
        <button className={styles.link} onClick={cadastrar_novo_hospital} > Cadastrar novo hospital</button>
        <button className={styles.link} onClick={handleClickSelecaoHospitais} >Seleção Hospitais</button>
        {selecaoHospitais && (
          <div> <SelecaoHospitais setHospitais= {setHospitais} setValueHospital = {setValueHospital}  valueHospital = {valueHospital}></SelecaoHospitais></div>
        )}
        <Cadastro_hospital setInp={setInp} setValueHospital = {setValueHospital} valueHospital={valueHospital} setCadastro={setCadastro}></Cadastro_hospital>
        
      </div>
    </div>

  )
  )
};

export default Navbar;
