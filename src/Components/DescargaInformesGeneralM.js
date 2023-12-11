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

function DescargaInformesGeneral() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const _ = require('lodash');

  /** En estos estados se definen la variables que almacenan y controlan las instituciones */
  const [opcionesIE, setOpcionesIE] = useState([]);
  const [seleccionIE, setSeleccionIE] = useState("");
  const [opcionesSedes, setOpcionesSedes] = useState([]);
  const [seleccionSedes, setSeleccionSedes] = useState("");
  const [datosInforme, setDatosInforme] = useState([]);
  const [datosEscalas, setDatosEscalas] = useState([]);
  const [datosRecursos, setDatosRecursos] = useState([]);
  const [uno, setUno] = useState([]);
  const [dos, setDos] = useState([]);
  const [tres, setTres] = useState([]);
  const [final, setFinal] = useState([]);
  const [preguntasA, setPreguntasA] = useState([]);
  const [preguntasD, setPreguntasD] = useState([]);
  const [preguntasC, setPreguntasC] = useState([]);
  const [preguntasR, setPreguntasR] = useState([]);
  const [preguntasAuto, setPreguntasAuto] = useState([]);
  const [preguntasP, setPreguntasP] = useState([]);
  const [preguntasE1, setPreguntasE1] = useState([]);
  const [preguntasE2, setPreguntasE2] = useState([]);
  const [preguntasS, setPreguntasS] = useState([]);
  const [arrayRecursos1, setArrayRecursos1] = useState([]);
  const [arrayRecursos2, setArrayRecursos2] = useState([]);
  const [arrayRecursos1Nombre, setArrayRecursos1Nombre] = useState([]);
  const [arrayRecursos2Nombre, setArrayRecursos2Nombre] = useState([]);
  const [arrayRecursos1Numero, setArrayRecursos1Numero] = useState([]);
  const [arrayRecursos2Numero, setArrayRecursos2Numero] = useState([]);
  const [totales, setTotales] = useState([]);
  

  /**fin estados Institucion */

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
        `${apiUrl}/respuestas-e/all`
      );
      setDatosInforme(response.data);
    }
      consultarDatos();
    
  }, [seleccionIE, seleccionSedes]);
