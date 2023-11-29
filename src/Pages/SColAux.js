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

function SColAux() {
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
  const [mail, setMail] = useState("");
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
    if (selectedOption !== "Otra Institución") {
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
          Institucion: "",
          Sede: "",
          Recursos,
        };
      } else {
        data = { Institucion: "", Sede: "" };
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
        Correo: mail
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
    if (!mail) {
      newErrors.mail = "Por favor ingrese la dirección de correo que usó en la primera medición";
      isValid = false;
    } else {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    
      if (!emailRegex.test(mail)) {
        newErrors.mail = "Por favor ingrese una dirección de correo electrónico válida";
        isValid = false;
      }
    }    

    setErrors(newErrors);
    return isValid;
  };

  let organizada = opcionesLista1.sort();

  const [busqueda, setBusqueda] = useState("");



  /*const handleSubmitForm = (e) => {

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
    
  };*/
  return (
    <Container className="custom-container">
      <br />

      <Form >
        <>
          <div className="containerFormPersona1">
            <Card className="cardFinal1">
              <CardBody>
                <p
                  style={{
                    textAlign: "CENTER",
                    fontSize: "40px",
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
                  }}
                >HAW - Happiness At Work
                </p>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "26px",
                    fontWeight: "bold",
                   
                  }}
                >
                  De acuerdo a la información suministrada en la primera fase, usted accedió a
                   participar en una segunda medición, agradecemos su interés y valoramos sus respuestas!
                   
                   
                </p>
                
                   <p  style={{
                    textAlign: "center",
                    fontSize: "26px",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
                    fontFamily: "kalam bold",
          color: "#485767",
                  }}>
                    Al finalizar podrás descargar:
                    <br/>
                    *  Un reporte con tus resultados y recomendaciones para sostener y mejorar tu felicidad hedónica y eudaimónica.
                     <br/>
                 * Un número con el que, a manera de agradecimiento participarás en la rifa de  
                     <span style={{fontSize:"30px", color:"red"}}> $500.000</span>  como premio a tu cooperación!!!
                  </p>
              
                  <p  style={{
                    textAlign: "center",
                    fontSize: "26px",
                    fontWeight:"bold"
                   
                  }}>Para acceder nuevamente a la encuesta, requerimos que sea ingresado el correo que
                   ud registró y al cual le llego de esta invitación, sólo así podremos establecer los datos comparativos.</p>
              </CardBody>
            </Card>
          </div>
        </>
        <br />
        
 
        <FormGroup className="input-group mb-3" style={{margin:"0"}}>
                <br />
                <span    style={{
                color: "#eeeeeb",
                background: "#485767",
                borderRadius: "5px",
                borderColor:"#485767",
                border: "5px solid #485767"
                }}class="input-group-text" id="addon-wrapping">
                  @
                </span>
                <Input
                 style={{
                  color: "#eeeeeb",
                  background: "#485767",
                  borderRadius: "5px",
                  borderColor:"#485767",
                  border: "5px solid #485767"
                 
                }}
                  className="form-control custom-input"
                  placeholder="E-mail"
                  type="email"
                  name="email"
                  id="email"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                 
                  onInput={(e) => e.target.setCustomValidity("")}
                  invalid={errors.mail !== undefined}
                  required
                ></Input>
                <br/>
                {errors.mail && <FormFeedback>{errors.mail}</FormFeedback>}
              </FormGroup>
        
        <FormGroup>
          <Button
            className="botonModal"
            onClick={handleClick}
            
          >
            Continuar a la encuesta
          </Button>
        </FormGroup>
      </Form>
    </Container>
  );
}

export default SColAux;
