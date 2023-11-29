import React from "react";
import {
  Button,
  Label,
  CardBody,
  Container,
  Card,
  CardText,
  Row,
  Col,
} from "reactstrap";
import logo from "./../peoplesmall.png";
import logo1 from "./../flecha.png";
import { useNavigate } from "react-router-dom";

function TextInfo() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/Selecciona`);
  }

  return (
    <>
      <Container className="containerTextInfo">
        <Row style={{ marginBottom: "45px", paddingTop: "45px" }}>
          <Col className="col-sm-4" style={{display:"flex", justifyContent:"center",alignItems:"center" }}>
            <img style={{ marginLeft: "0px" }} src={logo} alt="Logo" />
          </Col>
          <Col style={{display:"flex", justifyContent:"center",alignItems:"center" }} className="col-sm-4">
            <Card className="CardInfos">
              <CardBody>
                <CardText>
                  Su participación será:
                  <br />
                  <br />
                  <ul>
                    <li>Totalmente voluntaria</li>
                    <li>100% Confidencial.</li>
                    <li>100% Anónima</li>
                  </ul>
                </CardText>
              </CardBody>
            </Card>
            </Col>
            <Col  style={{display:"flex", justifyContent:"center",alignItems:"center" }}className="text-center col-sm-1">
            <img style={{width:"70%",marginLeft: "0px", }}src={logo1} alt="Logo1" />
          </Col>
          <Col style={{display:"flex", justifyContent:"center",alignItems:"center" }} className="col-sm-3">
            <a style={{textDecoration:"none"}} href="https://docs.google.com/document/d/1eFOLHm4ox3RUQiSZbxeBrCzTRB6XeYIPLBwUTkluA-g/edit">
              <Card className="CardInfos1">
                <CardBody>
                  <CardText>Leer consentimiento Informado</CardText>
                  <CardText>CLICK AQUI</CardText>
                </CardBody>
              </Card>
            </a>
          </Col>
        </Row>

        <Label>
          Al darle click en diligenciar la encuesta esta aceptando los términos
          anteriores
        </Label>
        <Button className="botonInfo" onClick={handleClick}>
          DILIGENCIAR ENCUESTA
        </Button>
      </Container>
    </>
  );
}

export default TextInfo;
