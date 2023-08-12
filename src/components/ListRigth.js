import Container from './Container'
import styles from './ListRight.module.css'
function ListRight({ hospitaisSelecionados, toggleHospitalSelection }) {
  
    return (
        <ul className={styles.ul} > 
            {hospitaisSelecionados.map((hospital) => (
                <li
                    key={hospital}
                    className={`selecionado ${styles.li}`}
                    onClick={() => toggleHospitalSelection(hospital)}
                >
                    {hospital}
                </li>
            ))}
        </ul>
    );
}

export default ListRight