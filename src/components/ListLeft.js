import { useEffect } from 'react'
import Container from './Container'
import styles from './ListLeft.module.css'
import SemRegistros from './SemRegistros'
function ListLeft(props) {
    const handleClick = (hospital) => {
        props.setHospitaisNaoSelecionados(props.hospitaisEncontrados.filter(el => el != hospital))
        props.setHospitaisSelecionados([hospital, ...props.hospitaisSelecionados])
      
    };



    return (
        (props.hospitaisEncontrados.length > 0 ?(
            <ul className={styles.ul}>
            {props.hospitaisEncontrados.map((hospital, i) => (
                <li 
                    key={i}
                    className={styles.li}
                    onClick={() => handleClick(hospital)}   
                >
                    {hospital}
                </li>
            ))}
        </ul>

        ): (
           
               <SemRegistros></SemRegistros>
          
        )
        )
        )
        
    
}


export default ListLeft