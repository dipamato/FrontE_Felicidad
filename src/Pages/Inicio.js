import { useNavigate } from "react-router-dom";
import React from "react";

import survey from "./../survey.gif";

function Inicio() {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/Selecciona`);
  }
  return (
    <>
      <div className="container">
        <div className="primary box1">
          ⚠️⚠️ Usted es libre de no participar o de retirarse cuando lo desee.
          Sus opiniones y aportes a esta investigación se usarán exclusivamente
          para este proyecto y se archivarán de manera segura.⚠️⚠️
        </div>
        <div className="secondary box2">
          <div className="column">
            <p className="text">
              {" "}
              Lo invitamos a participar en la investigación: "Felicidad en el
              trabajo, causas y aportes para las organizaciones", enmarcada
              dentro del Grupo de Investigación Cultura de la Calidad en la
              Educación y del Doctorado en Administración de la Universidad
              Nacional de Colombia Sede Manizales y tiene una finalidad
              solamente académica.
            </p>
          </div>
          <div className="column">
            <img className="image" src={survey} alt="confi" />
          </div>
          <div className="column">
            <p className="text">
              {" "}
              Con el diligenciamiento del siguiente cuestionario, usted podrá
              conocer su nivel de felicidad en su trabajo actual.
            </p>
            <p className="text">
              {" "}
              De acuerdo con las normativas éticas para este tipo de
              investigación...
            </p>
          </div>
          <div className="secondary1 box2">
            <div className="columnsec1">
              <pre>Su participación será:</pre>
              <ul>
                <li>Totalmente voluntaria</li>
                <li>100% Confidencial.</li>
                <li>100% Anónima</li>
              </ul>
            </div>

            <div className="columnsec1">
              <pre> Respecto a los resultados:</pre>
              <pre
                style={{ color: "green", fontSize: "8px", textAlign: "right" }}
              >
                - Se presentarán de forma general y consolidada a nivel
                institucional o por centro.
              </pre>
              <pre style={{ color: "green" }}>
                {" "}
                sirviendo de base para la elaboración de artículos y trabajos
                netamente académicos.{" "}
              </pre>
              <pre style={{ color: "green" }}>
                {" "}
                - Servirá para suministrarle recomendaciones su organización
                para que si desea,
              </pre>
              <pre style={{ color: "green" }}>
                {" "}
                emprenda acciones para el mejoramiento y sostenimiento de esta.
              </pre>
            </div>

            <div className="columnsec1">
              <pre> Respeto al almacenamiento de los datos:</pre>
              <pre style={{ color: "red" }}>
                {" "}
                Siempre estarán en custodia...
              </pre>
            </div>
          
          </div>
          
        </div>
        <div className="final">
            <p className="text">
            Estoy muy agradecido de que me haya permitido explicarle este
            proyecto. <br/>Si lo desea puede contactarme en el siguiente correo
            electrónico:{" "}
            <p  className="text" style={{ textAlign:'center', color: "white", textDecoration: "underline" }}>
              paerazom@unal.edu.co
            </p>
            </p>
            </div>
            <div >
        <p className="text">Al darle click en diligenciar la encuesta esta aceptando los terminos anteriores</p>
        <button  className="boton" onClick={handleClick} >
     DILIGENCIAR ENCUESTA
    </button>
      </div>
      </div>

   

    </>
  );
}

export default Inicio;
