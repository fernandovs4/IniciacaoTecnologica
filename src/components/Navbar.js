import { Link } from 'react-router-dom';
import Select from './Select';
import styles from './Navbar.module.css';
import { useState } from 'react';
import Cadastro_hospital from './Cadastro_hospital';
import SelecaoHospitais from './SelecaoHospitais';

const Navbar = ({setControle, setHospitais, setValueHospital, valueHospital}) => {
  let [cadastro, setCadastro] = useState(false)
  let [selecaoHospitais, setSelecaoHospitais] = useState(false)
  const cadastrar_novo_hospital  = ()=> {
    setCadastro(!cadastro)
    
  }
  const handleClickSelecaoHospitais = ()=>{
      setSelecaoHospitais(!selecaoHospitais)
    }

  return (
    !cadastro ? (
      <div className={styles.navbar} >

    
    <div className={styles.buscadaor_header_container}>
      <div className={styles.buscadaor_header_search}>
        <Link className={styles.link} to="/">
          Home
        </Link>
        <Link className={styles.link} to="/tabela">
          Tabela
        </Link>
      
      
        <button className={styles.link} onClick={handleClickSelecaoHospitais} >Seleção Hospitais</button>
        <button className={styles.link} onClick={cadastrar_novo_hospital} > Cadastrar novo hospital</button>
        {selecaoHospitais && (
          <div> <SelecaoHospitais setHospitais= {setHospitais} setValueHospital = {setValueHospital}  valueHospital = {valueHospital}></SelecaoHospitais> </div>
        )}
        <Link className={styles.link} to="/atualizar">
          Atualizar banco
        </Link>
          
        
      </div>
    </div>
    </div>
  ): (
    <div className={styles.navbar} >
    <div className={styles.buscadaor_header_container}>
      <div className={styles.buscadaor_header_search}>
        <Link className={styles.link} to="/home">
          Home
        </Link>
        <Link className={styles.link} to="/tabela">
          Tabela
        </Link>
        
        <button className={styles.link} onClick={handleClickSelecaoHospitais} >Seleção Hospitais</button>
        <button className={styles.link} onClick={cadastrar_novo_hospital} > Cadastrar novo hospital</button>
        {selecaoHospitais && (
          <div> <SelecaoHospitais setHospitais= {setHospitais} setValueHospital = {setValueHospital}  valueHospital = {valueHospital}></SelecaoHospitais></div>
        )}
        <Cadastro_hospital  setControle = {setControle}></Cadastro_hospital>
        
      </div>
    </div>
    </div>

  )
  )
};

export default Navbar;
