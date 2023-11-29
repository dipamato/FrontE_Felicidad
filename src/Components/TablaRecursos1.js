import React from "react";
import { Table,  Container } from 'reactstrap'
import FilasRecursos1 from "./FilasRecursos1";

function TablaRecursos(props) {
 

  const rows = props.data.map((rowData) => (
    <FilasRecursos1 key={rowData._id} rowData={rowData.Item} idEncu={props.idEncu}  idP={rowData._id}/>
  ));

  return (
    <Container style={{  maxWidth: "150%",marginTop:"5px", overflowX:'auto', whiteSpace:'nowrap'}}>
      <Table responsive style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '8px', width: '250px'  }}></th>
            <tr style={{ padding: '8px' }} colSpan={7}></tr>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
}

export default TablaRecursos;
