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
  Card,
  CardBody,
} from "reactstrap";

function CaracterizacionOtros() {
  const apiUrl = process.env.REACT_APP_API_URL;
  /** Estados para manejar la validacion del form */
  const [errors, setErrors] = useState({});

  const [persona, setPersona] = useState({});
  /** Estados para manejar los datos de Persona */
  const [genero, setGenero] = useState("");
  const [edad, setEdad] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [profesion, setProfesion] = useState("");
  const [postgrado, setPostgrado] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [añosVinculacion, setAñosVinculacion] = useState("");
  const [tipoVinculacion, setTipoVinculacion] = useState("");
  const [gradoEscalafon, setGradoEscalafon] = useState("");
  const [nivelEnseña, setNivelEnseña] = useState("");

  /** Fin estados datos persona */

  /** Estados para los datos segun pregunta tiene hijos */
  const [hijos, setHijos] = useState("");
  /** Fin los datos segun pregunta tiene hijos */

  /** En estos estados se definen la variables que almacenan y controlan las instituciones */
  const [opcionesLista1, setOpcionesLista1] = useState([]);
  const [seleccionLista1, setSeleccionLista1] = useState("");
  const [opcionesLista2, setOpcionesLista2] = useState([]);
  const [seleccionLista2, setSeleccionLista2] = useState("");
  const [idEncu, setIdEncu] = useState("");
  const [redirectId, setRedirectId] = useState("");
  const [idRespuesta, setIdRespuesta] = useState("");
  const [nombreOtraInstitucion, setNombreOtraInstitucion] = useState("");
  const [sedeOtraInstitucion, setSedeOtraInstitucion] = useState("");
  const [recursosCol, setRecursosCol] = useState([]);
  /**fin estados Institucion */

  const navigate = useNavigate();

  /** Manejadores para la pregunta tiene hijos */
  const handleTieneHijosChange = (event) => {
    setHijos(event.target.value);
  };

  /** Manejadores para estadocivil */
  const handleEstadoCivilChange = (event) => {
    setEstadoCivil(event.target.value);
  };
  /** Manejadores para la pregunta nivel educativo */

  const handleNiveleducativoChange = (event) => {
    setProfesion(event.target.value);
  };

  const handlePostgradoChange = (event) => {
    setPostgrado(event.target.value);
  };

  const handleTipoVinculacion = (event) => {
    setTipoVinculacion(event.target.value);
  };

  // LLamada a la base de datos para traer la info de los colegios
  useEffect(() => {
    async function cargarOpcionesLista1() {
      const response = await axios.get(`${apiUrl}/institucion`);
      setOpcionesLista1(response.data);
    }
    cargarOpcionesLista1();
  }, []);

  // Llamada a la base de datos para cargar la info de las sedes de los colegios

  useEffect(() => {
    if (!nombreOtraInstitucion) {
      async function cargarOpcionesLista2() {
        const response = await axios.get(
          `${apiUrl}/institucion/${seleccionLista1}`
        );
        setOpcionesLista2([response.data]);
      }
      if (seleccionLista1) {
        cargarOpcionesLista2();
      }
    }
  }, [seleccionLista1]);

  /** Funcion para el dato de genero */
  function handleChangeListaGenero(event) {
    setGenero(event.target.value);
  }

  /** Funcion para el dato de edad */
  function handleChangeEdad(event) {
    setEdad(event.target.value);
  }
  function handleChangeExperiencia(event) {
    setExperiencia(event.target.value);
  }

  function handleChangeGradoEscalafon(event) {
    setGradoEscalafon(event.target.value);
  }

  function handleChangeGradoNivelEnseña(event) {
    setNivelEnseña(event.target.value);
  }
  function handleChangeAñosVinculacion(event) {
    setAñosVinculacion(event.target.value);
  }

  /** Funcion para el dato de genero */
  function handleNivelEnseña(event) {
    nivelEnseña(event.target.value);
  }

  const handleChangeLista1 = (event) => {
    const selectedOption = event.target.value;
    setBusqueda(event.target.value);
    setSeleccionLista1(selectedOption);
    if (selectedOption !== "OTRA INSTITUCIÓN") {
      setNombreOtraInstitucion("");
      setSedeOtraInstitucion("");
    }
  };
  const handleNombreOtraInstitucionChange = (event) => {
    setNombreOtraInstitucion(event.target.value);
  };

  const handleSedeOtraInstitucionChange = (event) => {
    setSedeOtraInstitucion(event.target.value);

    setSeleccionLista2(sedeOtraInstitucion);
  };

  // Funcion que se ejecutara al seleccionar la lista numero 2
  function handleChangeLista2(event) {
    setSeleccionLista2(event.target.value);
  }

  //trayendo Recursos desde el back
  useEffect(() => {
    async function RecursosColTraer() {
      const response = await axios.get(`${apiUrl}/recursos-col`);
      setRecursosCol(response.data.resultado);
    }
    RecursosColTraer();
  }, []);

  // Función que envia los datos seleccionados a la bd para crear la encuesta

  function handleClick() {
    if (validateForm()) {
      let data = {};
      let Recursos = {};
      recursosCol.map((r) => {
        Recursos = {
          Nombre: r.Nombre,
          Item: r.Item,
          Factor: r.Factor,
          Caso: r.Caso,
        };
      });
      console.log("Recursos", Recursos); //borrar
      if (nombreOtraInstitucion) {
        data = {
          Institucion: nombreOtraInstitucion.toUpperCase(),
          Sede: seleccionLista2,
          Recursos,
        };
      } else {
        data = { Institucion: seleccionLista1, Sede: seleccionLista2 };
      }

      // Llamada a Nest para guardar los datos seleccionados en la base de datos

      const person = {
        Genero: genero,
        Edad: edad,
        EstadoCivil: estadoCivil,
        Hijos: hijos,
        Profesion: profesion,
        Especializacion: postgrado,
        Experiencia: experiencia,
        Años_Vinculado: añosVinculacion,
        Tipo_Vinculacion: tipoVinculacion,
        Grado_Escalafon: gradoEscalafon,
        Nivel_Enseñanza: nivelEnseña,
      };

      axios.post(`${apiUrl}/persona`, person).then((response) => {
        console.log("Datos guardados:", response.data);
        const personA = response.data.resultado._id;
        setPersona(personA);
        console.log("idP", personA, "pguardado", persona); //borrar

        /** Se crea la encuesnta con los objetos ppales de esclas y preguntas */
        axios
          .post(`${apiUrl}/encuesta`, data)
          .then((response) => {
            console.log("Datos guardados:", response.data);
            const id = response.data.resultado._id;
            setIdEncu(id);

            const data = { _id: personA };

            /** En este metodo se crea un nuevo objeto que es independiente de las demas encuestas, en donde se tiene en cuenta todos los datos finales de la persona que va a resolver la encuesta */
            axios
              .post(`${apiUrl}/respuestas-e/${id}`, data, {
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then((response) => {
                console.log("Datos guardados:", response.data);
                const idRespuestas = response.data.resultado._id;

                setIdRespuesta(response.data.resultado._id);
                setRedirectId(idRespuesta);

                navigate(`/Responda/${idRespuestas}`);
              })
              .catch((error) => {
                console.error("Error al guardar los datos:", error);
              });

            // Se necesita redirigir hacia la pagina de respuestas de la encuestas con el id del objeto respuesta encuesta */
          })
          .catch((error) => {
            console.error("Error al guardar los datos:", error);
          });
      });
    }
  }

  useEffect(() => {
    // Actualizar enlace cuando idEncu cambie
    const linkElement = document.getElementById("encuLink");
    if (linkElement) {
      linkElement.href = `/Responda/${idEncu}`;
    }
  }, [idEncu]);

  /** ERRORES VALIDACION DEL FORM */

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validación del campo "Genero"
    if (!genero) {
      newErrors.genero = "Debe seleccionar un género";
      isValid = false;
    }

    // Validación del campo "Edad"
    if (!edad || edad < 18 || edad > 100 || isNaN(edad)) {
      newErrors.edad = "Debe ingresar una edad válida";
      isValid = false;
    }

    if (!hijos) {
      newErrors.hijos = "Debe seleccionar una opción";
      isValid = false;
    }

    if (!estadoCivil) {
      newErrors.profesion = "Debe seleccionar una Estado Cicil";
      isValid = false;
    }
    if (!profesion) {
      newErrors.profesion = "Debe seleccionar una profesión";
      isValid = false;
    }

    if (!postgrado) {
      newErrors.postgrado = "Debe seleccionar una opción";
      isValid = false;
    }

    // Validación del campo "experiencia"
    if (
      !experiencia ||
      experiencia < 0 ||
      experiencia > 100 ||
      isNaN(experiencia)
    ) {
      newErrors.experiencia =
        "Debe ingresar una cantidad de años de experiencia válida";
      isValid = false;
    }

    // Validación del campo "años IE"
    if (
      !añosVinculacion ||
      añosVinculacion < 0 ||
      añosVinculacion > 100 ||
      isNaN(añosVinculacion)
    ) {
      newErrors.añosVinculacion = "Debe ingresar una cantidad de años válida";
      isValid = false;
    }

    // Validación del campo "Tipo Vinculación"
    if (!tipoVinculacion) {
      newErrors.tipoVinculacion = "Debe seleccionar un Tipo de Vinculación";
      isValid = false;
    }

    // Validación del campo "grado Escalafon"
    if (!gradoEscalafon) {
      newErrors.gradoEscalafon =
        "Ingrese un valor válido: debe ser combinaciones entre números y letras así: 2A ó 3C ó 14 ...";
      isValid = false;
    }

    if (!nivelEnseña) {
      newErrors.nivelEnseña = "Debe seleccionar una opción";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  let organizada = opcionesLista1.sort();

  const [busqueda, setBusqueda] = useState("");

  // PONER TODAS EN MAYUSCULAS
  const opcionesFiltradas = organizada.filter((opcion) =>
    opcion.Nombre.toLowerCase().includes(busqueda.toLowerCase())
  );
  // ORDENAR PARA MOSTRAR DE PRIMERTO EL SENA
  opcionesFiltradas.sort((opcionA) => {
    if (opcionA.Nombre === "SENA - REGIONAL CALDAS") {
      return -1; // Mueve la opciónA al inicio del array
    } else {
      return 0; // Mantén el orden actual
    }
  });
  return (
    <Container className="custom-container">
      <br />

      <Form>
        <>
          <div className="containerFormPersona1">
            <Card className="cardFinal1">
              <CardBody>
                <p
                  style={{
                    textAlign: "CENTER",
                    fontSize: "28px",
                    fontFamily: "kalam bold",
                    color: "red",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
                  }}
                >
                  ¡¡¡ IMPORTANTE !!!
                </p>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "26px",
                    fontWeight: "bold",
                    textShadow: "1px 1px 2.5px rgba(0, 0, 0, 0.9)",
                  }}
                >
                 Por favor
                  seleccione  "OTRA INSTITUCIÓN",  y diligencie los datos que se le solicitarán.
                </p>
              </CardBody>
            </Card>
          </div>
        </>
        <br />
        <h2
          style={{
            color: "#485767",
            fontWeight: "50px",
            fontFamily: "'kalam bold', sans-serif",
          }}
        >
          Caracterización
        </h2>

        {/**## SELECT INSTITUCIÓN ##**/}
        <FormGroup className="input-group mb-3">
          <Input
            className="form-control"
            type="select"
            id="institucionSelect"
            style={{
              backgroundColor: "#485767",
              color: "#dee1e4",
            }}
            value={seleccionLista1}
            onChange={handleChangeLista1}
          >
            <option value="">Seleccione Institución</option>

            
                <option  value={"OTRA INSTITUCIÓN"}>
                  {"OTRA INSTITUCIÓN"}
                </option>
             
           
          </Input>
        </FormGroup>

        {seleccionLista1 === "OTRA INSTITUCIÓN" && (
          <>
            <FormGroup className="input-group mb-3">
              <Input
                className="form-control custom-input"
                type="text"
                placeholder="Nombre de la Institución"
                onInput={(e) => e.target.setCustomValidity("")}
                value={nombreOtraInstitucion}
                onChange={handleNombreOtraInstitucionChange}
                style={{
                  backgroundColor: "#485767",
                  color: "#dee1e4",
                }}
              />
            </FormGroup>

            <FormGroup className="input-group mb-3">
              <Input
                className="form-control custom-input"
                type="text"
                placeholder="Sede de la Institución"
                onInput={(e) => e.target.setCustomValidity("")}
                value={sedeOtraInstitucion}
                onChange={handleSedeOtraInstitucionChange}
                style={{
                  backgroundColor: "#485767",
                  color: "#dee1e4",
                }}
              />
            </FormGroup>
          </>
        )}

 {/**## SELECT SEDE ##**/}
 <FormGroup className="input-group mb-3">
 <Select
        options={prenda.map((x) => ({ value: x.Codigo, label: x.Codigo, nombre: x.Nombre }))}
        placeholder="Código Prenda"
        name="colors"
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleOptionChange}
      />

      {opcionSeleccionada && (
        <Input
          type="text"
          value={opcionSeleccionada.nombre}
          readOnly
        />
      )}
        </FormGroup>
       

        {/**## SELECT GENERO ##**/}
        <Row className="input-group mb-3">
          <Col md={7}>
            <FormGroup>
              <Input
                className="form-control"
                type="select"
                name="genero"
                style={{
                  backgroundColor: "#485767",
                  color: "#dee1e4",
                }}
                id="genero"
                value={genero}
                onChange={handleChangeListaGenero}
                invalid={errors.genero !== undefined}
                required
              >
                <option value="">Selecciona un género</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </Input>
              {errors.genero && <FormFeedback>{errors.genero}</FormFeedback>}
            </FormGroup>
          </Col>
          {/**## FORMULARIO EDAD ##**/}
          <Col md={5}>
            <FormGroup>
              <Input
                className="form-control custom-input"
                type="number"
                min="18"
                max="100"
                placeholder="Edad"
                onChange={handleChangeEdad}
                style={{
                  backgroundColor: "#485767",
                  color: "#dee1e4",
                }}
                value={edad}
                onInvalid={(e) =>
                  e.target.setCustomValidity("Ingrese solo números")
                }
                onInput={(e) => e.target.setCustomValidity("")}
                pattern="[0-9]*"
                invalid={errors.edad !== undefined}
                required
              ></Input>
              {errors.edad && <FormFeedback>{errors.edad}</FormFeedback>}
              {!errors.edad && <FormText>Número entre 18 y 100</FormText>}
            </FormGroup>
          </Col>
        </Row>

        {/**## SELECT ESTADO CIVIL ##**/}
        <FormGroup className="input-group mb-3">
          <Input
            className="form-control"
            type="select"
            name="estadoCivil"
            style={{
              backgroundColor: "#485767",
              color: "#dee1e4",
            }}
            id="estadoCivil"
            value={estadoCivil}
            onChange={handleEstadoCivilChange}
            invalid={errors.estadoCivil !== undefined}
            required
          >
            <option value="">Estado Civil</option>
            <option>Soltero(a)</option>
            <option>Casado(a)</option>
            <option>Separado(a)</option>
            <option>Viudo(a)</option>
            <option>Union Libre</option>
            <option>Otro</option>
          </Input>
          {errors.hijos && <FormFeedback>{errors.hijos}</FormFeedback>}
        </FormGroup>

        {/**## SELECT HIJOS ##**/}
        <FormGroup className="input-group mb-3">
          <Input
            className="form-control"
            type="select"
            name="hijos"
            style={{
              backgroundColor: "#485767",
              color: "#dee1e4",
            }}
            id="hijos"
            value={hijos}
            onChange={handleTieneHijosChange}
            invalid={errors.hijos !== undefined}
            required
          >
            <option value="">¿Tiene Hijos?</option>
            <option>Sí, mayores de edad</option>
            <option>Sí, menores de edad</option>
            <option>Sí, mayores y menores de edad</option>
            <option value="no">No</option>
          </Input>
          {errors.hijos && <FormFeedback>{errors.hijos}</FormFeedback>}
        </FormGroup>

        {/**## SELECT FORMACION ##**/}
        <FormGroup className="input-group mb-3">
          <Input
            className="form-control"
            type="select"
            name="profesion"
            style={{
              backgroundColor: "#485767",
              color: "#dee1e4",
            }}
            id="profesion"
            value={profesion}
            onChange={handleNiveleducativoChange}
            invalid={errors.profesion !== undefined}
            required
          >
            <option>Seleccione su Formación</option>
            <option>Bachiller</option>
            <option>Normalista Superior</option>
            <option>Técnico</option>
            <option>Tecnólogo</option>
            <option>Profesional Licenciado</option>
            <option>Profesional Diferente Licenciado</option>
          </Input>
          {errors.profesion && <FormFeedback>{errors.profesion}</FormFeedback>}
        </FormGroup>

        {/**## SELECT POSTGRADO ##**/}
        <FormGroup className="input-group mb-3">
          <Input
            className="form-control"
            type="select"
            name="postgrado"
            style={{
              backgroundColor: "#485767",
              color: "#dee1e4",
            }}
            id="postgrado"
            value={postgrado}
            onChange={handlePostgradoChange}
            invalid={errors.postgrado !== undefined}
            required
          >
            <option>Seleccione su Máxima Formación de Postgrado</option>
            <option>Especialista en campos de la Educación</option>
            <option>Especialista en campos diferentes de la Educación</option>
            <option>Magister en campos de la Educación</option>
            <option>Magister en campos diferentes de la Educación</option>
            <option>Doctor en campos de la Educación</option>
            <option>Doctor en campos diferentes de la Educación</option>
            <option>No tengo formación en Postgrado</option>
          </Input>
          {errors.postgrado && <FormFeedback>{errors.postgrado}</FormFeedback>}
        </FormGroup>

        {/**## SELECT EXPERIENCIA LABORAL ##**/}
        <FormGroup className="input-group mb-3">
          <Input
            className="form-control custom-input"
            type="number"
            min="0"
            max="100"
            placeholder="Cantidad de años de experiencia laboral en educación (Incluye todos los niveles)"
            onChange={handleChangeExperiencia}
            value={experiencia}
            onInvalid={(e) =>
              e.target.setCustomValidity("Ingrese solo números")
            }
            onInput={(e) => e.target.setCustomValidity("")}
            pattern="[0-9]*"
            invalid={errors.experiencia !== undefined}
            style={{
              backgroundColor: "#485767",
              color: "#dee1e4",
            }}
            required
          ></Input>
          {errors.experiencia && (
            <FormFeedback>{errors.experiencia}</FormFeedback>
          )}
          <FormText className="input-group mb-3 custom-form-text">
          Si su rol organización no es educativa, indique los años de experiencia
laboral en rol que desempeña actualmente
            ...
          </FormText>
        </FormGroup>

        {/**## AÑOS VINCULADO A LA IE ##**/}
        <FormGroup className="input-group mb-3">
          <Input
            style={{
              backgroundColor: "#485767",
              color: "#dee1e4",
            }}
            className="form-control custom-input"
            type="number"
            min="0"
            max="100"
            placeholder="Cantidad de años de vinculación a la Institución donde trabaja actualmente"
            onChange={handleChangeAñosVinculacion}
            value={añosVinculacion}
            onInvalid={(e) =>
              e.target.setCustomValidity("Ingrese solo números")
            }
            onInput={(e) => e.target.setCustomValidity("")}
            pattern="[0-9]*"
            invalid={errors.añosVinculacion !== undefined}
            required
          ></Input>
          {errors.añosVinculacion && (
            <FormFeedback>{errors.añosVinculacion}</FormFeedback>
          )}
        </FormGroup>

        {/**## TIPO DE VINCULACION ##**/}
        <FormGroup className="input-group mb-3">
          <Input
            className="form-control"
            type="select"
            name="tipoVinculacion"
            style={{
              backgroundColor: "#485767",
              color: "#dee1e4",
            }}
            id="tipoVinculacion"
            value={tipoVinculacion}
            onChange={handleTipoVinculacion}
            invalid={errors.tipoVinculacion !== undefined}
            required
          >
            <option>Tipo de vinculación</option>
            <option>Termino Fijo (Tiempo Completo)</option>
            <option>Término indefinido (Tiempo completo)</option>
            <option>Medio tiempo</option>
            <option>Contratista</option>
            <option>Por horas (menos de 20 horas semana)</option>
            <option>Por horas (mayor o igual a 20 horas)</option>
            <option>Otro</option>
          </Input>
          {errors.tipoVinculacion && (
            <FormFeedback>{errors.tipoVinculacion}</FormFeedback>
          )}
        </FormGroup>

        {/**## GRADO EN EL ESCALAFON ##**/}
        <FormGroup className="input-group mb-3">
          <Input
            className="form-control custom-input"
            type="select"
            onChange={handleChangeGradoEscalafon}
            value={gradoEscalafon}
            onInput={(e) => e.target.setCustomValidity("")}
            pattern="[0-9]*"
            invalid={errors.gradoEscalafon !== undefined}
            style={{
              backgroundColor: "#485767",
              color: "#dee1e4",
            }}
            required
            
          >
            <option>Seleccione el nivel al que pretenece</option>
            <option>Auxiliar (mantenimiento, servicios generales, vigilancia…)</option>
            <option>Asistente (Administrativo, secretarias, biblioteca…)</option>
            <option>Docente, instructor, profesor…o</option>
            <option>Profesional Universitario o especializado…</option>
            <option>Coordinador o líder de área (con personal a cargo)</option>
            <option>Jefe o director de área</option>
            <option>Gerente - Rector - Subgerente – Vicerrector</option>
            <option>Otro</option>
          </Input>
          {errors.gradoEscalafon && (
            <FormFeedback>{errors.gradoEscalafon}</FormFeedback>
          )}
         
        </FormGroup>

        {/**## GRADO EN EL QUE ENSEÑA ##**/}
        <FormGroup className="input-group mb-3">
          <Input
            className="form-control"
            type="select"
            name="nivelEnseña"
            style={{
              backgroundColor: "#485767",
              color: "#dee1e4",
            }}
            id="nivelEnseña"
            value={nivelEnseña}
            onChange={handleChangeGradoNivelEnseña}
            invalid={errors.nivelEnseña !== undefined}
            required
          >
            <option>Nivel en el que enseña</option>
            <option>
              Preescolar (cualquier grado antes de primero de primaria)
            </option>
            <option>Básica primaria (De 1 a 5 de primaria)</option>
            <option>Básica secundaria (de sexto a noveno)</option>
            <option>Media(10 y 11)</option>
            <option>Básica primaria y básica secundaria</option>
            <option>Básica secundaria y media</option>
            <option>Todas las anteriores</option>
            <option>No aplica</option>
          </Input>
          {errors.nivelEnseña && (
            <FormFeedback>{errors.nivelEnseña}</FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Button
            className="botonSurvey"
            onClick={handleClick}
            disabled={!seleccionLista1 || !seleccionLista2}
          >
            Continuar a la encuesta
          </Button>
        </FormGroup>
      </Form>
    </Container>
  );
}

export default CaracterizacionOtros;