console.log(datosInforme)

  /** Consulta de las preguntas para ponerlas en el informe */
  useEffect(() => {
    async function consultarDatosE() {
      const response = await axios.get(
        `${apiUrl}/escala/all`
      );
      setDatosEscalas(response.data);
    }
      consultarDatosE();
    
  }, []);

  useEffect(() => {
    async function consultarDatosR() {
      const response = await axios.get(
        `${apiUrl}/recursos-col`
      );
      setDatosRecursos(response.data);
    }
      consultarDatosR();
    
  }, []);

  // GENERACION DEL INFORME EN EXCEL
  const generarArchivoExcel = () => {
        setFinal([])
    
     datosInforme.map((datos)=>{
        const arrayVacio=[]
        const arraynuevo=[]
        const arrayTotales=[]
        const arrayVacioR=[]
       arrayVacio.push(
            datos.Institucion,
            datos.Sede,
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
            datos.Persona.Grupo,
            )
        
            arraynuevo.push(
              datos.Institucion,
              datos.Sede,
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
              datos.Persona.Grupo,
              )
        datos.Escalas.map((escala)=>{
          
            const three=escala.Total
            setTres(three)
            arrayTotales.push(escala.Total)
            console.log(arrayTotales)
            setTotales(arrayTotales)

        escala.Preguntas.map((valores)=>{
            arrayVacio.push(valores.Factor)
            arraynuevo.push(valores.Factor)
            const two=[valores.Factor]
            

        })
        arrayVacio.push(three)
        arraynuevo.push(three)
        })

        datos.RecursosCol.map((recursos)=>{
          if(recursos.Caso===1){
            arrayVacio.push(recursos.Factor)
            arraynuevo.push(recursos.Factor)
          }else if(recursos.Caso===2){
            arrayVacio.push(recursos.Factor)
            arraynuevo.push(recursos.Factor)

          }
        })
        
        arrayVacio.push(datos.Fecha)
        
        console.log(arrayVacio[35])
        console.log(arraynuevo[33])
        console.log(datos.Institucion)
        if(datos.Institucion==''){
          
        arrayVacio[117]=[datos.Persona.Rifa]  
        arrayVacio[116]=datos.Fecha
        arrayVacio[115]="NA"
        arrayVacio[114]=arraynuevo[85]
        arrayVacio[113]=arraynuevo[84]
        arrayVacio[112]="NA"
        arrayVacio[111]="NA"
        arrayVacio[110]=arraynuevo[83]
        arrayVacio[109]=arraynuevo[82]
        arrayVacio[108]=arraynuevo[81]
        arrayVacio[107]="NA"
        arrayVacio[106]="NA"
        arrayVacio[105]="NA"
        arrayVacio[104]=arraynuevo[80]
        arrayVacio[103]=arraynuevo[79]
        arrayVacio[102]=arraynuevo[78]
        arrayVacio[101]="NA"//
        arrayVacio[100]=arraynuevo[77]
        arrayVacio[99]=arraynuevo[76]
        arrayVacio[98]=arraynuevo[75]
        arrayVacio[97]=arraynuevo[74]
        arrayVacio[96]=arraynuevo[73]
        arrayVacio[95]=arraynuevo[72]
        arrayVacio[94]="NA"
        arrayVacio[93]=arraynuevo[71]
        arrayVacio[92]=arraynuevo[70]
        arrayVacio[91]=arraynuevo[69]
        arrayVacio[90]="NA"
        arrayVacio[89]=arraynuevo[68]
        arrayVacio[88]="NA"
        arrayVacio[87]=arraynuevo[67]
        arrayVacio[86]="NA"
        arrayVacio[85]=arraynuevo[66]
        arrayVacio[84]=arraynuevo[65]
        arrayVacio[83]="NA"
        arrayVacio[82]="NA"
        arrayVacio[81]=arraynuevo[64]
        arrayVacio[80]=arraynuevo[63]
        arrayVacio[79]="NA"
        arrayVacio[78]=arraynuevo[62]
        arrayVacio[77]="NA"

       
        arrayVacio[76]=arraynuevo[36]
        arrayVacio[75]=arraynuevo[36]

        

        arrayVacio[74]=arraynuevo[63]//total
        arrayVacio[73]="NA"
        arrayVacio[72]="NA"
        arrayVacio[71]=arraynuevo[62]
        arrayVacio[70]=arraynuevo[37]-arraynuevo[36]//total
        arrayVacio[69]=arraynuevo[35]
        arrayVacio[68]=arraynuevo[34]
        arrayVacio[67]=arraynuevo[33]
        arrayVacio[66]=arraynuevo[49]//totales
        arrayVacio[65]="NA"
        arrayVacio[64]=arraynuevo[48]
        arrayVacio[63]=arraynuevo[47]
        arrayVacio[62]=arraynuevo[46]
        arrayVacio[61]=arraynuevo[45]
        arrayVacio[60]=arraynuevo[44]//totales
        arrayVacio[59]=arraynuevo[43]
        arrayVacio[58]="NA"
        arrayVacio[57]=arraynuevo[42]
        arrayVacio[56]=arraynuevo[41]
        arrayVacio[55]=arraynuevo[40]
        arrayVacio[54]=arraynuevo[39]
        arrayVacio[53]="NA"
        arrayVacio[52]=arraynuevo[38]
        arrayVacio[51]=arraynuevo[61]//totales
        arrayVacio[50]=arraynuevo[60]
        arrayVacio[49]=arraynuevo[59]
        arrayVacio[48]=arraynuevo[58]
        arrayVacio[47]=arraynuevo[57]
        arrayVacio[46]="NA"
        arrayVacio[45]=arraynuevo[56]
        arrayVacio[44]="NA"
        arrayVacio[43]="NA"
        arrayVacio[42]="NA"
        arrayVacio[41]=arraynuevo[24]//total
        arrayVacio[40]="NA"
        arrayVacio[39]=arraynuevo[23]
        arrayVacio[38]=arraynuevo[22]
        arrayVacio[37]=arraynuevo[21]
        arrayVacio[36]=arraynuevo[20]
        arrayVacio[32]=arraynuevo[19]
        arrayVacio[34]=arraynuevo[18]
        arrayVacio[33]=arraynuevo[32]//total
        arrayVacio[32]=arraynuevo[31]
        arrayVacio[31]=arraynuevo[30]
        arrayVacio[30]=arraynuevo[29]
        arrayVacio[29]="NA"
        arrayVacio[28]=arraynuevo[28]
        arrayVacio[27]=arraynuevo[27]
        arrayVacio[26]=arraynuevo[26]
        arrayVacio[25]="NA"
        arrayVacio[24]=arraynuevo[53]//total
        arrayVacio[23]=arraynuevo[25]
        arrayVacio[22]="NA"
        arrayVacio[21]="NA"
        arrayVacio[20]=arraynuevo[52]
        arrayVacio[19]=arraynuevo[51]
        arrayVacio[18]=arraynuevo[50]

        
 
        
        }
        
        console.log(arraynuevo[50])
        console.log(arrayVacio[18])

        final.push(arrayVacio)
        

        
        })

        datosEscalas.map((datos)=>{
          const ArrayAutonomia=[]
          const ArrayDominio=[]
          const ArrayCrecimiento=[]
          const ArrayRelaciones=[]
          const ArrayAutoaceptación=[]
          const ArrayProposito=[]
          if (datos.Dimension==="Autonomía en el trabajo"){
            datos.Preguntas.map((preguntas)=>{
              ArrayAutonomia.push(preguntas.Item)
              preguntasA.push(preguntas.Item)
              
            })
          }else if(datos.Dimension==="Dominio Ambiental en el trabajo"){
            datos.Preguntas.map((preguntas)=>{
              preguntasD.push(preguntas.Item)
            })
          }else if(datos.Dimension==="Crecimiento en el trabajo"){
            datos.Preguntas.map((preguntas)=>{
              preguntasC.push(preguntas.Item)
            })
          }else if(datos.Dimension==="Relaciones positivas en el trabajo"){
            datos.Preguntas.map((preguntas)=>{
              preguntasR.push(preguntas.Item)
            })
          }else if(datos.Dimension==="Autoaceptación en el trabajo"){
            datos.Preguntas.map((preguntas)=>{
              preguntasAuto.push(preguntas.Item)
            })
          }else if(datos.Dimension==="Propósito en el trabajo"){
            datos.Preguntas.map((preguntas)=>{
              preguntasP.push(preguntas.Item)
            })
          }else if(datos.Dimension==="Emociones hacia el trabajo"){
            datos.Preguntas.map((preguntas)=>{
              preguntasE1.push(preguntas.Item)
            })
          }
          else if(datos.Dimension==="Emociones hacia la organización"){
            datos.Preguntas.map((preguntas)=>{
              preguntasE2.push(preguntas.Item)
            })
          } else if(datos.Dimension==="Satisfacción en el trabajo"){
            datos.Preguntas.map((preguntas)=>{
              preguntasS.push(preguntas.Item)
            })
          }
        })

        datosRecursos.resultado.map((recursos)=>{
          if(recursos.Caso===1){
            arrayRecursos1.push(recursos.Item)
            arrayRecursos1Nombre.push(recursos.Nombre)
            arrayRecursos1Numero.push(recursos.Numero)
          }else if(recursos.Caso===2){
            arrayRecursos2.push(recursos.Item)
            arrayRecursos2Nombre.push(recursos.Nombre)
            arrayRecursos2Numero.push(recursos.Numero)
          }
        })
       
console.log(final)   
console.log(totales)  

  


    const data = [
      [
        `INFORME GENERAL`,
      ],
      [
        "IE",
        "SEDE",
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
        arrayRecursos1Nombre[0],
        arrayRecursos1Nombre[1],
        arrayRecursos1Nombre[2],
        arrayRecursos1Nombre[3],
        arrayRecursos1Nombre[4],
        "",
        arrayRecursos1Nombre[6],
        arrayRecursos1Nombre[7],
        "",
        arrayRecursos1Nombre[9],
        arrayRecursos1Nombre[10],
        arrayRecursos1Nombre[11],
        arrayRecursos1Nombre[12],
        "",
        "",
        "",
        "",
        "",
        arrayRecursos1Nombre[18],
        arrayRecursos1Nombre[19],
        arrayRecursos1Nombre[20],
        arrayRecursos1Nombre[21],
        "",
        arrayRecursos1Nombre[23],
        arrayRecursos1Nombre[24],
        arrayRecursos2Nombre[0],
        "",
        "",
        "",
        arrayRecursos2Nombre[4],
        "",
        arrayRecursos2Nombre[6],
        "",
        arrayRecursos2Nombre[8],
        arrayRecursos2Nombre[9],
        "",
        arrayRecursos2Nombre[11],
        arrayRecursos2Nombre[12],
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
        "",
        "",//aqui empieza autonomia
       "En mi trabajo, mis decisiones no son influenciadas por lo que piensen los demás.",
        "En mi trabajo, no me preocupa lo que los demás piensen de mí.",
       "En mi trabajo, siempre puedo actuar de acuerdo a mis creencias, princ…",
       " Puedo organizar mi trabajo, para minimizar el contacto con personas cuyos problemas me afectan emocionalmente.",
       "En mi trabajo no me preocupa expresar mis opiniones aunque sean opuestas a las de la mayoría de personas",
        "Puedo organizar mi trabajo de modo que sea mentalmente menos intenso",
        "",
        //Aqui empieza dominio
        "En mi trabajo, pocas veces me siento abrumado por las reuniones y actividades extras a mis funciones laborales",
        "En mi trabajo, pocas veces me siento abrumado por mis responsabilidades laborales.",
       "En mi trabajo, he sido capaz de construir un entorno laboral y un estilo de trabajo a mi gusto.",
      "En mi trabajo, soy capaz de manejar el tiempo para poder dar respuesta a todo lo que hay que hacer.",
        "Siento que las condiciones instituicionales permiten que pueda aportar para que las organización logre cambios significativos.",
        "Siempre puedo resolver problemas difíciles si me esfuerzo lo suficiente.",
        "Siento que los constantes cambios que se dan en la organización pocas veces me desaniman.",
        "Casi siempre sé cómo manejar situaciones imprevistas en mi trabajo",
        "",
        //Crecimiento
        "Tengo oportunidades para aprender y crecer en el trabajo.",
       "En general, siento que sigo aprendiendo en el trabajo",
        "Siento que he aprendido mucho en el trabajo lo que me ha convertido en una persona más capaz",
        "Gracias a mi trabajo he aprendido muchas cosas valiosas",
        "Tengo la capacidad de mejorar continuamente mis competencias",
        "En general, siento que con el paso del tiempo, he aprendido a conocerme más como trabajador.",
        "Mi trabajo me permite tener nuevas experiencias que desafían mi forma de pensar sobre mí mismo y el mundo.",
        "",
        //Relaciones
       "Me siento cercano a las personas de mi entorno laboral.",
        "Me siento conectado con los demás en el entorno de trabajo",
        "Considero que las personas con las que trabajo son mis amigos",
        "Tengo una relación de confianza con las personas de mi trabajo.",
       "Puedo confiar en los compañeros de trabajo.",
        "Sé que puedo confiar en mis compañeros de trabajo, y ellos saben que pueden confiar en mí.",
        "En mi trabajo hay personas que me quieren escuchar cuando necesito hablar.",
       "En mi trabajo no me siento solo porque puedo compartir mis preocupaciones con algunos de mis compañeros.",
        "Entre las personas con las que trabajo, siento que hay un sentimiento de hermandad.",
        "",
        //Autoaceptacion
        "Me siento bien cuando pienso en lo que he hecho en mi trabajo en el pasado y, en lo que espero hacer en el futuro.",
        "Mi trabajo significa para mí algo más que proporcionar un cheque de pago.",
        "En muchos sentidos, me siento orgulloso por los logros alcanzados durante mi trayectoria laboral en esta institución.",
        "En general, me siento orgulloso de quien soy mi trabajo y de mi trayectoria laboral.",
        "Me considero proactivo al momento de llevar a cabo los planes que me propongo en mi trabajo.",
       "Para mí, los objetivos en mi trabajo, han sido más una fuente de satisfacción que de frustración.",
        "Gracias a mi trabajo puedo cumplir mis objetivos personales.",
        "Cuando miro atrás, me siento satisfecho de cómo han resultado las cosas en mi trayectoria laboral en esta institución.",
        "",
        //Proposito
        "Siento que mi trabajo tiene un impacto sustancial en la vida o el trabajo de otras personas.",
        "Siento que mi trabajo ayuda a hacer del mundo un lugar mejor.",
        "Sé que mi trabajo tiene un impacto positivo en el mundo.",
        " El trabajo que hago tiene un propósito mayor.",
        "Siento que mi trabajo tiene propósito y sentido.",
        "",
        //EMOCIONES HACIA EL TRABAJO
        "Creo que mi trabajo es agradable",
        "Creo que mi trabajo es divertido",
        "Me siento bien cuando estoy trabajando",
        "",
        // EMOCIONES HACIA LA ORGANIZACION
        "Sería muy feliz si pasara el resto de mi vida profesional en esta organización.",
        "Me siento emocionalmente ligado a esta organización.",
        "Tengo un fuerte sentimiento de pertenencia a esta organización",
        "",
        //SATISFACCION EN EL TRABAJO
        "Tengo la oportunidad de utilizar mis destrezas y habilidades profesionales para realizar mis tareas.",
        "",
        arrayRecursos1[0],
        arrayRecursos1[1],
        arrayRecursos1[2],
        arrayRecursos1[3],
        arrayRecursos1[4],
        arrayRecursos1[5],
        arrayRecursos1[6],
        arrayRecursos1[7],
        arrayRecursos1[8],
        arrayRecursos1[9],
        arrayRecursos1[10],
        arrayRecursos1[11],
        arrayRecursos1[12],
        arrayRecursos1[13],
        arrayRecursos1[14],
        arrayRecursos1[15],
        arrayRecursos1[16],
        arrayRecursos1[17],
        arrayRecursos1[18],
        arrayRecursos1[19],
        arrayRecursos1[20],
        arrayRecursos1[21],
        arrayRecursos1[22],
        arrayRecursos1[23],
        arrayRecursos1[24],
        arrayRecursos2[0],
        arrayRecursos2[1],
        arrayRecursos2[2],
        arrayRecursos2[3],
        arrayRecursos2[4],
        arrayRecursos2[5],
        arrayRecursos2[6],
        arrayRecursos2[7],
        arrayRecursos2[8],
        arrayRecursos2[9],
        arrayRecursos2[10],
        arrayRecursos2[11],
        arrayRecursos2[12],
        arrayRecursos2[13],
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
        arrayRecursos1Numero[0],
        arrayRecursos1Numero[1],
        arrayRecursos1Numero[2],
        arrayRecursos1Numero[3],
        arrayRecursos1Numero[4],
        arrayRecursos1Numero[5],
        arrayRecursos1Numero[6],
        arrayRecursos1Numero[7],
        arrayRecursos1Numero[8],
        arrayRecursos1Numero[9],
        arrayRecursos1Numero[10],
        arrayRecursos1Numero[11],
        arrayRecursos1Numero[12],
        arrayRecursos1Numero[13],
        arrayRecursos1Numero[14],
        arrayRecursos1Numero[15],
        arrayRecursos1Numero[16],
        arrayRecursos1Numero[17],
        arrayRecursos1Numero[18],
        arrayRecursos1Numero[19],
        arrayRecursos1Numero[20],
        arrayRecursos1Numero[21],
        arrayRecursos1Numero[22],
        arrayRecursos1Numero[23],
        arrayRecursos1Numero[24],
        arrayRecursos2Numero[0],
        arrayRecursos2Numero[1],
        arrayRecursos2Numero[2],
        arrayRecursos2Numero[3],
        arrayRecursos2Numero[4],
        arrayRecursos2Numero[5],
        arrayRecursos2Numero[6],
        arrayRecursos2Numero[7],
        arrayRecursos2Numero[8],
        arrayRecursos2Numero[9],
        arrayRecursos2Numero[10],
        arrayRecursos2Numero[11],
        arrayRecursos2Numero[12],
        arrayRecursos2Numero[13],
        "",
        'RIFA'
      ],
      ...final.map((fila) => fila)
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
    link.setAttribute("download", `Informe_General.xlsx`);
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
    <Container >
          <Button  style={{
                    
                    fontFamily: "Kalam",
                    fontSize: "20px",
                  }}className="botonInfo" onClick={generarArchivoExcel}>Descargar Informe General</Button>
            
    </Container>
  );
}

export default DescargaInformesGeneral;
