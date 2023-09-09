import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "select2";
import styles from './Select.module.css'

const Select = (props) => {
  const [dropdownHospitais, setDropdownHospitais] = useState([])
 

  useEffect(() => {
    fetch("http://localhost:5000/cadastros/hospitais", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setDropdownHospitais(response["hospitais"]);
      });
  }, [props.setControle])


useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/hospitais?hospital=${props.selectedHospital}&hospital-selecionado=${props.selectedHospital}`);
          const data = await response.json();
          console.log(data)
          props.setHospitaisRegistrados([...data['hospitais_registrados']]);
          props.setHospitaisSelecionados([ ...data['hospitais_registrados'].filter(el => !props.hospitaisSelecionados.includes(el))]);
          props.setHospitaisNoBancoDeDados([...data['hospitais_registrados']])
          props.setHospitaisNaoSelecionados(
            [...data['hospitais_encontrados']['hospitais']].filter(
              el => !props.hospitaisSelecionados.includes(el) && !data['hospitais_registrados'].includes(el)
            )
          );
                  } catch (err) {
          console.log(err);
        }
      };
  
      if (props.selectedHospital !== "") {
        fetchData();
      }
  }, [props.selectedHospital]);
  
  const Select2 = useRef();



  useEffect(() => {
    $(Select2.current).select2();

    // Atualizar o valor selecionado no select2 quando selectedHospital mudar
    if (props.selectedHospital) {
      $(Select2.current).val(props.selectedHospital).trigger("change");

    }

    // Adicionar um ouvinte para o evento "change" do Select2
    $(Select2.current).on("change", function (e) {
      props.setSelectedHospital(e.target.value);
      
    });

  
  }, [props.selectedHospital]);

  return (
    <div className={styles.container} >
       <select ref={Select2} id="mySelect" defaultValue={props.selectedHospital}>
      <option value="">Selecione um hospital</option>
      {dropdownHospitais.map((el, i) => (
        <option key={i} value={el}>
          {el}
        </option>
      ))}
    </select>

    </div>
   
  );
};

export default Select;
