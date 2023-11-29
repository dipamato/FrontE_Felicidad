import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';


function Cabecera() {

  const boldTextStyle = {
    fontWeight: 'bold'
  };

  return (
    <>
    
    <Card className="custom-card"> 

    <CardTitle className="tituloCardC">HAW </CardTitle>
        <CardTitle className="tituloCardC">Happiness At Work  </CardTitle>
        <CardTitle className="tituloCardC">Felicidad en el Trabajo</CardTitle>
     
      <CardBody> 
        
         
        <CardText>A continuación por favor seleccione la opción que más se adapte a su sentir con respecto a su trabajo actual.
        <br/>
        <br/>
        Piense en su lugar actual de trabajo y trate de evaluar de manera consciente y sincera, su grado de acuerdo o de desacuerdo frente a cada uno de los siguientes enunciados. 
        <br/>
        <br/>
Recuerde que ninguna respuesta es correcta o incorrecta, ya que corresponde a su sentir sobre el factor a medir, las respuestas deben reflejar solo sus sentimientos personales sobre el trabajo, y no lo que debería ser, o lo que probablemente puedan pensar sus otros compañeros.
<br/><br/>
<div style={boldTextStyle}>Al momento de contestar, tenga en cuenta que tiene siete opciones de respuesta:</div>
<br/><br/>

<ol style={boldTextStyle}>
                  <li> Totalmente en desacuerdo</li>
                  <li> Bastante en desacuerdo</li>
                  <li> En desacuerdo</li>
                  <li> Ni deacuerdo, ni desacuerdo</li>
                  <li> De acuerdo</li>
                  <li> Bastante de acuerdo</li>
                  <li> Totalmente de acuerdo</li>
                </ol>


        </CardText>
      </CardBody>
    </Card>
    </>
  )
}

export default Cabecera;
