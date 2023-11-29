import ef from "./../ef.svg";
import Cabecera from "../../Components/Cabecera";
import Tabla from "../../Components/Tabla";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import React from 'react';



function HomePage() {
  const apiUrl= process.env.REACT_APP_API_URL
  const [datosP, setDatosP] = useState([]);
  const { id } = useParams();
/** CONSULTA A LA BD QUE TRAE EL RESULTADO DE LA ENCUESTA CON TODOS LOS CAMPOS, DESDE EL OBJETO RESPUESTASE */
  useEffect(() => {
    fetch(`${apiUrl}/respuestas-e/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((datos) => {
        setDatosP(datos.Escalas); // EL RESULTADO DE LA CONSULTA ES UN OBJETO, POR LO TANTO SE SELECCIONA SOLO EL ARREGLO ESCALAS
      });
  }, [id]);
  
  /** SE USA EL USEEFFFECT PARA SINCRONIZAR EL ESTADO Y EL VALOR DEL ESTADO DATOS P */
  useEffect(() => {
  }, [datosP]);

  function handleButtonClick() {
    fetch(`${apiUrl}/respuestas-e/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
  

  return (
    <Container>
      <Cabecera />
      {datosP.map((x) => ( // EL ARREGLO ESCALAS LO MAPEA PARA SELECCIONAR SOLO EL ARREGLO PREGUNTAS Y ENVIARLO A LA TABLA
        
        <Tabla data={x.Preguntas} idEncu={id} />
        
      ))}
      <button onClick={handleButtonClick}  class="boton"><Link to="/Datos">Enviar</Link></button>
    </Container>
  );
}

export default HomePage;
