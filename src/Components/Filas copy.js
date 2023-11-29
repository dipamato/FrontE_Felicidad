import React, { useEffect, useState } from "react";
import { Container, Input } from "reactstrap";

function Filas(props) {
 
  const apiUrl= process.env.REACT_APP_API_URL

  const [selectedValue, setSelectedValue] = useState(0);
  /** Se genera el Objeto para almacenar el valor seleccionado por el usuario con un estado para poder cambiarlo dependiendo del valor seleccionado*/
  const [data, setData] = useState({ Factor: 0 });
//  este estado sirve para poder enviar al back la selección del usuario
  const [buttonClicked, setButtonClicked] = useState(false);
  

  const idP = props.idP;
  const idE= props.idEncu

  useEffect(()=>{
    if (buttonClicked) {
    fetch(`${apiUrl}/respuestas-e/${idE}/Pregunta/${idP}`, {
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

  }, [buttonClicked, data])

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
      <td className="w-55"  style={{ padding: '8px', textAlign: "left", width: '1000px' }}>
        {props.rowData}
      </td>
      <td  style={{ padding: '8px',  width: '200px' }} colSpan={7}>
        <td  >
          <label  style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '18px', marginRight: '8px' }}>1</span>
            <Input
              type="checkbox"
              value="1"
              checked={selectedValue === "1"}
              onChange={handleChange}
              onClick={handleButtonClick}
              style={{ transform: 'scale(2)', marginRight: '8px' }}
              
            />
          </label>
        </td>
        <td>
        <label  style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '18px', marginRight: '8px' }}>2</span>
            <Input
              type="checkbox"
              value="2"
              checked={selectedValue === "2"}
              onChange={handleChange}
              onClick={handleButtonClick}
              style={{ transform: 'scale(2)', marginRight: '8px' }}
            />
          </label>
        </td>
        <td>
        <label  style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '18px', marginRight: '8px' }}>3</span>
            <Input
              type="checkbox"
              value="3"
              checked={selectedValue === "3"}
              onChange={handleChange}
              onClick={handleButtonClick}
              style={{ transform: 'scale(2)', marginRight: '8px' }}
            />
          </label>
        </td>
        <td>
        <label  style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '18px', marginRight: '8px' }}>4</span>
            <Input
              type="checkbox"
              value="4"
              checked={selectedValue === "4"}
              onChange={handleChange}
              onClick={handleButtonClick}
              style={{ transform: 'scale(2)', marginRight: '8px' }}
            />
          </label>
        </td>
        <td>
        <label  style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '18px', marginRight: '8px' }}>5</span>
            <Input
              type="checkbox"
              value="5"
              checked={selectedValue === "5"}
              onChange={handleChange}
              onClick={handleButtonClick}
              style={{ transform: 'scale(2)', marginRight: '8px' }}
            />
          </label>
        </td>
        <td>
        <label  style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '18px', marginRight: '8px' }}>6</span>
            <Input
              type="checkbox"
              value="6"
              checked={selectedValue === "6"}
              onChange={handleChange}
              onClick={handleButtonClick}
              style={{ transform: 'scale(2)', marginRight: '8px' }}
            />
          </label>
        </td>
        <td>
        <label  style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '18px', marginRight: '8px' }}>7</span>
            <Input
              type="checkbox"
              value="7"
              checked={selectedValue === "7"}
              onChange={handleChange}
              onClick={handleButtonClick}
              style={{ transform: 'scale(2)', marginRight: '8px' }}
            />
          </label>
        </td>
      </td> </tr>
      
      </>
  );
}

export default Filas;
