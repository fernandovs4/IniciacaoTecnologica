import { useEffect } from 'react'
import Container from './Container'
import styles from './ListLeft.module.css'
function ListLeft({setHospitaisNaoSelecionados , setHospitaisSelecionados ,hospitaisEncontrados, hospitaisSelecionados}) {
    const handleClick = (hospital) => {
        setHospitaisNaoSelecionados(hospitaisEncontrados.filter(el => el != hospital))
        setHospitaisSelecionados([hospital, ...hospitaisSelecionados])
    };



    return (
        <ul className={styles.ul}>
            {hospitaisEncontrados.map((hospital) => (
                <li 
                    key={hospital}
                   
                    onClick={() => handleClick(hospital)}
                >
                    {hospital}
                </li>
            ))}
        </ul>
    );
}


export default ListLeft