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

function DescargaInformesGeneralAlterno() {
  const apiUrl = process.env.REACT_APP_API_URL;

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
console.log("informe",datosInforme)

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
        const arrayTotales=[]
        const arrayVacioR=[]
        const arrayDatosValores=[]
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
        
        datos.Escalas.map((escala)=>{
          
            const three=escala.Total
            setTres(three)
            arrayTotales.push(escala.Total)
            console.log(arrayTotales)
            setTotales(arrayTotales)

        escala.Preguntas.map((valores)=>{
/** Autonomia */
          if (valores.Numero=="A4") {
            arrayDatosValores.push(valores.Factor)
            console.log("A4",valores.Numero,"este es ",valores.Factor)
          }else if(valores.Numero=="A1") {
            arrayDatosValores.push(valores.Factor)
            console.log("A1",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="A2") {
              arrayDatosValores.push(valores.Factor)
              console.log("A4",valores.Numero,"este es ",valores.Factor)
              if (escala.Dimension=="Autonomía en el trabajo"){
                arrayDatosValores.push(arrayDatosValores[0]+arrayDatosValores[1]+arrayDatosValores[2])
                console.log(arrayDatosValores[3], "Total Autonomia")
              }
          
/** Dominio */

          }else if (valores.Numero=="A3") {
              arrayDatosValores.push(valores.Factor)
              console.log("A3",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="E10") {
              arrayDatosValores.push(valores.Factor)
              console.log("E10",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="E11") {
              arrayDatosValores.push(valores.Factor)
              console.log("E11",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="E14") {
              arrayDatosValores.push(valores.Factor)
              console.log("E14",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="E6") {
              arrayDatosValores.push(valores.Factor)
              console.log("E6",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="E5") {
              arrayDatosValores.push(valores.Factor)
              console.log("E5",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="E4") {
              arrayDatosValores.push(valores.Factor)
              console.log("E4",valores.Numero,"este es ",valores.Factor)
              if (escala.Dimension=="Dominio Ambiental en el trabajo"){
                arrayDatosValores.push(arrayDatosValores[4]+arrayDatosValores[5]+
                  arrayDatosValores[6]+arrayDatosValores[7]+arrayDatosValores[8]+
                  arrayDatosValores[9]+arrayDatosValores[10])
                console.log(arrayDatosValores[11], "Total Dominio")
              }

/** CRECIMIENTO */
          }else if (valores.Numero=="G16") {
              arrayDatosValores.push(valores.Factor)
              console.log("G16",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="G17") {
              arrayDatosValores.push(valores.Factor)
              console.log("G17",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="G18") {
              arrayDatosValores.push(valores.Factor)
              console.log("G18",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="G19") {
              arrayDatosValores.push(valores.Factor)
              console.log("G19",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="G20") {
              arrayDatosValores.push(valores.Factor)
              console.log("G20",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="G21") {
              arrayDatosValores.push(valores.Factor)
              console.log("G21",valores.Numero,"este es ",valores.Factor)
        
              if (escala.Dimension=="Crecimiento en el trabajo"){
                arrayDatosValores.push(arrayDatosValores[12]+arrayDatosValores[13]+
                  arrayDatosValores[14]+arrayDatosValores[15]+arrayDatosValores[16]+
                  arrayDatosValores[17])
                console.log(arrayDatosValores[18], "Total CRECIMIENTO")
              }

/** RELACIONES */

          }else if (valores.Numero=="R29") {
              arrayDatosValores.push(valores.Factor)
              console.log("R29",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="R34") {
              arrayDatosValores.push(valores.Factor)
              console.log("R34",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="R32") {
              arrayDatosValores.push(valores.Factor)
              console.log("R32",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="R31") {
              arrayDatosValores.push(valores.Factor)
              console.log("R31",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="R25") {
              arrayDatosValores.push(valores.Factor)
              console.log("R25",valores.Numero,"este es ",valores.Factor)
        
              if (escala.Dimension=="Relaciones positivas en el trabajo"){
                
                arrayDatosValores.push(arrayDatosValores[19]+
                  arrayDatosValores[20]+arrayDatosValores[21]+arrayDatosValores[22]+
                  arrayDatosValores[23])
                  console.log(arrayDatosValores[24], "Total RELACIONES")
              }

/**AUTOACEPTACION  */

         }else if (valores.Numero=="SA35") {
              arrayDatosValores.push(valores.Factor)
              console.log("SA35",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="SA47") {
              arrayDatosValores.push(valores.Factor)
              console.log("SA47",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="SA48") {
              arrayDatosValores.push(valores.Factor)
              console.log("SA48",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="SA49") {
              arrayDatosValores.push(valores.Factor)
              console.log("SA49",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="SA50") {
              arrayDatosValores.push(valores.Factor)
              console.log("SA50",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="SA55") {
              arrayDatosValores.push(valores.Factor)
              console.log("SA55",valores.Numero,"este es ",valores.Factor)
        
              if (escala.Dimension=="Autoaceptación en el trabajo"){
                arrayDatosValores.push(arrayDatosValores[25]+arrayDatosValores[26]+
                  arrayDatosValores[27]+arrayDatosValores[28]+arrayDatosValores[29]+
                  arrayDatosValores[30])
                console.log(arrayDatosValores[31], "Total AUTOACPTACION")
              }

  /**PROPOSITO */

          }else if (valores.Numero=="P38") {
              arrayDatosValores.push(valores.Factor)
              console.log("P38",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="P42") {
              arrayDatosValores.push(valores.Factor)
              console.log("P42",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="P43") {
              arrayDatosValores.push(valores.Factor)
              console.log("P43",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="P44") {
              arrayDatosValores.push(valores.Factor)
              console.log("P44",valores.Numero,"este es ",valores.Factor)
          
        
              if (escala.Dimension=="Propósito en el trabajo"){
                arrayDatosValores.push(arrayDatosValores[32]+arrayDatosValores[33]+
                  arrayDatosValores[34]+arrayDatosValores[35])
                console.log(arrayDatosValores[36], "Total PROPOSITO")
              }

/** EMOCIONES 1*/

          }else if (valores.Numero=="H1") {
              arrayDatosValores.push(valores.Factor)
              console.log("H1",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="H2") {
              arrayDatosValores.push(valores.Factor)
              console.log("H2",valores.Numero,"este es ",valores.Factor)
          }else if (valores.Numero=="H3") {
              arrayDatosValores.push(valores.Factor)
              console.log("H3",valores.Numero,"este es ",valores.Factor)
          
          
        
              
                arrayDatosValores.push(arrayDatosValores[37]+arrayDatosValores[38]+
                arrayDatosValores[39])
                console.log(arrayDatosValores[40], "Total EMOCIONES 1")
              
      
/** EMOCIONES 2 */

          }else if (valores.Numero=="H5") {
              arrayDatosValores.push(valores.Factor)
              console.log("H5",valores.Numero,"este es ",valores.Factor)
          
          
        
             
                arrayDatosValores.push(arrayDatosValores[41])
                console.log(arrayDatosValores[42], "Total EMOCIONES 2 ")
              
/** SATISFACCION */

          }else if (valores.Numero=="H8") {
                 arrayDatosValores.push(valores.Factor)
                console.log("H8",valores.Numero,"este es ",valores.Factor)



              
                  arrayDatosValores.push(arrayDatosValores[43])
                  console.log(arrayDatosValores[44], "Total EMOCIONES 2 ")
                

                  
          } else {
            console.log("no clasifica en ninguna")
          }
            
            arrayVacio.push(valores.Factor)
            const two=[valores.Factor]
            

        })
        arrayVacio.push(three)
        })

        datos.RecursosCol.map((recursos)=>{
          if(recursos.Caso===1){
            arrayVacio.push(recursos.Factor)
          }else if(recursos.Caso===2){
            arrayVacio.push(recursos.Factor)
          }
        })
        console.log("Valores",arrayDatosValores)
        let arraynuevo = arrayVacio
        arrayVacio.push(datos.Fecha)

        if(datos.Institucion==''){
          var temp=arrayVacio[27]
        arrayVacio[117]=[datos.Persona.Rifa]  
        arrayVacio[116]=datos.Fecha
        arrayVacio[115]="NA"
        arrayVacio[114]=arrayVacio[85]
        arrayVacio[113]=arrayVacio[84]
        arrayVacio[112]="NA"
        arrayVacio[111]="NA"
        arrayVacio[110]=arrayVacio[83]
        arrayVacio[109]=arrayVacio[82]
        arrayVacio[108]=arrayVacio[81]
        arrayVacio[107]="NA"
        arrayVacio[106]="NA"
        arrayVacio[105]="NA"
        arrayVacio[104]=arrayVacio[80]
        arrayVacio[103]=arrayVacio[79]
        arrayVacio[102]=arrayVacio[78]
        arrayVacio[101]="NA"//
        arrayVacio[100]=arrayVacio[77]
        arrayVacio[99]=arrayVacio[76]
        arrayVacio[98]=arrayVacio[75]
        arrayVacio[97]=arrayVacio[74]
        arrayVacio[96]=arrayVacio[73]
        arrayVacio[95]=arrayVacio[72]
        arrayVacio[94]="NA"
        arrayVacio[93]=arrayVacio[71]
        arrayVacio[92]=arrayVacio[70]
        arrayVacio[91]=arrayVacio[69]
        arrayVacio[90]="NA"
        arrayVacio[89]=arrayVacio[68]
        arrayVacio[88]="NA"
        arrayVacio[87]=arrayVacio[67]
        arrayVacio[86]="NA"
        arrayVacio[85]=arrayVacio[66]
        arrayVacio[84]=arrayVacio[65]
        arrayVacio[83]="NA"
        arrayVacio[82]="NA"
        arrayVacio[81]=arrayVacio[64]
        arrayVacio[80]=arrayVacio[63]
        arrayVacio[79]="NA"
        arrayVacio[78]=arrayVacio[62]
        arrayVacio[77]="NA"

       
        arrayVacio[76]=arrayDatosValores[44]
        arrayVacio[75]=arrayDatosValores[43]

        

        arrayVacio[74]=arrayDatosValores[42]//total
        arrayVacio[73]="NA"
        arrayVacio[72]="NA"
        arrayVacio[71]=arrayDatosValores[41]
        arrayVacio[70]=arrayDatosValores[40]//total
        arrayVacio[69]=arrayDatosValores[39]
        arrayVacio[68]=arrayDatosValores[38]
        arrayVacio[67]=arrayDatosValores[37]
        arrayVacio[66]=arrayDatosValores[36]//totales
        arrayVacio[65]="NA"
        arrayVacio[64]=arrayDatosValores[35]
        arrayVacio[63]=arrayDatosValores[34]
        arrayVacio[62]=arrayDatosValores[33]
        arrayVacio[61]=arrayDatosValores[32]
        arrayVacio[60]=arrayDatosValores[31]//totales
        arrayVacio[59]=arrayDatosValores[30]
        arrayVacio[58]="NA"
        arrayVacio[57]=arrayDatosValores[29]
        arrayVacio[56]=arrayDatosValores[28]
        arrayVacio[55]=arrayDatosValores[27]
        arrayVacio[54]=arrayDatosValores[26]
        arrayVacio[53]="NA"
        arrayVacio[52]=arrayDatosValores[25]
        arrayVacio[51]=arrayDatosValores[24]//totales
        arrayVacio[50]=arrayDatosValores[23]
        arrayVacio[49]=arrayDatosValores[22]
        arrayVacio[48]=arrayDatosValores[21]
        arrayVacio[47]=arrayDatosValores[20]
        arrayVacio[46]="NA"
        arrayVacio[45]=arrayDatosValores[19]
        arrayVacio[44]="NA"
        arrayVacio[43]="NA"
        arrayVacio[42]="NA"
        arrayVacio[41]=arrayDatosValores[18]//total
        arrayVacio[40]="NA"
        arrayVacio[39]=arrayDatosValores[17]
        arrayVacio[38]=arrayDatosValores[16]
        arrayVacio[37]=arrayDatosValores[15]
        arrayVacio[36]=arrayDatosValores[14]
        arrayVacio[35]=arrayDatosValores[13]
       
        arrayVacio[34]=arrayDatosValores[12]
        arrayVacio[33]=arrayDatosValores[11]//total
        arrayVacio[32]=arrayDatosValores[10]
        arrayVacio[31]=arrayDatosValores[9]
        arrayVacio[30]=arrayDatosValores[8]
        arrayVacio[29]="NA"
        arrayVacio[28]=arrayDatosValores[7]
        arrayVacio[27]=arrayDatosValores[6]
        arrayVacio[26]=arrayDatosValores[5]
        arrayVacio[25]="NA"
        arrayVacio[24]=arrayDatosValores[3]//total
        arrayVacio[23]=arrayDatosValores[4]
        arrayVacio[22]="NA"
        arrayVacio[21]="NA"
        arrayVacio[20]=arrayDatosValores[2]
        arrayVacio[19]=arrayDatosValores[1]
        arrayVacio[18]=arrayDatosValores[0]
 
        
        }
        
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

export default DescargaInformesGeneralAlterno;
