import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import video from "./../Video.mp4";
import { Container, Row, Col } from "reactstrap";
import TextInfo from "./../Components/TextInfo";

function Ppal() {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  function handleLoadedMetadata() {
    videoRef.current.controls = true;
  }

  function handleVideoEnded() {
    navigate("/Info");
  }
  return (
    <>
      <Container
        style={{
          marginBotton: "15px",
          marginTop: "-120px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row className="TituloVideo row">Happiness At Work</Row>
        <Row style={{ marginLeft: "80px", marginRight: "0px" }} className="row">
          <Col  style={{justifyContent:"center",alignItems:"center" }} className="col">
            <video
              className="videoPpal"
              ref={videoRef}
              src={video}
              onLoadedMetadata={handleLoadedMetadata}
            ></video>
            <p
              className="textV1  glowing-effect"
            >
              REPRODUCIR VIDEO
            </p>
          </Col>
          <Col  style={{marginTop: "0px", marginLeft: "0px", marginRight: "0px",display:"flex", justifyContent:"center",alignItems:"center" }}
            className="col-6"
          >
            <p
              style={{
                marginTop: "0px",
                marginLeft: "0px",
                marginRight: "0px",
              }}
              className="textV"
            >
              {" "}
              Lo invitamos a participar en la investigación: "Felicidad en el
              trabajo, causas y aportes para las organizaciones", enmarcada
              dentro del Grupo de Investigación Cultura de la Calidad en la
              Educación y del Doctorado en Administración de la Universidad
              Nacional de Colombia Sede Manizales.
            </p>
          </Col>
        </Row>
      </Container>
      <TextInfo />
    </>
  );
}

export default Ppal;
