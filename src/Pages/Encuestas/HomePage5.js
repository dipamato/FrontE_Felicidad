import CabeceraAux from "../../Components/CabeceraAux";
import Tabla from "../../Components/Tabla";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import React from 'react';
import { Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';

/** BLOQUE DE "Autonomía en el trabajo" */

function HomePage5() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [datosP, setDatosP] = useState([]);
  const [dato, setDato] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      .then((data) => {
        console.log(data);

        // Realizar la segunda consulta al servidor
        fetch(`${apiUrl}/respuestas-e/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setDato(data.Escalas);

            const factors = [];

            // Recorrer los datos y almacenar los factores en un array
            data.Escalas.forEach((x) => {
              if (x.Dimension === "Autoaceptación en el trabajo") {
                x.Preguntas.forEach((j) => {
                  factors.push(j.Factor);
                });
              }
            });

            const checkForZero = () => {
              let hasZero = false;
          
              factors.forEach((item) => {
                if (item === 0) {
                  hasZero = true;
                }
              });
          
              if (hasZero) {
                setIsModalOpen(true);
              } else {
                navigate(`/Responda6/${id}`);
              }
            };

            
          
            checkForZero()

          })
           
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(56, 160, 165, 0.5)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      maxWidth: "400px",
      width: "100%",
      padding: "20px",
      backgroundColor: "#485767",
      border: "none",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      color: "#ebeff1", // Asegúrate de que el color del texto sea legible
    },
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <Container className="containerOpciones">
     
      {datosP.map((x) => ( // EL ARREGLO ESCALAS LO MAPEA PARA SELECCIONAR SOLO EL ARREGLO PREGUNTAS Y ENVIARLO A LA TABLA
       
       x.Dimension==="Autoaceptación en el trabajo"?(
        <Tabla data={x.Preguntas} idEncu={id} title={"En mi trabajo y con respecto a mi trabajo..."} />
        ) : null
        
        
      ))}
      <button onClick={handleButtonClick}  className="botonoptions "> {">>"}  </button>
      <Modal
          style={customStyles}
          isOpen={isModalOpen}
          onRequestClose={closeModal}
        >
          <h2 style={{ textAlign: "center", fontFamily: "Kalam bold" }}>
            HAW{" "}
          </h2>
          <h4 style={{ textAlign: "center", fontFamily: "Kalam " }}>
            Felicidad en el trabajo
          </h4>
          <p
            style={{
              textAlign: "center",
              fontFamily: "Kalam ",
              fontSize: "18px",
            }}
          >
            🚫 Responde todas las preguntas! 🚫
          </p>
          
         
        <button className="botonModal" onClick={() => setIsModalOpen(false)}>Cerrar</button>
      </Modal>
      </Container>
      </>
  );
}

export default HomePage5;
