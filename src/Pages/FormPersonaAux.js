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

function FormPersonaAux() {
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
  const [totalEmocionesOrganizacion, setTotalEmocionesOrganizacion] =
    useState("");
  const [totalSatisfaccion, setTotalSatisfaccion] = useState("");
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

  const [pregunta1, setPregunta1] = useState(0);
  const [pregunta2, setPregunta2] = useState(0);

  useEffect(() => {
    fetch(`${apiUrl}/respuestas-e/${id}`)
      .then((response) => response.json())
      .then((datos) => {
        setDatosP(datos.Escalas);
        setDatosMatriz(datos);
      });
  }, [id]);

  useEffect(() => {}, [datosP, datosMatriz]);

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

  useEffect(() => {}, [datosUser]);
  console.log("saliendo", datosUser);
  console.log("saliendorevisando", currentDatosUser);

  let currentTotalGeneral = 0;
  let currentTotalGeneralH = 0;
  useEffect(() => {
    console.log(datosP)
    datosP.map((x) => {
      x.Preguntas.map((z)=>{
       

        
      const currentDimension = x.Dimension;
      console.log("dim", x.Dimension); // borrar
      setDimension(currentDimension);
      const preguntaqueno=z.Numero
      if (preguntaqueno=="E6" ){
        console.log(z.Factor)
        setPregunta1(z.Factor)
      }else if(preguntaqueno=="E4"){
        console.log(z.Factor)
        setPregunta2(z.Factor)
      }

      console.log("toteuda", currentTotalGeneral); //borrar
      switch (currentDimension) {
        case "Autonomía en el trabajo":
          console.log("totalitoa", x.Total); //borrar
          const currentTotal = x.Total;
          currentTotalGeneral += currentTotal;
          setTotal(currentTotal);

          let currentTotalAutonomia;
          switch (true) {
            case currentTotal >= 21:
              currentTotalAutonomia = `Altos niveles de ${currentDimension}`;
              break;
            case currentTotal > 9 && currentTotal < 21:
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
          currentTotalGeneral += currentTotalD;

          setTotal(currentTotalD);

          let currentTotalDominio;
          console.log(currentTotalD - (pregunta1+pregunta2))
          switch (true) {
            
            case (currentTotalD - (pregunta1+pregunta2))>= 35:
              currentTotalDominio = `Altos niveles de ${currentDimension}`;
              break;
            case (currentTotalD - (pregunta1+pregunta2)) > 15 && currentTotalD < 35:
              currentTotalDominio = `Nivel medio de ${currentDimension}`;
              break;
            case (currentTotalD - (pregunta1+pregunta2)) <= 15:
              currentTotalDominio = `Bajos niveles de ${currentDimension}`;
              break;
            default:
              break;
          }
          console.log("genral total", currentTotalD); //borrar
          console.log("totD", currentTotalDominio); //borrar
          console.log("totGeneral", currentTotalGeneral); //borrar
          setTotalDominio(currentTotalDominio);
          setTotalEudanamonica(currentTotalGeneral);
          ActualizarRespuestaCliente(
            "6466c32dd5e66d1f3768d8aa",
            currentTotalDominio
          );

          break;

        case "Crecimiento en el trabajo":
          console.log("totalito", x.Total); //borrar
          const currentTotalC = x.Total;
          currentTotalGeneral += currentTotalC;
          setTotal(currentTotalC);

          let currentTotalCrecimiento;
          switch (true) {
            case currentTotalC >= 42:
              currentTotalCrecimiento = `Altos niveles de ${currentDimension}`;
              break;
            case currentTotalC > 18 && currentTotalC < 42:
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
          setTotal(currentTotalR);

          let currentTotalRelaciones;
          switch (true) {
            case currentTotalR >= 35:
              currentTotalRelaciones = `Altos niveles de ${currentDimension}`;
              break;
            case currentTotalR > 15 && currentTotalR < 35:
              currentTotalRelaciones = `Nivel medio de ${currentDimension}`;
              break;
            case currentTotalR <= 15:
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
          currentTotalGeneral += currentTotalP;
          setTotal(currentTotalP);

          let currentTotalProposito;
          switch (true) {
            case currentTotalP >= 28:
              currentTotalProposito = `Altos niveles de ${currentDimension}`;
              break;
            case currentTotalP > 12 && currentTotalP < 28:
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
          currentTotalGeneral += currentTotalAu;
          setTotal(currentTotalAu);

          let currentTotalAutoaceptacion;
          switch (true) {
            case currentTotalAu >= 42:
              currentTotalAutoaceptacion = `Altos niveles de ${currentDimension}`;
              break;
            case currentTotalAu > 18 && currentTotalAu < 42:
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
          currentTotalGeneralH += currentTotalEO;
          setTotal(currentTotalEO);

          let currentTotalEmocionesOrga;
          switch (true) {
            case currentTotalEO >= 6:
              currentTotalEmocionesOrga = `Altos niveles de ${currentDimension}`;
              break;
            case currentTotalEO < 3 && currentTotalEO > 6:
              currentTotalEmocionesOrga = `Nivel medio de ${currentDimension}`;
              break;
            case currentTotalEO <= 3:
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
    }) });
  }, [datosP]);

  useEffect(() => {
    if (totalHedonica >= 42) {
      setTotalHawH(`Altos niveles de HEDÓNICA  EN EL TRABAJO`);
    } else if (totalHedonica >21 && totalHedonica < 42) {
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

  /**LLAMADO A GUARDAR LA INFORMACION 2 */
  const handleSubmitForm2 = (e) => {
    e.preventDefault();
    navigate(`/Final`);

    const user = {
      NombreApellidos: nombres,
      Cedula: cedula,
      Grupo: grupos,
    };

    const idP = datosMatriz.Persona;

    //MODIFICANDO EL USUARIO CON EL CODIGO Y EL CORREO
    axios
      .patch(`${apiUrl}/persona/${idP}`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Datos guardados:", response.data);
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
                  <br/>
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
                    <th>DEFINICION</th>
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
                      La felicidad eudaimónica es planteada por Aristóteles en
                      la Ética a Nicómaco como el mayor de todos los bienes
                      alcanzables por la acción humana. La felicidad eudaimónica
                      en el trabajo es la experiencia subjetiva de que el
                      trabajo ayuda a crecer, proporciona un sentido de
                      propósito y contribuye a una comunidad más amplia. Como
                      tal, la eudaimonía en el trabajo es un constructo
                      multidimensional que mide las experiencias de Autonomía en
                      el trabajo, dominio del entorno, crecimiento personal,
                      autoaceptación, relaciones positivas, propósito y
                      significado en el trabajo (Turban y Yan, 2016; Ryan et al.
                      , 2008; Ryff y Singer, 2008).
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
                    <td>{datosUser[0].Definicion}</td>
                    <td
                      style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {totalDominio}
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
                    <td>{datosUser[1].Definicion}</td>
                    <td
                      style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {totalrecimiento}
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
                      {datosUser[2].DimensionFelicidad.toUpperCase()}
                    </td>
                    <td>{datosUser[2].Definicion}</td>
                    <td
                      style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {totalRelaciones}
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
                    <td>{datosUser[3].Definicion}</td>
                    <td
                      style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {totalProposito}
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
                    <td>{datosUser[4].Definicion}</td>
                    <td
                      style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {totalAutoacepacion}
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
                    <td>{datosUser[5].Definicion}</td>
                    <td
                      style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {totalAutonomia}
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
                    >
                      Las personas con altas puntuaciones de felicidad hedónica
                      en el trabajo presentan con alta frecuencia emociones
                      positivas hacia su trabajo y a la organización en la que
                      laboran y se sienten satisfechos con su trabajo actual. Es
                      decir, la felicidad hedónica en el trabajo es la medida en
                      que los empleados experimentan el trabajo como algo
                      divertido y agradable, además de que se ha generado un
                      vinculo emocional con la organización en la que trabaja.
                      Las personas con bajas puntuaciones de felicidad hedónica
                      en el trabajo presentan con frecuencia emociones negativas
                      en el trabajo y se sienten insatisfechos con su trabajo
                      actual. No consideran su trabajo como divertido, ni
                      agradable, además no tienen vínculos emocionales afectivos
                      con la organización en que laboran.
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
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
                    >
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

export default FormPersonaAux;
