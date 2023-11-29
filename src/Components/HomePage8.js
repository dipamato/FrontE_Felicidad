import React from 'react';
import TablaRecursos from "../../Components/TablaRecursos";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container } from "reactstrap";
/** BLOQUE DE "Autonomía en el trabajo" */

function HomePage8() {
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
        setDatosP(datos.RecursosCol); // EL RESULTADO DE LA CONSULTA ES UN OBJETO, POR LO TANTO SE SELECCIONA SOLO EL ARREGLO ESCALAS
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
  
  let preguntasH = [];

  // Recorrer los datosP y agregar las preguntas correspondientes a la matriz
  datosP.forEach((x) => {
    if (
      x.Caso === 1
    ) {
      preguntasH.push(x);
    }
  });
  
  // Renderizar la tabla con la matriz de preguntas
  return (
    <>
      <Container className="containerOpciones">
        <TablaRecursos data={preguntasH} idEncu={id}/>
        <button onClick={handleButtonClick} className="botonoptions">
          <Link className="linkencuesta" to={`/Datos/${id}`}>
            Continuar
          </Link>
        </button>
      </Container>
    </>
  );
  
}

export default HomePage8;
