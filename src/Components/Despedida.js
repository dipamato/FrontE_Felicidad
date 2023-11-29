import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Row, 
  Col
} from "reactstrap";
import logo from "./../logoHaw7.png";

function Despedida() {
  const boldTextStyle = {
    fontWeight: "bold",
  };
  const navigate = useNavigate();

  const handleButtonClick = (buttonNumber) => {
    console.log(`Button ${buttonNumber} clicked`);
    // Puedes agregar aquí la lógica que deseas ejecutar cuando se hace clic en un botón
    switch (buttonNumber) {
      case 1:
        navigate(`/Choose`);
        break;
      
        case 2:
          navigate(`/Choose1`);
        break;
        case 3:
          navigate(`/Choose2`);
        break;
        case 4:
          navigate(`/Choose3`);
        break;
    
      default:
        break;
    }
  };
  
  return (
    <>
      <Container style={{marginTop:"-70px"}}className="custom-grid">

      <p
                style={{
                  
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                  textShadow: "1px 1px 2.5px rgba(0, 0, 0, 0.5)",
                  fontFamily: "kalam"
                }}
              >
                Opción 1: Diligenciamiento en el Software que permite tener un reporte automático de su
felicidad en el trabajo con la explicación clara de cada dimensión desde los enfoques
científicos de felicidad hedónica y eudaimónica.
              </p>
      
           

              <p
                style={{
                  
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                  textShadow: "1px 1px 2.5px rgba(0, 0, 0, 0.5)",
                  fontFamily: "kalam"
                }}
              >
              Opción 2: En caso de que no desee realizar el diligenciamiento en el software o tenga alguna
dificultad para el diligenciamiento, puede hacerlo en el enlace debajo de cada opción

              </p>
              <p
                style={{
                  
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                  textShadow: "1px 1px 2.5px rgba(0, 0, 0, 0.9)",
                  fontFamily: "kalam"
                }}
              >
              
Nota: El diligenciamiento en la opción 2 no genera reporte de resultados individuales.
              </p>

              <p
                style={{
                  
                  textAlign: "center",
                  fontSize: "30px",
                  fontWeight: "bold",
                  textShadow: "1px 1px 2.5px rgba(0, 0, 0, 0.9)",
                  fontFamily: "kalam"
                }}
              >
                Por favor seleccione la entidad a la que pertenece o el formulario que desea diligenciar
              </p>
              <Row>
  <div className="grid-row">
    <div>
      <button onClick={() => handleButtonClick(1)}>Secretaria de Educación Municipal (MANIZALES)</button>
      <br/>
      <a  className="centered-link" href="https://forms.gle/VrxP78Xrfs5yysxv7">{"⫸ "}Formulario  Manizales Aquí{" ⫷"}</a>
    </div>
    <div>
      <button onClick={() => handleButtonClick(2)}>Secretaria de Educación Departamental (CALDAS)</button>
      <br/>
      <a className="centered-link"  href="https://forms.gle/CwhvS1Y3WBsA9Uki9">{"⫸ "}Formulario Caldas Aquí{" ⫷"}</a>
    </div>
  </div>
</Row>
        <Row>
        <div className="grid-row">
        <div>
        <button onClick={() => handleButtonClick(3)}>SERVICIO NACIONAL DE APRENDIZAJE SENA</button>
        <br/>
      <a  className="centered-link" href="https://forms.gle/YqcP3DEGySRrWwq67">{"⫸ "}Formulario SENA Aquí{" ⫷"}</a>
    </div>
    <div>
        <button onClick={() => handleButtonClick(4)}>OTRAS</button>
        <br/>
        <br/><br/>
      <a className="centered-link" href="https://forms.gle/ftFGfYpa59wqLzHM9">{"⫸ "}Formulario Otras Aquí{" ⫷"}</a>
      </div>
      </div>
        </Row>
      </Container>
    </>
  );
}

export default Despedida;
