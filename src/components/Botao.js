import styles from './Botao.module.css'
const Botao = ({tipo, texto,id})=>{
    return <button className= {styles.buscador_header_btn_pesquisar} type={tipo} id={id} >{texto}</button>
}

export default Botao