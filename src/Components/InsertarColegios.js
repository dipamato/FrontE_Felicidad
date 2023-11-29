import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormGroup, Label, Input, Button, Form, Row, Col } from "reactstrap";

function InsertarColegios() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [colegio, setColegio] = useState("");
  const [idColegio, setIdColegio] = useState("");
  const [cantidadSedes, setCantidadSedes] = useState(0);
  const [sedes, setSedes] = useState([]);
 

  const handleColegioChange = (e) => {
    setColegio(e.target.value);
  };

  const handleSedeChange = (index, field, value) => {
    const updatedSedes = [...sedes];
    updatedSedes[index][field] = value;
    setSedes(updatedSedes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const institucion = {
      Nombre: colegio,
      Municipio: "Manizales",
      Sedes: [],
    };

    axios
      .post(`${apiUrl}/institucion`, institucion, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Datos guardados:", response.data);
        const currentIdColegio = response.data.resultado._id;
        setIdColegio(response.data.resultado._id);
      })
      .catch((error) => {
        console.error("Error al guardar los datos:", error);
      });

    const newSedes = Array.from({ length: cantidadSedes }, () => ({
      nombre: "",
      zona: "",
      jornada: "",
      nivel: "",
      modelo: "",
      idSede: "",
    }));

    setSedes(newSedes);
  };

const handleSubmitSede = async (e) => {
  e.preventDefault();

  if (idColegio) {
    try {
      // Array para almacenar las promesas de las solicitudes POST
      const postPromises = [];

      sedes.forEach((sede, index) => {
        const sedeI = {
          Nombre: sede.nombre,
          Municipio: sede.municipio
        };

        // Agregar la promesa a la matriz
        const postPromise = axios.post(`${apiUrl}/sede`, sedeI, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        postPromises.push(postPromise);
      });

      // Esperar a que todas las promesas se resuelvan
      const postResponses = await Promise.all(postPromises);

      const updatedSedes = [...sedes];
      postResponses.forEach((response, index) => {
        const currentIdSede = response.data.resultado._id;
        updatedSedes[index].idSede = currentIdSede;
      });
      setSedes(updatedSedes);

      // Crear matriz de objetos con los IDs de las sedes
      const sedeIds = sedes.map((sede) => ({ Sedes: sede.idSede }));

      console.log("ids", sedeIds);

      // Realizar las solicitudes PATCH
      const patchPromises = sedeIds.map((x) =>
        axios.patch(`${apiUrl}/institucion/insertar/${colegio}`, x, {
          headers: {
            "Content-Type": "application/json",
          },
        })
      );

      // Esperar a que todas las solicitudes PATCH se completen
      const patchResponses = await Promise.all(patchPromises);
      console.log("Respuestas PATCH:", patchResponses);
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  }
};

  useEffect(() => {setSedes(sedes);}, [sedes]);
  const handleCantidadSedesChange = (event) => {
    setCantidadSedes(parseInt(event.target.value));
  };

  return (
    <>
      <Row>
        <Col>
          <Form style={{ color: "black" }} onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="colegio">Nombre del colegio</Label>
              <Input
                type="text"
                id="colegio"
                value={colegio}
                onChange={handleColegioChange}
              />
            </FormGroup> 

            <FormGroup>
              <Label for="cantidadSedes">Cantidad de sedes a crear</Label>
              <Input
                type="number"
                id="cantidadSedes"
                value={cantidadSedes}
                onChange={handleCantidadSedesChange}
              />
            </FormGroup>

            <Button type="submit">Crear colegio</Button>
          </Form>
        </Col>

        <Col>
          <Form style={{ color: "black" }} onSubmit={handleSubmitSede}>
            {sedes.map((sede, index) => (
              <FormGroup key={index}>
                <Label for={`nombre${index}`}>Nombre de la sede {index + 1}</Label>
                <Input
                  className="form-control"
                  type="text"
                  id={`nombre${index}`}
                  value={sede.nombre}
                  onChange={(e) => handleSedeChange(index, "nombre", e.target.value)}
                />

               

                <Label for={`jornada${index}`}>Municipio {index + 1}</Label>
                <Input
                  className="form-control"
                  type="text"
                  id={`Municipio${index}`}
                  value={sede.municipio}
                  onChange={(e) => handleSedeChange(index, "municipio", e.target.value)}
                />

                
              </FormGroup>
            ))}

            <Button type="submit">Crear Sede</Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default InsertarColegios;

