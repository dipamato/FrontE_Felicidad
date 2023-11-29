 
import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";

function FilasRecursos(props) {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [selectedValue, setSelectedValue] = useState(0);
  /** Se genera el Objeto para almacenar el valor seleccionado por el usuario con un estado para poder cambiarlo dependiendo del valor seleccionado*/
  const [data, setData] = useState({ Factor: 0 });
  //  este estado sirve para poder enviar al back la selección del usuario
  const [buttonClicked, setButtonClicked] = useState(false);

  const idP = props.idP;
  const idE = props.idEncu;

  useEffect(() => {
    if (buttonClicked) {
      fetch(`${apiUrl}/respuestas-e/${idE}/PreguntaRecurso/${idP}`, {
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
  }, [buttonClicked, data]);

  function handleChange(event) {
    const newFactorValue = Number(event.target.value);
    setSelectedValue(event.target.value);
    setData({ Factor: newFactorValue });

    console.log(data);
  }

  function handleButtonClick() {
    setButtonClicked(true);
  }

  return (
    <>
      <tr>
        <td
          className="w-auto text-center align-middle ancho"
          style={{
            color: "white",
            padding: "8px",
            fontSize:"15px",
            border:"2px solid #ebeff1", 
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            maxWidth: "100%" ,// Límite de ancho máximo por defecto  
          }}
        >
          <span style={{marginInlineStart:"150px",  color: "white",
            padding: "8px",
            fontSize:"16px",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word", marginInlineEnd:"85px"}}>
          
          {props.rowData}
          </span>
        </td>
      </tr>
      <tr style={{ backgroundColor: "#ebeff1", textAlign: "center",border:"5px solid #ebeff1" }}>
      <div className="d-flex justify-content-center align-items-center">
        <td style={{ color: "#485767", padding: "8px" }} colSpan={11}>
        
          <td>
            <span
              style={{
                color: "#485767",
                fontSize: "15px",
                marginRight: "250px",
              }}
            ></span>
            
          </td>
          
          <td>
            <span
              style={{
                color: "#485767",
                fontSize: "15px",
                marginRight: "18px",
              }}
            >
              Totalmente en desacuerdo
            </span>
          </td>
          <td>
            <label style={{ display: "center", alignItems: "center" }}>
              <span style={{ fontSize: "25px", marginRight: "18px" }}>1</span>
              <Input
                type="checkbox"
                value="1"
                checked={selectedValue === "1"}
                onChange={handleChange}
                onClick={handleButtonClick}
                style={{ transform: "scale(1.5)", marginRight: "8px", border:"2px solid #485767"}}
               
              />
            </label>
          </td>

          <td>
            <label style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: "25px", marginRight: "12px" }}>2</span>
              <Input
                type="checkbox"
                value="2"
                checked={selectedValue === "2"}
                onChange={handleChange}
                onClick={handleButtonClick}
                style={{ transform: "scale(1.5)", marginRight: "8px", border:"2px solid #485767" }}
              />
            </label>
          </td>
          <td>
            <label style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: "25px", marginRight: "12px" }}>3</span>
              <Input
                type="checkbox"
                value="3"
                checked={selectedValue === "3"}
                onChange={handleChange}
                onClick={handleButtonClick}
                style={{ transform: "scale(1.5)", marginRight: "8px" , border:"2px solid #485767"}}
              />
            </label>
          </td>
          <td>
            <label style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: "25px", marginRight: "12px" }}>4</span>
              <Input
                type="checkbox"
                value="4"
                checked={selectedValue === "4"}
                onChange={handleChange}
                onClick={handleButtonClick}
                style={{ transform: "scale(1.5)", marginRight: "8px", border:"2px solid #485767" }}
              />
            </label>
          </td>
          <td>
            <label style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: "25px", marginRight: "12px" }}>5</span>
              <Input
                type="checkbox"
                value="5"
                checked={selectedValue === "5"}
                onChange={handleChange}
                onClick={handleButtonClick}
                style={{ transform: "scale(1.5)", marginRight: "8px", border:"2px solid #485767" }}
              />
            </label>
          </td>
          <td>
            <label style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: "25px", marginRight: "12px" }}>6</span>
              <Input
                type="checkbox"
                value="6"
                checked={selectedValue === "6"}
                onChange={handleChange}
                onClick={handleButtonClick}
                style={{ transform: "scale(1.5)", marginRight: "8px", border:"2px solid #485767" }}
              />
            </label>
          </td>
          <td>
            <label style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: "25px", marginRight: "12px" }}>7</span>
              <Input
                type="checkbox"
                value="7"
                checked={selectedValue === "7"}
                onChange={handleChange}
                onClick={handleButtonClick}
                style={{ transform: "scale(1.5)", marginRight: "8px", border:"2px solid #485767"}}
              />
            </label>
          </td>
          <td>
            <span
              style={{ color: "#485767", fontSize: "15px", marginLeft: "18px" }}
            >
              Totalmente de acuerdo
            </span>
          </td>
          <td>
            <span
              style={{
                color: "#edff21",
                fontSize: "15px",
                marginLeft: "250px",
              }}
            ></span>
          </td>
          
        </td>
        </div>
      </tr>
    </>
  );
}

export default FilasRecursos;
