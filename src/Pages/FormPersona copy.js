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

function FormPersona() {
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

  let currentTotalGeneral=0
  let currentTotalGeneralH=0
  useEffect(() => {
    
    datosP.map((x) => {
      const currentDimension = x.Dimension;
      console.log("dim", x.Dimension); // borrar
      setDimension(currentDimension);
      
      console.log("toteuda", currentTotalGeneral); //borrar
      switch (currentDimension) {
        case "Autonomía en el trabajo":
          console.log("totalitoa", x.Total); //borrar
          const currentTotal = x.Total;
          currentTotalGeneral+=currentTotal
          setTotal(currentTotal);

          let currentTotalAutonomia;
          switch (true) {
            case currentTotal >= 36:
              currentTotalAutonomia = `Altos niveles de ${currentDimension}`;
              break;
            case currentTotal > 18 && currentTotal < 36:
              currentTotalAutonomia = `Nivel medio de ${currentDimension}`;
              break;
            case currentTotal <= 18:
              currentTotalAutonomia = `Bajos niveles de ${currentDimension}`;
              break;
            default:
              break;
          }
          console.log("genral total", currentTotal); //borrar
          console.log("totA", currentTotalAutonomia); //borrar
          console.log("totGeneral", currentTotalGeneral); //borrar

          setTotalAutonomia(currentTotalAutonomia);
          setTotalEudanamonica(currentTotalGeneral)
          ActualizarRespuestaCliente(
            "64739c9d5fe33bff7e67c426",
            currentTotalAutonomia
          );

          break;

        case "Dominio Ambiental en el trabajo":
          console.log("totalito", x.Total); //borrar
          const currentTotalD = x.Total;
          currentTotalGeneral+=currentTotalD
          
          setTotal(currentTotalD);

          let currentTotalDominio;
          switch (true) {
            case currentTotalD >= 48:
              currentTotalDominio = `Altos niveles de ${currentDimension}`;
              break;
            case currentTotalD > 24 && currentTotalD < 48:
              currentTotalDominio = `Nivel medio de ${currentDimension}`;
              break;
            case currentTotalD <= 24:
              currentTotalDominio = `Bajos niveles de ${currentDimension}`;
              break;
            default:
              break;
          }
          console.log("genral total", currentTotalD); //borrar
          console.log("totD", currentTotalDominio); //borrar
          console.log("totGeneral", currentTotalGeneral); //borrar
          setTotalDominio(currentTotalDominio);
          setTotalEudanamonica(currentTotalGeneral)
          ActualizarRespuestaCliente(
            "6466c32dd5e66d1f3768d8aa",
            currentTotalDominio
          );

          break;

        case "Crecimiento en el trabajo":
          console.log("totalito", x.Total); //borrar
          const currentTotalC = x.Total;
          currentTotalGeneral+=currentTotalC
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
          currentTotalGeneral+=currentTotalR
          setTotal(currentTotalR);

          let currentTotalRelaciones;
          switch (true) {
            case currentTotalR >= 36:
              currentTotalRelaciones = `Altos niveles de ${currentDimension}`;
              break;
            case currentTotalR > 18 && currentTotalR < 36:
              currentTotalRelaciones = `Nivel medio de ${currentDimension}`;
              break;
            case currentTotalR <= 18:
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
          currentTotalGeneral+=currentTotalP
          setTotal(currentTotalP);

          let currentTotalProposito;
          switch (true) {
            case currentTotalP >= 30:
              currentTotalProposito = `Altos niveles de ${currentDimension}`;
              break;
            case currentTotalP > 15 && currentTotalP < 30:
              currentTotalProposito = `Nivel medio de ${currentDimension}`;
              break;
            case currentTotalP <= 15:
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
          currentTotalGeneral+=currentTotalAu
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
          setTotalEudanamonica(currentTotalGeneral)
          break;
        case "Emociones hacia el trabajo":
          console.log("totalito", x.Total); //borrar
          const currentTotalEm = x.Total;
          currentTotalGeneralH+=currentTotalEm
          setTotal(currentTotalEm);

          let currentTotalEmociones;
          switch (true) {
            case currentTotalEm >= 18:
              currentTotalEmociones = `Altos niveles de ${currentDimension}`;
              break;
            case currentTotalEm < 18 && currentTotalEm > 9:
              currentTotalEmociones = `Nivel medio de ${currentDimension}`;
              break;
            case currentTotalEm <= 9:
              currentTotalEmociones = `Bajos niveles de ${currentDimension}`;
              break;
            default:
              break;
          }
          console.log("genral total", currentTotalEm); //borrar
          console.log("totD", currentTotalEmociones); //borrar
          setTotalEmocionesTrabajo(currentTotalEmociones);
          ActualizarRespuestaCliente(
            "647a36e3916c2adcefbf4bb2",
            currentTotalEmociones
          );
          break;

        case "Emociones hacia la organización":
          console.log("totalito", x.Total); //borrar
          const currentTotalEO = x.Total;
          currentTotalGeneralH+=currentTotalEO
          setTotal(currentTotalEO);

          let currentTotalEmocionesOrga;
          switch (true) {
            case currentTotalEO >= 18:
              currentTotalEmocionesOrga = `Altos niveles de ${currentDimension}`;
              break;
            case currentTotalEO < 18 && currentTotalEO > 9:
              currentTotalEmocionesOrga = `Nivel medio de ${currentDimension}`;
              break;
            case currentTotalEO <= 9:
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
          currentTotalGeneralH+=currentTotalS
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
          setTotalHedonica(currentTotalGeneralH)
          break;
        // Resto de los casos...

        default:
          break;
      }
    });
  }, [datosP]);

  useEffect(() => {
  if (totalHedonica >= 42) {
    setTotalHawH(`Altos niveles de HEDÓNICA  EN EL TRABAJO`) 
  } else if (totalHedonica >= 42 && totalHedonica < 21) {
    setTotalHawH(`Nivel medio de  HEDÓNICA EN EL TRABAJO`) 
  } else {
    setTotalHawH(`Bajos niveles de HEDÓNICA  EN EL TRABAJO`) 
  }

  if (totalEudanamonica >= 246) {
    setTotalHawE(`Altos niveles de EUDAIMÓNICA  EN EL TRABAJO`) 
  } else if (totalEudanamonica >= 100 && totalEudanamonica < 246) {
    setTotalHawE(`Nivel medio de  EUDAIMÓNICA EN EL TRABAJO`) 
  } else {
    setTotalHawE(`Bajos niveles de EUDAIMÓNICA  EN EL TRABAJO`) 
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
    navigate(`/Final`); 
    const uno = papa.substring(0, 3);
    const final = fruta.length - 1;
    const dos = fruta.substring(final - 1, final + 1);

    console.log("fruta", dos); //borrar

    const cod = uno + nacimiento + dos; //CODIGO SE GENERA 3 PRIMERAS LETRAS DEL MES DEL PAPÁ, DIA DE NACIMIENTO Y dos ultimas de frut
    console.log("COD", codigo); //borrar

    const user = {
      Correo: mail,
      Codigo: cod,
      NombreApellidos:nombres,
    Cedula: cedula,
    Grupo:grupos
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

  return (
    <Container className="containerSe">

<div className="containerFormPersona">
        <Card className="cardFinal">
          <CardBody>
            <form onSubmit={handleSubmitForm}>
              <br />
              <p style={{ textAlign: "justify" }}>
                Para la investigación es de gran importancia contar con su
                participación en la repetición de esta medición en 2 meses (la
                cual tendrá menos preguntas), que permitirá fortalecer la
                evidencia científica de los resultados.
              </p>
              <p style={{ textAlign: "justify" }}>
                Por lo anterior y con el fin de garantizar su{" "}
                <span style={{ fontWeight: "bold", fontSize: "25px" }}>
                  anonimato
                </span>{" "}
                en la investigación, lo invitamos a diligenciar la siguiente
                información que permitirá generar un código confidencial que nos
                ayudará en el proceso investigativo, además al correo que nos
                suministre le enviaremos el informe de su felicidad en el
                trabajo y en 2 meses le enviaremos la segunda encuesta (breve).
              </p>

              <p style={{ textAlign: "justify" }}>
                <span style={{ color: "#fcf75e" }}>
                  En agradecimiento por participar en la segunda medición:
                </span>
                <ul>
                  <li>
                    Le compartiremos el comparativo de su felicidad en el
                    trabajo en la primera y segunda medición.
                  </li>
                  <li>
                    Le compartiremos recomendaciones científicas para el
                    mejoramiento y sostenimiento de su felicidad en el trabajo.
                  </li>
                </ul>
              </p>
              <p
                style={{
                  textAlign: "justify",
                  fontSize: "22px",
                  fontWeight: "bold",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
                }}
              >
                Nota: Si NO desea participar en la segunda medición, puede
                omitir este diligenciamiento.
              </p>
              <FormGroup className="input-group flex-nowrap">
                <br />
                <span class="input-group-text" id="addon-wrapping">
                  @
                </span>
                <Input
                  className="form-control"
                  placeholder="E-mail"
                  type="email"
                  name="email"
                  id="email"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup className="input-group flex-nowrap">
                <br />
                <span class="input-group-text" id="addon-wrapping">
                  📅
                </span>
                <Input
                  className="form-control"
                  placeholder="Día de nacimiento"
                  type="number"
                  name="nacimiento"
                  id="nacimiento"
                  value={nacimiento}
                  onChange={(e) => setNacimiento(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup className="input-group flex-nowrap">
                <br />
                <span class="input-group-text" id="addon-wrapping">
                  👵
                </span>
                <Input
                  className="form-control"
                  placeholder="Nombre de su abuela materna"
                  type="text"
                  name="fruta"
                  id="fruta"
                  value={fruta}
                  onChange={(e) => setFruta(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className="input-group flex-nowrap">
                <br />
                <span class="input-group-text" id="addon-wrapping">
                  👨
                </span>
                <Input
                  className="form-control"
                  placeholder="Segundo apellido de su padre o madre"
                  type="text"
                  name="papa"
                  id="papa"
                  value={papa}
                  onChange={(e) => setPapa(e.target.value)}
                />
              </FormGroup>
<div style={{width: "600px",
  transition: "transform 0.3s ease-in-out",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                  backgroundColor:"#ebb7ac",
                  transformStyle:"preserve-3d",
                  perspective:"1500px"
                , borderRadius:"12px"
                }}>
              <p style={{
                padding:"5px",
                  textAlign: "center",
                  fontSize: "26px",
                  fontWeight: "bold",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
color:"#144853"
                  
                }}>
                Invitación 100% opcional <br/>Si no está interesado omita estas preguntas
              </p></div>
              <br/>
              <p style={{ textAlign: "justify" }}>
                Se ha encontrado una alta relación entre la felicidad en el
                trabajo de los profesores y las experiencias de aprendizaje de
                los estudiantes. Con el fin de mejorar la comprensión de esta
                relación, la presente investigación necesita una muestra de
                docentes que autoricen la medición de la experiencias de
                aprendizaje de sus estudiantes en la clase orientada.
              </p>

             

              <p style={{ textAlign: "justify" }}>
                Si desea hacer parte de la muestra de docentes a quienes se les
                medirá la experiencia de aprendizaje de sus estudiantes, basta
                con suministrarnos su nómbre, cédula y el grupo de estudiantes
                que desea se aplique el instrumento de experiencias de
                aprendizaje.
              </p>

              <FormGroup className="input-group flex-nowrap">
                <br />
                <span class="input-group-text" id="addon-wrapping">
                  CC
                </span>
                <Input
                  className="form-control"
                  placeholder="Número de cédula"
                  type="text"
                  name="cedula"
                  id="cedula"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                />
              </FormGroup>

              <FormGroup className="input-group flex-nowrap">
                <br />
                <span class="input-group-text" id="addon-wrapping">
                  Nombre Completo
                </span>
                <Input
                  className="form-control"
                  placeholder="Nombres y apellidos"
                  type="text"
                  name="nombres"
                  id="nombres"
                  value={nombres}
                  onChange={(e) => setNombres(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="input-group flex-nowrap">
                <br />
                <span class="input-group-text" id="addon-wrapping">
                  Grupos por medir
                </span>
                <Input
                  className="form-control"
                  placeholder=" Ingrese el grupo o grupos a los que le gustaría se le midiera la experiencia de aprendizaje."
                  type="text"
                  name="grupos"
                  id="grupos"
                  value={grupos}
                  onChange={(e) => setGrupos(e.target.value)}
                />
              </FormGroup>

              <Button  className="botonDownload" type="submit">
                {" "}
                Enviar
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>

      <h1 style={{ color: "#485767" }}>
        Gracias por ayudarnos con tus respuestas...👏
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
                      autoaceptación, relaciones positivas propósito y
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
                    <td style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}>{totalDominio}</td>
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
                    <td style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}>{totalrecimiento}</td>
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
                    <td style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}>{totalRelaciones}</td>
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
                    <td style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}>{totalProposito}</td>
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
                    <td style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}>{totalAutoacepacion}</td>
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
                    <td style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}>{totalAutonomia}</td>
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
                        fontSize: "10px",
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
                      {datosUser[6].DimensionFelicidad.toUpperCase()}
                    </td>
                    <td
                      rowSpan={3}
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
                    <td style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}>{totalEmocionesTrabajo}</td>
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
                      {datosUser[7].DimensionFelicidad.toUpperCase()}
                    </td>
                    <td style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}>{totalEmocionesOrganizacion}</td>
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
                    <td style={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}>{totalSatisfaccion}</td>
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

export default FormPersona;
