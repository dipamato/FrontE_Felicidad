import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";

function CabeceraRecursos1() {
  const boldTextStyle = {
    fontWeight: "bold",
  };

  return (
    <>
      <Card className="custom-card1">
        <CardTitle className="tituloCardC">HAW </CardTitle>
        <CardTitle className="tituloCardC">Happiness At Work </CardTitle>
        <CardTitle className="tituloCardC">Felicidad en el Trabajo</CardTitle>

        <CardBody>
          <CardText>
            Con el propósito de contribuir con el sostenimiento y/o mejoramiento
            de la felicidad en el trabajo de los profesores, a continuación
            encontrará una serie de preguntas relacionadas con aspectos
            institucionales que han sido identificados en la literatura como
            generadores de felicidad en el trabajo, por lo anterior lo invitamos
            a diligenciarlas con sinceridad.
            <br />
            <br />
            Recuerde: Que la información que está aportando es 100% confidencial y anónima, y su finalidad es académica, además permitirá suministrar recomendaciones generales a la institución educativa 
            <br />
            <br />
            Nota: Esta información será confidencial entre instituciones, es decir en ningún momento otra institución conocerá los resulados de esta medición.
            <br />
            <br />
            <div style={boldTextStyle}>
            Teniendo en cuenta la siguiente escala, indique con qué frecuencia se encuentra en su trabajo con las situaciones que se describen a continuación.
            </div>
            <br />
            <br />
            <ol style={boldTextStyle}>
            <li> Totalmente en desacuerdo</li>
                  <li> Bastante en desacuerdo</li>
                  <li> En desacuerdo</li>
                  <li> Ni de acuerdo, ni desacuerdo</li>
                  <li> De acuerdo</li>
                  <li> Bastante de acuerdo</li>
                  <li> Totalmente de acuerdo</li>
            </ol>
          </CardText>
        </CardBody>
      </Card>
    </>
  );
}

export default CabeceraRecursos1;
