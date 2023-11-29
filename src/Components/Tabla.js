import Filas from "./Filas";
import { Table, Container } from "reactstrap";
import React, {  useState } from "react";
function Tabla(props) {
 

  const rows = props.data.map((rowData) => (
    <Filas
      key={rowData._id}
      rowData={rowData.Item}
      idEncu={props.idEncu}
      idP={rowData._id}
    />
  ));

  return (
    <Container style={{ marginTop: "25px", whiteSpace: "nowrap" }}>
      <Table style={{ borderCollapse: "collapse" }} responsive>
        <thead>
          <tr>
            <th style={{ padding: "8px", width: "200px" }}></th>
            <tr style={{ padding: "8px" }} colSpan={7}></tr>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
}

export default Tabla;
