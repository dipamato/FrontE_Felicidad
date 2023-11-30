import React, { useRef, useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import {
  Col,
  Row,
  Container,
  Table,
  Card,
  CardBody,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { saveAs } from "file-saver";

function FormPersonaAux1() {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [datosP, setDatosP] = useState([]);
  const [datosUser, setDatosUser] = useState([]);
  const { id } = useParams();
  const [dimension, setDimension] = useState("");
  const [total, setTotal] = useState();
  const [totalAutonomia, setTotalAutonomia] = useState("");
  const [totalDominio, setTotalDominio] = useState("");
  const [totalrecimiento, setTotalCrecimiento] = useState("");
  const [totalRelaciones, setTotalRelaciones] = useState("");
  const [totalProposito, setTotalProposito] = useState("");
  const [totalAutoacepacion, setTotalAutoaceptacion] = useState("");
  const [totalEmocionesTrabajo, setTotalEmocionesTrabajo] = useState("");
  const [totalEmocionesOrganizacion, setTotalEmocionesOrganizacion] =useState("");
  const [totalEmocionesOrganizacionN, setTotalEmocionesOrganizacionN] =useState("");
  const [totalSatisfaccion, setTotalSatisfaccion] = useState("");
  const [totalSatisfaccionN, setTotalSatisfaccionN] = useState("");

  const [totalHawE, setTotalHawE] = useState("");
  const [totalHawH, setTotalHawH] = useState("");
  const [totalEudanamonica, setTotalEudanamonica] = useState(0);
  const [totalHedonica, setTotalHedonica] = useState(0);
  const [mail, setMail] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [papa, setPapa] = useState("");
  const [codigo, setCodigo] = useState("");
  const [fruta, setFruta] = useState("");
  const [cedula, setCedula] = useState("");
  const [nombres, setNombres] = useState("");
  const [grupos, setGrupos] = useState("");
  const [datosMatriz, setDatosMatriz] = useState("");
  const [datosPersona, setDatosPersona] = useState([]);


  const [pregunta1, setPregunta1] = useState(0);
  const [pregunta2, setPregunta2] = useState(0);
  const [totalDominioN, setTotalDominioN] = useState(0);
  const [totalAutonomiaN, setTotalAutonomiaN] = useState(0);
  const [totalPropositoN, setTotalPropositoN] = useState(0);
  const [totalrecimientoN, setTotalCrecimientoN] = useState(0);
  const [totalRelacionesN, setTotalRelacionesN] = useState(0);
  const [totalAutoacepacionN, setTotalAutoaceptacionN] = useState(0);


  /** numero para la rifa */

  const [usuarios, setUsuarios] = useState([]);
  const [mostrarNumero, setMostrarNumero] = useState(false);
  const [numeroAutoincrementable, setNumeroAutoincrementable] = useState(1);

  const asignarNumeroUnico = () => {
    const nuevoNumero = generarNumeroUnico();
    setUsuarios([...usuarios, { id: usuarios.length + 1, numeroUnico: nuevoNumero }]);
    setNumeroAutoincrementable(nuevoNumero);
  };

  const generarNumeroUnico = () => {
    return Math.floor(Math.random() * 1001) + 1;
  };

 

  useEffect(() => {
    fetch(`${apiUrl}/personas`)
      .then((response) => response.json())
      .then((datos) => {
        setDatosPersona(datos);

        // Verifica si hay alguna persona con el mismo número en la propiedad Rifa
        const existePersonaConNumero =
          Array.isArray(datos) && datos.some((persona) => persona.Rifa === numeroAutoincrementable);

        // Si hay una coincidencia, asigna un nuevo número único
        if (existePersonaConNumero) {
          asignarNumeroUnico();
        }
      });
  }, [numeroAutoincrementable]);

  useEffect(() => {
    fetch(`${apiUrl}/respuestas-e/${id}`)
      .then((response) => response.json())
      .then((datos) => {
        setDatosP(datos.Escalas);
        setDatosMatriz(datos);
      });
  }, [id]);

  useEffect(() => { }, [datosP, datosMatriz]);

  console.log("matriz", datosP);

  async function ActualizarRespuestaCliente(idD, dato) {
    let data = {
      Resultado: dato,
    };
    fetch(`${apiUrl}/user-info/${idD}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  let currentDatosUser;
  useEffect(() => {
    fetch(`${apiUrl}/user-info`)
      .then((response) => response.json())
      .then((datos) => {
        setDatosUser(datos);
        currentDatosUser = datos;
      });
  }, []);

  useEffect(() => { }, [datosUser]);
  console.log("saliendo", datosUser);
  console.log("saliendorevisando", currentDatosUser);

  let currentTotalGeneral = 0;
  let currentTotalGeneralH = 0;
  useEffect(() => {
    console.log(datosP)
    datosP.map((x) => {
      x.Preguntas.map((z) => {



        const currentDimension = x.Dimension;
        console.log("dim", x.Dimension); // borrar
        setDimension(currentDimension);
        const preguntaqueno = z.Numero
        if (preguntaqueno == "E6") {
          console.log(z.Factor)
          setPregunta1(z.Factor)
        } else if (preguntaqueno == "E4") {
          console.log(z.Factor)
          setPregunta2(z.Factor)
        }

        console.log("toteuda", currentTotalGeneral); //borrar
        switch (currentDimension) {
          case "Autonomía en el trabajo":
            console.log("totalitoa", x.Total); //borrar
            const currentTotal = x.Total;
            setTotalAutonomiaN(currentTotal)
            currentTotalGeneral += currentTotal;
            setTotal(currentTotal);

            let currentTotalAutonomia;
            switch (true) {
              case currentTotal >= 18:
                currentTotalAutonomia = `Altos niveles de ${currentDimension}`;
                break;
              case currentTotal > 9 && currentTotal < 18:
                currentTotalAutonomia = `Nivel medio de ${currentDimension}`;
                break;
              case currentTotal <= 9:
                currentTotalAutonomia = `Bajos niveles de ${currentDimension}`;
                break;
              default:
                break;
            }
            console.log("genral total", currentTotal); //borrar
            console.log("totA", currentTotalAutonomia); //borrar
            console.log("totGeneral", currentTotalGeneral); //borrar

            setTotalAutonomia(currentTotalAutonomia);

            setTotalEudanamonica(currentTotalGeneral);
            ActualizarRespuestaCliente(
              "64739c9d5fe33bff7e67c426",
              currentTotalAutonomia
            );

            break;

          case "Dominio Ambiental en el trabajo":
            console.log("totalito", x.Total); //borrar
            const currentTotalD = x.Total;
            setTotalDominioN((currentTotalD - (pregunta1 + pregunta2)))
            currentTotalGeneral += currentTotalD;

            setTotal(currentTotalD);

            let currentTotalDominio;
            console.log(currentTotalD - (pregunta1 + pregunta2))
            switch (true) {

              case (currentTotalD - (pregunta1 + pregunta2)) >= 30:
                currentTotalDominio = `Altos niveles de ${currentDimension}`;
                break;
              case (currentTotalD - (pregunta1 + pregunta2)) > 15 && currentTotalD < 30:
                currentTotalDominio = `Nivel medio de ${currentDimension}`;
                break;
              case (currentTotalD - (pregunta1 + pregunta2)) <= 15:
                currentTotalDominio = `Bajos niveles de ${currentDimension}`;
                break;
              default:
                break;
            }
            console.log("genral total", currentTotalD); //borrar
            console.log("totD", currentTotalDominio); //borrar
            console.log("totGeneral", currentTotalGeneral); //borrar
            setTotalDominio(currentTotalDominio);
            setTotalDominioN(currentTotalD - (pregunta1 + pregunta2))
            setTotalEudanamonica(currentTotalGeneral);
            ActualizarRespuestaCliente(
              "6466c32dd5e66d1f3768d8aa",
              currentTotalDominio
            );

            break;

          case "Crecimiento en el trabajo":
            console.log("totalito", x.Total); //borrar
            const currentTotalC = x.Total;
            setTotalCrecimientoN(currentTotalC)
            currentTotalGeneral += currentTotalC;
            setTotal(currentTotalC);

            let currentTotalCrecimiento;
            switch (true) {
              case currentTotalC >= 36:
                currentTotalCrecimiento = `Altos niveles de ${currentDimension}`;
                break;
              case currentTotalC > 18 && currentTotalC < 36:
                currentTotalCrecimiento = `Nivel medio de ${currentDimension}`;
                break;
              case currentTotalC <= 18:
                currentTotalCrecimiento = `Bajos niveles de ${currentDimension}`;
                break;
              default:
                break;
            }
            console.log("genral total", currentTotalC); //borrar
            console.log("totD", currentTotalCrecimiento); //borrar
            console.log("totGeneral", currentTotalGeneral); //borrar
            setTotalCrecimiento(currentTotalCrecimiento);
            ActualizarRespuestaCliente(
              "6466c34bd5e66d1f3768d8ac",
              currentTotalCrecimiento
            );

            break;

          case "Relaciones positivas en el trabajo":
            console.log("totalito", x.Total); //borrar
            const currentTotalR = x.Total;
            currentTotalGeneral += currentTotalR;
            setTotalRelacionesN(currentTotalR)
            setTotal(currentTotalR);

            let currentTotalRelaciones;
            switch (true) {
              case currentTotalR >= 30:
                currentTotalRelaciones = `Altos niveles de ${currentDimension}`;
                break;
              case currentTotalR > 12 && currentTotalR < 30:
                currentTotalRelaciones = `Nivel medio de ${currentDimension}`;
                break;
              case currentTotalR <= 12:
                currentTotalRelaciones = `Bajos niveles de ${currentDimension}`;
                break;
              default:
                break;
            }
            console.log("genral total", currentTotalR); //borrar
            console.log("totD", currentTotalRelaciones); //borrar
            console.log("totGeneral", currentTotalGeneral); //borrar
            setTotalRelaciones(currentTotalRelaciones);
            ActualizarRespuestaCliente(
              "6466c367d5e66d1f3768d8ae",
              currentTotalRelaciones
            );

            break;

          case "Propósito en el trabajo":
            console.log("totalito", x.Total); //borrar
            const currentTotalP = x.Total;
            setTotalPropositoN(currentTotalP)
            currentTotalGeneral += currentTotalP;
            setTotal(currentTotalP);

            let currentTotalProposito;
            switch (true) {
              case currentTotalP >= 24:
                currentTotalProposito = `Altos niveles de ${currentDimension}`;
                break;
              case currentTotalP > 12 && currentTotalP < 24:
                currentTotalProposito = `Nivel medio de ${currentDimension}`;
                break;
              case currentTotalP <= 12:
                currentTotalProposito = `Bajos niveles de ${currentDimension}`;
                break;
              default:
                break;
            }
            console.log("genral total", currentTotalP); //borrar
            console.log("totD", currentTotalProposito); //borrar
            console.log("totGeneral", currentTotalGeneral); //borrar
            setTotalProposito(currentTotalProposito);
            ActualizarRespuestaCliente(
              "6466c388d5e66d1f3768d8b0",
              currentTotalProposito
            );
            break;

          case "Autoaceptación en el trabajo":
            console.log("totalito", x.Total); //borrar
            const currentTotalAu = x.Total;
            setTotalAutoaceptacionN(currentTotalAu)
            currentTotalGeneral += currentTotalAu;
            setTotal(currentTotalAu);

            let currentTotalAutoaceptacion;
            switch (true) {
              case currentTotalAu >= 36:
                currentTotalAutoaceptacion = `Altos niveles de ${currentDimension}`;
                break;
              case currentTotalAu > 18 && currentTotalAu < 36:
                currentTotalAutoaceptacion = `Nivel medio de ${currentDimension}`;
                break;
              case currentTotalAu <= 18:
                currentTotalAutoaceptacion = `Bajos niveles de ${currentDimension}`;
                break;
              default:
                break;
            }
            console.log("genral total", currentTotalAu); //borrar
            console.log("totD", currentTotalAutoaceptacion); //borrar
            console.log("totGeneral", currentTotalGeneral); //borrar
            setTotalAutoaceptacion(currentTotalAutoaceptacion);
            ActualizarRespuestaCliente(
              "6466c3a8d5e66d1f3768d8b2",
              currentTotalAutoaceptacion
            );
            setTotalEudanamonica(currentTotalGeneral);
            break;


          case "Emociones hacia el trabajo y hacia la organización":
            console.log("totalito", x.Total); //borrar
            const currentTotalEO = x.Total;
            setTotalEmocionesOrganizacionN(currentTotalEO)
            currentTotalGeneralH += currentTotalEO;
            setTotal(currentTotalEO);

            let currentTotalEmocionesOrga;
            switch (true) {
              case currentTotalEO >= 24:
                currentTotalEmocionesOrga = `Altos niveles de ${currentDimension}`;
                break;
              case currentTotalEO < 12 && currentTotalEO > 24:
                currentTotalEmocionesOrga = `Nivel medio de ${currentDimension}`;
                break;
              case currentTotalEO <= 12:
                currentTotalEmocionesOrga = `Bajos niveles de ${currentDimension}`;
                break;
              default:
                break;
            }
            console.log("genral total", currentTotalEO); //borrar
            console.log("totD", currentTotalEmocionesOrga); //borrar
            setTotalEmocionesOrganizacion(currentTotalEmocionesOrga);
            ActualizarRespuestaCliente(
              "647a370a916c2adcefbf4bb4",
              currentTotalEmocionesOrga
            );
            break;

          case "Satisfacción en el trabajo":
            console.log("totalito", x.Total); //borrar
            const currentTotalS = x.Total;
            setTotalSatisfaccionN(currentTotalS)
            currentTotalGeneralH += currentTotalS;
            setTotal(currentTotalS);

            let currentTotalSatisfaccion;
            switch (true) {
              case currentTotalS >= 6:
                currentTotalSatisfaccion = `Altos niveles de ${currentDimension}`;
                break;
              case currentTotalS < 6 && currentTotalS > 3:
                currentTotalSatisfaccion = `Nivel medio de ${currentDimension}`;
                break;
              case currentTotalS <= 3:
                currentTotalSatisfaccion = `Bajos niveles de ${currentDimension}`;
                break;
              default:
                break;
            }
            console.log("genral total", currentTotalS); //borrar
            console.log("totD", currentTotalSatisfaccion); //borrar
            setTotalSatisfaccion(currentTotalSatisfaccion);
            ActualizarRespuestaCliente(
              "647a371f916c2adcefbf4bb6",
              currentTotalSatisfaccion
            );
            setTotalHedonica(currentTotalGeneralH);
            break;
          // Resto de los casos...

          default:
            break;
        }
      })
    });
  }, [datosP]);

  useEffect(() => {
    if (totalHedonica >= 42) {
      setTotalHawH(`Altos niveles de HEDÓNICA  EN EL TRABAJO`);
    } else if (totalHedonica > 21 && totalHedonica < 42) {
      setTotalHawH(`Nivel medio de  HEDÓNICA EN EL TRABAJO`);
    } else {
      setTotalHawH(`Bajos niveles de HEDÓNICA  EN EL TRABAJO`);
    }

    if (totalEudanamonica >= 246) {
      setTotalHawE(`Altos niveles de EUDAIMÓNICA  EN EL TRABAJO`);
    } else if (totalEudanamonica > 123 && totalEudanamonica < 246) {
      setTotalHawE(`Nivel medio de  EUDAIMÓNICA EN EL TRABAJO`);
    } else {
      setTotalHawE(`Bajos niveles de EUDAIMÓNICA  EN EL TRABAJO`);
    }
  }, [totalEudanamonica, totalHedonica]);

  console.log("totEudana", totalEudanamonica); //borrar
  /**##------Metodo que permite la decarga de la tabla en pdf-----##**/
  const tableRef = useRef(null);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Obtener el elemento <table>
    const tableNode = document.getElementById("tabla");

    if (tableNode && tableNode.children) {
      // Crear un elemento <div> temporal
      const tempDiv = document.createElement("div");

      // Insertar el contenido HTML de la tabla en el elemento <div> temporal
      tempDiv.innerHTML = tableNode.innerHTML;

      // Obtener el selector CSS del elemento <table> dentro del <div>
      const tableSelector = "table";

      // Pasar el selector CSS a autoTable()
      doc.autoTable({ html: tableSelector });

      // Guardar el PDF
      doc.save("Resultados Encuesta HAW.pdf");
    }
  };

  /** #### LLAMADO A EL ENVIO DE CORREO, ALMACENAMIENTO DE CODIGO **/

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const uno = papa.substring(0, 3);
    const final = fruta.length - 1;
    const dos = fruta.substring(final - 1, final + 1);

    console.log("fruta", dos); //borrar

    const cod = uno + nacimiento + dos; //CODIGO SE GENERA 3 PRIMERAS LETRAS DEL MES DEL PAPÁ, DIA DE NACIMIENTO Y dos ultimas de frut
    console.log("COD", codigo); //borrar

    const user = {
      Correo: mail,
      Codigo: cod,
    };

    const idP = datosMatriz.Persona;

    const correo = {
      to: mail,
      from: "dipamato@gmail.com",
      subject: "Resultados Encuesta HAW",
      text: "Profesor agradecemos tus respuestas",
    };

    const tabla = document.getElementById("tabla");
    /**GENERACION DEL PDF PARA ENVIAR POR CORREO */
    html2pdf()
      .from(tabla)
      .outputPdf("datauristring", { imageType: "png", quality: 1.0 })
      .then((pdfString) => {
        const data = {
          contenidoTabla: pdfString.split(",")[1], // Obtén el contenido base64 del PDF
        };

        console.log("entrado a enviar correo2");
        //ENVIANDO EL CORREO AL USUARIO
        axios
          .post(
            `${apiUrl}/mail/send`,
            { correo, data },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log("Datos guardados:", response.data);
          })
          .catch((error) => {
            console.error("Error al guardar los datos:", error);
          });
      });
    //MODIFICANDO EL USUARIO CON EL CODIGO Y EL CORREO
    axios
      .patch(`${apiUrl}/persona/${idP}`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Datos guardados:", response.data);
        alert("Gracias por aceptar la invitación 1!!!");
      })
      .catch((error) => {
        console.error("Error al guardar los datos:", error);
      });
    // Limpiar los campos del formulario
    setMail("");
    setNacimiento("");
    setFruta("");
    setPapa("");
  };
  const handleSubmitForm2 = (e) => {
    e.preventDefault();

    // Asignar un nuevo número único
    const nuevoNumero = generarNumeroUnico();

    const user = {
      Rifa: nuevoNumero,
    };

    const idP = datosMatriz.Persona;

    // MODIFICANDO EL USUARIO CON EL CÓDIGO Y EL CORREO
    axios
      .patch(`${apiUrl}/persona/${idP}`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Datos guardados:", response.data);
        // Actualizar el número autoincrementable en el estado
        setNumeroAutoincrementable(nuevoNumero);
        // Mostrar el número
        setMostrarNumero(true);
      })
      .catch((error) => {
        console.error("Error al guardar los datos:", error);
      });
  };

  return (
    <Container className="containerSe">


      <h1 style={{ color: "#485767", fontFamily: "kalam bold" }}>
        Gracias por ayudarnos en esta segunda fase ...👏
      </h1>
      <Card className="cardFinal1" style={{
        
          backgroundColor: "#fffacd",
          textAlign: "center",
          fontSize: "22px",
          fontFamily: "kalam bold",
          color: "#485767",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
        }}>
          <CardBody>
          <br/>
      💰💸Con el fin de agradecerte por tu aporte y participación en la medición ...  
      
      participarás en la rifa de <span style={{ fontSize: "30px", color: "red" }}>$500.000 </span> 
      con las tres últimas cifras de la loteria de Boyacá el día 16 de Diciembre de 2023.💰💸
      <br/>  para generar tu número, por favor dale 
      clic al boton
      

      <button className="botonDownload" onClick={handleSubmitForm2}>Participar</button>
      
      {mostrarNumero && <p>Tu número es: <span style={{ fontSize: "40px", color: "red" }}> {numeroAutoincrementable}</span><br/>MUCHA SUERTE!!!</p> }
      </CardBody>
     </Card>

     
<br/>

      <Row className="d-flex flex-column align-items-center">
        <Col>
          <div className="d-flex flex-column align-items-center">
            {datosUser.length === 0 ? (
              <p>NO hay lectura</p>
            ) : (
              <Table
                id="tabla"
                innerRef={tableRef}
                bordered
                style={{ width: "100%", fontSize: "10px" }}
              >
                <caption
                  style={{
                    captionSide: "top",
                    backgroundColor: "#485767",
                    textAlign: "center",
                    color: "#ebeff1",
                    fontFamily: "kalam bold",
                    fontSize: "25px",
                  }}
                >
                  Resultados Encuesta HAW -- Felicidad en el Trabajo
                  <br />
                  (Segunda Medición)
                </caption>

                <thead>
                  <tr
                    style={{
                      backgroundColor: "#485767",
                      textAlign: "center",
                      color: "white",
                      verticalAlign: "middle",
                    }}
                  >
                    <th>DIMENSION DE LA FELICIDAD</th>
                    <th>RECOMENDACION</th>
                    <th>RESULTADO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      colSpan={1}
                      style={{
                        backgroundColor: "#38a0a5",
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      FELICIDAD EUDAIMÓNICA
                    </td>
                    <td
                      colSpan={2}
                      style={{
                        backgroundColor: "#38a0a5",
                        textAlign: "justify",
                        color: "black",
                        fontWeight: "bold",
                        textTransform: "UpperCase",
                      }}
                    >
                      {" "}
                      Basada en el modelo de Ryff, la felicidad eudaimónica se basa en teorías influyentes sobre la salud mental, la clínica y el desarrollo de la vida, como la teoría humanista del yo (Rogers,  1961 ), la teoría de la individuación y los complejos (Jung,  1969 ) y las etapas de desarrollo psicosocial. desarrollo (Erikson,  1959 ). Está compuesta por seis dimensiones, cuyo estado conocerá a continuación.
                    </td>
                  </tr>
                  <tr>
                  
                    <td
                      style={{
                        backgroundColor: "#a6bacd",
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {datosUser[0].DimensionFelicidad.toUpperCase()}
                    </td>
                   
                    <td> <br />
                      < p style={{
                        fontSize: '16px',
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}>{totalDominioN >= 18 ? "SOSTENER" : "ES NECESARIO FORTALECER"}</p>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >

                      <br />
                      < p style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}>{totalDominio}</p>
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        backgroundColor: "#a6bacd",
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {datosUser[1].DimensionFelicidad.toUpperCase()}
                    </td>
                    <td>
                    <br />
                      < p style={{
                        fontSize: '16px',
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}>{totalrecimientoN >= 18 ? "SOSTENER" : "ES NECESARIO FORTALECER"}</p>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >

                      <br />
                      < p style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}>{totalrecimiento}</p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        backgroundColor: "#a6bacd",
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                        verticalAlign: "middle",

                      }}
                    >
                      {datosUser[2].DimensionFelicidad.toUpperCase()}
                    </td>
                    <td>
                    <br />
                      < p style={{
                        fontSize: '16px',
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}>{totalRelacionesN >= 18 ? "SOSTENER" : "ES NECESARIO FORTALECER"}</p>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >

                      <br />
                      < p style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}>{totalRelaciones}</p>
                    </td>
                  </tr>

                  <tr>
                  
                    <td
                      style={{
                        backgroundColor: "#a6bacd",
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {datosUser[3].DimensionFelicidad.toUpperCase()}
                    </td>
                    
                    <td>
                    <br />
                      < p style={{
                        fontSize: '16px',
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}>{totalPropositoN >= 18 ? "SOSTENER" : "ES NECESARIO FORTALECER"}</p>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >

                      <br />
                      < p style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}>{totalProposito}</p>
                    </td>
                  </tr>

                  <tr>
                  
                    <td
                      style={{
                        backgroundColor: "#a6bacd",
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {datosUser[4].DimensionFelicidad.toUpperCase()}
                    </td>
                    <td><br />
                      < p style={{
                        fontSize: '16px',
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}>{totalAutoacepacionN >= 18 ? "SOSTENER" : "ES NECESARIO FORTALECER"}</p>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >

                      <br />
                      < p style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}>{totalAutoacepacion}</p>
                    </td>
                  </tr>
                  <tr>
                 
                    <td
                      style={{
                        backgroundColor: "#a6bacd",
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {datosUser[5].DimensionFelicidad.toUpperCase()}
                    </td>
                    <td> <br />
                      < p style={{
                        fontSize: '16px',
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}>{totalAutonomiaN >= 18 ? "SOSTENER" : "ES NECESARIO FORTALECER"}</p>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >

                      <br />
                      < p style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}>{totalAutonomia}</p>
                    </td>
                  </tr>


                  <tr>


                    <td
                      colSpan={1}
                      style={{
                        backgroundColor: "#a6bacd",
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "13px",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      Importancia para la Salud
                    </td>

                    <td
                      colSpan={2}
                      style={{
                        backgroundColor: "#a6bacd",
                        textAlign: "justify",
                        color: "black",
                        fontSize: "13px",
                        fontSize: "13px",
                        verticalAlign: "middle",
                      }}
                    >


                      Diversas investigaciones han encontrado que las personas con altos niveles de felicidad eudaimónica, presentan menores problemas de salud y enfermedades (Costanzo et al., 2009; Kinderen & Khapova, 2021), entre ellas el Alzheimer y el deterioro cognitivo leve (Boyle et al., 2010), la reducción del riesgo de accidente cerebrovascular (Kim, Sun, Park, & Peterson, 2013) y de infarto de miocardio entre las personas con enfermedades coronarias (Kim, Sun, Park, Kubzansky, et al., 2013).
                    </td>
                  </tr>


                  <tr>


                    <td
                      colSpan={1}
                      style={{
                        backgroundColor: "#a6bacd",
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "13px",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      Algunas bases biológicas y neurológicas de la importancia de la felicidad eudaimónica
                    </td>

                    <td
                      colSpan={2}
                      style={{
                        backgroundColor: "#a6bacd",
                        textAlign: "justify",
                        color: "black",
                        fontSize: "13px",
                        fontSize: "13px",
                        verticalAlign: "middle",
                      }}
                    >

                      Múltiples investigaciones han examinado los posibles mecanismos a través de los cuales la felicidad eudaimónica tiene sus efectos saludables. Los primeros hallazgos mostraron que una mayor felicidad (en particular, crecimiento personal, relaciones positivas con los demás y propósito en la vida) estaban relacionados con una mejor regulación neuroendocrina, mejores perfiles inflamatorios y antivirales, menores factores de riesgo cardiovascular, mejores perfiles de sueño (Friedman et al., 2005; Ryff, 2014; Ryff et al., 2004).
                      Hallazgos recientes muestran que los aspectos de la eudaimonía se asocian con una mejor regulación glucémica (Boylan et al., 2017; Hafez et al., 2018), mejores perfiles inflamatorios (Morozink et al., 2010), mejores perfiles lipídicos (Radler et al., 2018), menor riesgo de síndrome metabólico (Boylan & Ryff, 2015) y menor carga alostática (Zilioli, Imami, et al., 2015; Zilioli, Slatcher, et al., 2015).
                      Múltiples estudios han demostrado los efectos mitigadores de la felicidad eudaimónica en la salud autoevaluada (Ryff et al., 2015), en las enfermedades crónicas (O’Brien, 2012), los marcadores inflamatorios (Elliot & Chapman, 2016; Morozink et al., 2010), el cortisol diurno (Zilioli, Imami, et al., 2015), la hemoglobina glicosilada HbA1c (Tsenkova et al., 2007) y la recuperación cardiovascular tras un factor de estrés agudo (Boylan et al., 2016). Además se ha encontrado relación entre la felicidad eudaimónica con mayor volumen del córtex insular, que participa en funciones cognitivas de orden superior (Lewis et al., 2014).
                    </td>
                  </tr>


                  <tr>


                    <td
                      colSpan={1}
                      style={{
                        backgroundColor: "#a6bacd",
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "13px",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      Recomendaciones
                    </td>

                    <td
                      colSpan={2}
                      style={{
                        backgroundColor: "#a6bacd",
                        textAlign: "justify",
                        color: "black",
                        fontSize: "13px",
                        fontSize: "13px",
                        verticalAlign: "middle",
                      }}
                    >
                      <tr >
                        <p
                          style={{
                            fontWeight: "bold",
                            textAlign: "left",
                          }}>
                          Practicar mindfulness:</p>
                        Shonin et al. (2014) encontraron que la practica del mindfunless disminuye los niveles de estrés laboral y angustia psicológica, y aumenta la satisfacción laboral y el desempeño laboral calificado por el empleador. También se ha encontrado que el mindfunless mejora el equilibrio entre el trabajo y la vida, la calidad del sueño y la vitalidad (Allen y Kiburz, 2012).
                      </tr><br />
                      <tr>
                        <p
                          style={{
                            fontWeight: "bold",
                            textAlign: "left",
                          }}>
                          Programa de Psicología Positiva:</p>
                        "Las técnicas de intervención incluyen realizar una visita de gratitud, escribir tres cosas buenas de la vida, hacer ejercicio e identificar y utilizar sus fortalezas. Se puede encontrar una descripción detallada del programa inicial en el manual de Parks y Seligman ( 2007 )" (van Dierendonck y Lam, 2023).
                      </tr><br />
                      <tr>
                        <p
                          style={{
                            fontWeight: "bold",
                            textAlign: "left",
                          }}><br />
                          Meditación:</p>
                        Al igual que el mindfulness, las prácticas de meditación suelen consistir en la concentración en la respiración, una virtud, una palabra o un texto inspirador (Innes et al.,  2016 )
                      </tr><br />
                      <tr><p
                        style={{
                          fontWeight: "bold",
                          textAlign: "left",
                        }}>
                        Coaching de vida:</p>
                        Las sesiones se basan en el entrenamiento de pares, ejercicios prescritos y la autorreflexión. El programa generalmente implica el establecimiento de objetivos e imágenes mentales para mejorar la atención y la concentración y aumentar la confianza en uno mismo (Arkoff et al.,  2004 ; Style & Boniwell,  2010 ) (van Dierendonck y Lam, 2023).
                      </tr><br />
                      <tr><p
                        style={{
                          fontWeight: "bold",
                          textAlign: "left",
                        }}>
                        Escribiendo:</p>
                        Esta intervención se basa en el trabajo fundamental de Pennebaker, que muestra que escribir sobre acontecimientos importantes de la vida tendría una influencia positiva en el bienestar de una persona (Pennebaker y Seagal,  1999). Las investigaciones han demostrado que puede ayudar a reducir el estrés, aliviar traumas, ubicar los acontecimientos de la vida en modelos mentales coherentes y proporcionar significado (Hemenover,  2003 ; Hollis et al.,  2017 ; Tarquini et al.,  2016 ).
                      </tr>
                    </td>

                  </tr>

                  <tr>
                    <td
                      colSpan={2}
                      style={{
                        backgroundColor: "#dd9384",
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "13px",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      TOTAL FELICIDAD EUDAIMÓNICA
                    </td>

                    <td
                      colSpan={1}
                      style={{
                        backgroundColor: "#dd9384",
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "13px",
                        fontSize: "13px",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      {totalHawE}
                    </td>
                  </tr>

                  <tr>
                    <td
                      colSpan={3}
                      style={{
                        backgroundColor: "#38a0a5",
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "13px",
                      }}
                    >
                      FELICIDAD HEDONICA
                    </td>
                  </tr>




                  <tr>
                    <td
                      style={{
                        backgroundColor: "#a6bacd",
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {"EMOCIONES HACIA EL TRABAJO Y HACIA LA ORGANIZACION"}
                    </td>
                    <td
                      rowSpan={2}
                      style={{
                        textAlign: "justify",
                        color: "black",
                        verticalAlign: "middle",
                        fontSize: "12px",
                      }}
                    > <p
                      style={{
                        fontWeight: "bold",
                        textAlign: "left",
                        fontSize: '16px'
                      }}>
                        Recomendaciones:</p>

                      <p
                        style={{
                          fontWeight: "bold",
                          textAlign: "left",
                          fontSize: '14px'
                        }}>
                        Relaizar Actividad Física</p>
                      Estudios han encontrado una fuerte relación entre el bienestar subjetivo y la actividad física. Las personas activas han mostrado mayores niveles de felicidad hedónica, autoestima y mejor estado de ánimo en comparación con las personas inactivas (Iwon, 2021; Paskova, 2010; Maher et al., 2014; Pengpid y Peltzer, 2019; Stolarska et al., 2019; An et al., 2020; Van Woudenberg et al., 2020).  Las endorfinas se liberan durante actividades deportivas (Starosta, 1995).
                      <p
                        style={{
                          fontWeight: "bold",
                          textAlign: "left",
                          fontSize: '14px'
                        }}><br />
                        Práctica consciente de la gratitud</p>
                      Las personas que practican las gratitud son menos vulnerables al agotamiento laboral (Chan, 2010) y más felices. Existen programas específicos desarrollados para nutrir o cultivar la gratitud en la vida, por ejemplo el enfoque cognitivo-conductual simple de cuatro pasos para aprender la gratitud (Miller, 1995). La terapia Naikan, que es una forma japonesa de meditación (Krech, 2001 ; Reynolds, 1981). Se recomienda "llevaran un registro semanal de tres cosas buenas que les sucedieron durante la semana y registrarlas por escrito. Luego reflexionar sobre estas cosas buenas usando tres preguntas similares a las de la meditación Naikan (Krech, 2001 )
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                       < p style={{
                        fontSize: '12px',
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}>{totalEmocionesOrganizacionN >= 24 ? "SOSTENER" : "ES NECESARIO FORTALECER"}</p>
                    {totalEmocionesOrganizacion}
                    </td>

                  </tr>
                  <tr>
                    <td
                      style={{
                        backgroundColor: "#a6bacd",
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {datosUser[8].DimensionFelicidad.toUpperCase()}
                    
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    > < p style={{
                      fontSize: '12px',
                      textAlign: "center",
                      color: "black",
                      fontWeight: "bold",
                    }}>{totalSatisfaccionN >= 6 ? "SOSTENER" : "ES NECESARIO FORTALECER"}</p>
                    {totalSatisfaccion}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={2}
                      style={{
                        backgroundColor: "#dd9384",
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "13px",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      TOTAL FELICIDAD HEDONICA
                    </td>

                    <td
                      colSpan={1}
                      style={{
                        backgroundColor: "#dd9384",
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "13px",
                        fontSize: "13px",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      {totalHawH}
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}

            <Button
              className="botonDownload"
              color="primary"
              onClick={handleDownloadPDF}
            >
              Descarga tus resultados en PDF AQUI
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default FormPersonaAux1;
