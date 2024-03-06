import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  FormFeedback,
  FormText,
} from "reactstrap";
import * as XLSX from "xlsx";
import DescargaInformesGeneral from "./DescargaInformesGeneral"; /** Cambiar a descargar informes generalM */

function DescargaInformes() {
  const apiUrl = process.env.REACT_APP_API_URL;

  /** En estos estados se definen la variables que almacenan y controlan las instituciones */
  const [opcionesIE, setOpcionesIE] = useState([]);
  const [seleccionIE, setSeleccionIE] = useState("");
  const [opcionesSedes, setOpcionesSedes] = useState([]);
  const [seleccionSedes, setSeleccionSedes] = useState("");
  const [datosInforme, setDatosInforme] = useState([]);
  const [uno, setUno] = useState([]);
  const [dos, setDos] = useState([]);
  const [tres, setTres] = useState([]);
  const [final, setFinal] = useState([]);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState("");
  const [municipio, setMunicipio] = useState("");

  /**fin estados Institucion */

  /** handle para el filtro */

  const handleFiltroChange = (event) => {
    const selectedOption = event.target.value;
    setFiltroSeleccionado(selectedOption);
    if (selectedOption !== "Otra Institución") {
    }
  };

  const handleChangeMunicipio = (event) => {
    const selectedOption = event.target.value;
    setMunicipio(selectedOption);
  };
  /** fin handle  */

  // LLamada a la base de datos para traer la info de los colegios
  useEffect(() => {
    async function cargarListaColegios() {
      const response = await axios.get(`${apiUrl}/institucion`);
      setOpcionesIE(response.data);
    }
    cargarListaColegios();
  }, []);

  // Llamada a la base de datos para cargar la info de las sedes de los colegios

  useEffect(() => {
    async function cargarListaSedes() {
      const response = await axios.get(`${apiUrl}/institucion/${seleccionIE}`);
      setOpcionesSedes([response.data]);
    }
    if (seleccionIE) {
      cargarListaSedes();
    }
  }, [seleccionIE]);

  //Funcion que se ejecutara al seleccionar la lista numero 1
  function handleChangeOpcionesIE(event) {
    setSeleccionIE(event.target.value);
    setSeleccionSedes("");
  }

  // Funcion que se ejecutara al seleccionar la lista numero 2
  function handleChangeListaSede(event) {
    setSeleccionSedes(event.target.value);
  }

  //Consulta del filtro poe ie y por sede

  useEffect(() => {
    async function consultarDatos() {
      const response = await axios.get(
        `${apiUrl}/respuestas-e/IE/${seleccionIE}/${seleccionSedes}`
      );
      setDatosInforme(response.data.resultado);
    }
    if (seleccionSedes && seleccionIE) {
      consultarDatos();
    }
  }, [seleccionIE, seleccionSedes]);

  // GENERACION DEL INFORME EN EXCEL
  const generarArchivoExcel = () => {
    setFinal([]);

    datosInforme.map((datos) => {
      const arrayVacio = [];
      arrayVacio.push(
        datos.Persona.Genero,
        datos.Persona.EstadoCivil,
        datos.Persona.Edad,
        datos.Persona.Hijos,
        datos.Persona.Profesion,
        datos.Persona.Especializacion,
        datos.Persona.Experiencia,
        datos.Persona.Años_Vinculado,
        datos.Persona.Tipo_Vinculacion,
        datos.Persona.Grado_Escalafon,
        datos.Persona.Nivel_Enseñanza,
        datos.Persona.Codigo,
        datos.Persona.Correo,
        datos.Persona.NombreApellidos,
        datos.Persona.Cedula,
        datos.Persona.Grupo
      );

      datos.Escalas.map((escala) => {
        const three = escala.Total;
        console.log("total", three);
        setTres(three);
        escala.Preguntas.map((valores) => {
          arrayVacio.push(valores.Factor);
          const two = [valores.Factor];
          console.log("factor", two);
        });
        console.log("este es el total que se guarda", three);
        arrayVacio.push(three);
      });
      arrayVacio.push(datos.Fecha);
      final.push(arrayVacio);
    });

    console.log("todo", final); //borrar

    const data = [
      [
        `${seleccionIE.toUpperCase()} - SEDE: ${seleccionSedes.toLocaleUpperCase()} `,
      ],
      [
        "GENERO",
        "ESTADO_CIVIL",
        "EDAD",
        "HIJOS",
        "PROFESION",
        "ESPECIALIZACION",
        "EXPERIENCIA",
        "AÑOS_VINC",
        "TIPO_VIN",
        "GRADO",
        "NIVEL_ENSE",
        "CODIGO",
        "CORREO",
        "NOMBRES",
        "CEDULA",
        "GRUPOS",
        "AUTONOMIA EN EL TRABAJO",
        "",
        "",
        "",
        "",
        "",
        "",
        "DOMINIO AMBIENTAL EN EL TRABAJO",
        "",
        "",
        "",
        "",
        "",
        "",
        ,
        "",
        "CRECIMIENTO EN EL TRABAJO EN EL TRABAJO",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "RELACIONES POSITIVAS EN EL TRABAJO",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "AUTOACEPTACION EN EL TRABAJO",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "PROPOSITO EN EL TRABAJO",
        "",
        "",
        "",
        "",
        "",
        "EMOCIONES HACIA EL TRABAJO",
        "",
        "",
        "",
        "EMOCIONES HACIA LA ORGANIZACION",
        "",
        "",
        "",
        "SATISFACCION EN EL TRABAJO",
        "",
        "FECHA",
      ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "A4",
        "A1",
        "A2",
        "A5",
        "A6",
        "A3",
        "_TOTAL_",
        "E7",
        "E10",
        "E11",
        "E14",
        "E3",
        "E6",
        "E5",
        "E4",
        "_TOTAL_",
        "G16",
        "G17",
        "G18",
        "G19",
        "G20",
        "G21",
        "G22",
        "_TOTAL_",
        "R26",
        "R27",
        "R28",
        "R29",
        "R30",
        "R34",
        "R32",
        "R31",
        "R25",
        "_TOTAL_",
        "SA35",
        "SA36",
        "SA47",
        "SA48",
        "SA49",
        "SA50",
        "SA54",
        "SA55",
        "_TOTAL_",
        "P38",
        "P42",
        "P43",
        "P44",
        "P45",
        "_TOTAL_",
        "H1",
        "H2",
        "H3",
        "_TOTAL_",
        "H5",
        "H6",
        "H7",
        "_TOTAL_",
        "H8",
        "_TOTAL_",
      ],
      ...final.map((fila) => fila),
    ];

    // Crear una nueva hoja de cálculo
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Hoja 1");

    // Generar el archivo de Excel en formato de libro binario
    const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });

    // Convertir el archivo binario a un objeto de tipo Blob
    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });

    // Crear un enlace para descargar el archivo
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Informe_${seleccionIE}.xlsx`);
    document.body.appendChild(link);

    // Simular un clic en el enlace para iniciar la descarga
    link.click();

    // Remover el enlace del documento
    document.body.removeChild(link);
  };

  // Función auxiliar para convertir una cadena en un ArrayBuffer
  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  return (
    <Container style={{ marginTop: "-70px" }} className="custom-grid">
      <p
        style={{
          textAlign: "center",
          fontSize: "40px",
          fontWeight: "bold",
          textShadow: "1px 1px 2.5px rgba(0, 0, 0, 0.9)",
          fontFamily: "kalam",
        }}
      >
        INFORMES
      </p>
      <Row>
        <div className="grid-row">
          <Col>
            <Form>
              {/**## SELECT FILTRO ##**/}
              <FormGroup className="input-group mb-3">
                <Input
                  className="form-control custom-input"
                  type="select"
                  id="filtroSelect"
                  style={{
                    backgroundColor: "#ebeff1",
                    color: "#414244",
                    fontFamily: "Kalam",
                    fontSize: "18px",
                  }}
                  value={filtroSeleccionado}
                  onChange={handleFiltroChange}
                >
                  <option value="">Seleccione una Entidad</option>
                  <option value="MANIZALES">
                    SECRETARIA DE EDUCACION MUNICIPAL (MANIZALES){" "}
                  </option>
                  <option value="Instituciones Educativas de Caldas">
                    SECRETARIA DE EDUCACION DEPARTAMENTAL (CALDAS){" "}
                  </option>
                  <option value="SENA - REGIONAL CALDAS">
                    SENA - REGIONAL CALDAS
                  </option>
                </Input>
              </FormGroup>

              {filtroSeleccionado === "Instituciones Educativas de Caldas" && (
                <>
                  <FormGroup className="input-group mb-3">
                    <Input
                      className="form-control"
                      type="select"
                      id="institucionSelect"
                      style={{
                        backgroundColor: "#ebeff1",
                        color: "#414244",
                        fontFamily: "Kalam",
                        fontSize: "18px",
                      }}
                      value={municipio}
                      onChange={handleChangeMunicipio}
                    >
                      <option value="">Seleccione Municipio</option>

                      <option value="Aguadas">Aguadas</option>
                      <option value="Anserma">Anserma</option>
                      <option value="Aranzazu">Aranzazu</option>
                      <option value="Belalcázar">Belalcázar</option>
                      <option value="Chinchiná">Chinchiná</option>
                      <option value="Filadelfia">Filadelfia</option>
                      <option value="La Dorada">La Dorada</option>
                      <option value="La Merced">La Merced</option>
                      <option value="Manzanares">Manzanares</option>
                      <option value="Marmato">Marmato</option>
                      <option value="Marquetalia">Marquetalia</option>
                      <option value="Marulanda">Marulanda</option>
                      <option value="Neira">Neira</option>
                      <option value="Norcasia">Norcasia</option>
                      <option value="Pácora">Pácora</option>
                      <option value="Palestina">Palestina</option>
                      <option value="Pensilvania">Pensilvania</option>
                      <option value="Riosucio">Riosucio</option>
                      <option value="Salamina">Salamina</option>
                      <option value="Samaná">Samaná</option>
                      <option value="San José">San José</option>
                      <option value="Supía">Supía</option>
                      <option value="Victoria">Victoria</option>
                      <option value="Villamaría">Villamaría</option>
                      <option value="Viterbo">Viterbo</option>
                    </Input>
                  </FormGroup>
                </>
              )}

              {/**## SELECT INSTITUCIÓN ##**/}
              <FormGroup className="input-group mb-3">
                <Input
                  className="form-control"
                  type="select"
                  id="institucionSelect"
                  style={{
                    backgroundColor: "#ebeff1",
                    color: "#414244",
                    fontFamily: "Kalam",
                    fontSize: "18px",
                  }}
                  value={seleccionIE}
                  onChange={handleChangeOpcionesIE}
                  
                  
                >
                  <option value="">Seleccione Institución Educativa</option>
                  {filtroSeleccionado === "SENA - REGIONAL CALDAS" && (
                    <option value={"SENA - REGIONAL CALDAS"}>
                      {"SENA - REGIONAL CALDAS"}
                    </option>
                  )}
                  {filtroSeleccionado ===
                    "Instituciones Educativas de Caldas" && (
                    <option value={`Instituciones Educativas de Caldas`}>
                      {`Instituciones Educativas de Caldas - ${municipio}`}
                    </option>
                  )}

                  {filtroSeleccionado === "MANIZALES" &&
                    opcionesIE.map((opcion) =>
                      opcion.Nombre !== "SENA - REGIONAL CALDAS" &&
                      opcion.Nombre !== "Instituciones Educativas de Caldas" ? (
                        <option key={opcion.id} value={opcion.valor}>
                          {opcion.Nombre}
                        </option>
                      ) : null
                    )}
                </Input>
              </FormGroup>

              {/**## SELECT SEDE ##**/}
              <FormGroup className="input-group mb-3">
                <Input
                  className="form-control"
                  type="select"
                  id="sedeSelect"
                  style={{
                    backgroundColor: "#ebeff1",
                    color: "#414244",
                    fontFamily: "Kalam",
                    fontSize: "18px",
                  }}
                  value={seleccionSedes}
                  onChange={handleChangeListaSede}
                  disabled={!opcionesIE}
                >
                  <option value="">Seleccione Sede</option>
                  {opcionesSedes.map((opcion) =>
                    opcion.Nombre !== "Instituciones Educativas de Caldas"
                      ? opcion.Sedes.map((sede) =>
                          sede.Nombre !== "OTRA INSTITUCIÓN" ? (
                            <option key={sede.id} value={sede.valor}>
                              {sede.Nombre}
                            </option>
                          ) : null
                        )
                      : opcion.Sedes.map((sede) =>
                          
                          sede.Municipio === municipio.toUpperCase() ? (
                            <option key={sede.id} value={sede.valor}>
                              {sede.Nombre}
                            </option>
                          ) : null
                        )
                  )}
                </Input>
              </FormGroup>
              <FormGroup>
                <Button
                  style={{
                    fontFamily: "Kalam",
                    fontSize: "20px",
                  }}
                  className="botonInfo"
                  onClick={generarArchivoExcel}
                >
                  Descargar Informe
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </div>
        <div className="grid-row">
          <Col>
            <DescargaInformesGeneral/>
          </Col>
        </div>
      </Row>
    </Container>
  );
}

export default DescargaInformes;
