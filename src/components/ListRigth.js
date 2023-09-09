import Container from './Container'
import styles from './ListRight.module.css'
function ListRight(props) {
    const handleClick = (hospital) => {
        props.setHospitaisSelecionados(props.hospitaisSelecionados.filter(el => el != hospital))
        props.setHospitaisNaoSelecionados([hospital, ...props.hospitaisEncontrados])
    }
    return (
        <ul className={styles.ul} > 
            {props.hospitaisSelecionados.map((hospital, i) => (
                <li
                    key={i}
                    onClick={() => handleClick(hospital)}
                    className={`${props.hospitaisNoBancoDeDados.includes(hospital)? 'registrado': 'selecionado'} ${styles.li}`}
                    // onClick={() => toggleHospitalSelection(hospital)}
                >
                    {hospital}
                </li>
            ))}
        </ul>
    );
}

export default ListRight