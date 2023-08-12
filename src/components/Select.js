import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "select2";

const Select = ({hospitais, setHospitais, selectedHospital, setSelectedHospital, valueHospital }) => {


  useEffect(() => {
    fetch("http://localhost:5000/cadastros/hospitais", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setHospitais(response["hospitais"]);
      });
  }, [valueHospital, setHospitais]);

  const Select2 = useRef();

  useEffect(() => {
    $(Select2.current).select2();

    // Atualizar o valor selecionado no select2 quando selectedHospital mudar
    if (selectedHospital) {
      $(Select2.current).val(selectedHospital).trigger("change");
    }

    // Adicionar um ouvinte para o evento "change" do Select2
    $(Select2.current).on("change", function (e) {
      setSelectedHospital(e.target.value);
    });

  
  }, [selectedHospital]);

  return (
    <select ref={Select2} id="mySelect" value={selectedHospital}>
      <option value="">Selecione um hospital</option>
      {hospitais.map((el, i) => (
        <option key={i} value={el}>
          {el}
        </option>
      ))}
    </select>
  );
};

export default Select;
