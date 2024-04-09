import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Ppal from "./Pages/Ppal";
import HomePage1 from "./Pages/Encuestas/HomePage1";
import HomePage2 from "./Pages/Encuestas/HomePage2";
import HomePage3 from "./Pages/Encuestas/HomePage3";
import HomePage4 from "./Pages/Encuestas/HomePage4";
import HomePage5 from "./Pages/Encuestas/HomePage5";
import HomePage6 from "./Pages/Encuestas/HomePage6";
import HomePage7 from "./Pages/Encuestas/HomePage7";
import HomePage8 from "./Pages/Encuestas/HomePage8";
import HomePage9 from "./Pages/Encuestas/HomePage9";
import Caracterizacion from "./Pages/Caracterizacion";
import Despedida from "./Components/Despedida";

import logo from "./../src/tel.png";
import logo1 from "./../src/importante.png";

import SCol from "./Pages/SCol";
import FormPersona from "./Pages/FormPersona";
import Inicio from "./Pages/Inicio";
import React, { useEffect, useState } from "react";
import HeaderStatic from "./Components/HeaderStatic";
import HeaderScroll from "./Components/HeaderScroll";
import DescargaInformes from "./Components/DescargaInformes";
import InsertarColegios from "./Components/InsertarColegios";


import Modal from "react-modal";
import CaracterizacionSena from "./Pages/CaracterizacionSena";
import CaracterizacionSena1 from "./Pages/CaracterizacionSena1";
import SColAux from "./Pages/SColAux";
import FormPersonaAux1 from "./Pages/FormPersonaAux1";


function App() {
  const [isHeaderActive, setIsHeaderActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsHeaderActive(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  //Primer Modal
  const [isModalOpen, setIsModalOpen] = useState(true);

 

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(56, 160, 165, 0.5)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      maxWidth: "400px",
      width: "100%",
      padding: "20px",
      backgroundColor: "#485767",
      border: "none",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      color: "#ebeff1", // Asegúrate de que el color del texto sea legible
    },
  };

  // Segundo Modal
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  useEffect(() => {
    // Verificar si es la página de inicio
    const isHomePage = window.location.pathname === "/";

    // Mostrar el modal solo en la página de inicio
    if (isHomePage) {
      setIsModalOpen(true);
    }

    // Abrir el segundo modal al cerrar el primero
    if (!isModalOpen && isHomePage) {
      setIsSecondModalOpen(true);
      setIsModalOpen(false);
    }
  }, [isModalOpen]);

  const closeSecondModal = () => {
    setIsSecondModalOpen(false);
  };

  return (
    <>
      <HeaderStatic />
      <HeaderScroll active={isHeaderActive} />
      <Router>
        <Routes>
          <Route exact path="/CrearI" element={<InsertarColegios />} />
         {/* <Route exact path="/" element={<Ppal />} />*/}
         <Route exact path="/" element={<SColAux/>} />
          <Route exact path="/S878720h4PP" element={<DescargaInformesGeneral />} />
          {/*<Route exact path="/Choose" element={<SCol />} />
          <Route exact path="/Choose1" element={<Caracterizacion />} />
          <Route exact path="/Choose2" element={<CaracterizacionSena1 />} />
  <Route exact path="/Choose3" element={<CaracterizacionOtros />} />*/}
          <Route exact path="/Responda/:id" element={<HomePage1 />} />
          <Route exact path="/Responda2/:id" element={<HomePage2 />} />
          <Route exact path="/Responda3/:id" element={<HomePage3 />} />
          <Route exact path="/Responda4/:id" element={<HomePage4 />} />
          <Route exact path="/Responda5/:id" element={<HomePage5 />} />
          <Route exact path="/Responda6/:id" element={<HomePage6 />} />
          <Route exact path="/Responda7/:id" element={<HomePage7 />} />
          <Route exact path="/Responda8/:id" element={<HomePage8 />} />
          <Route exact path="/Responda9/:id" element={<HomePage9 />} />
          <Route exact path="/Datos/:id" element={<FormPersonaAux1 />} />
          <Route exact path="/Info" element={<Inicio />} />
         {/*<Route exact path="/Selecciona" element={<Despedida />} />*/}
        </Routes>
        <Modal
           style={customStyles}
           isOpen={isModalOpen}
           onRequestClose={closeModal}
           afterClose={closeSecondModal}
        >
          <h2 style={{ textAlign: "center", fontFamily: "Kalam bold" }}>
            HAW{" "}
          </h2>
          <h4 style={{ textAlign: "center", fontFamily: "Kalam " }}>
            Felicidad en el trabajo
          </h4>
          <p
            style={{
              textAlign: "center",
              fontFamily: "Kalam ",
              fontSize: "15px",
            }}
          >
            Si vas a responder desde tu móvil, por favor asegurate de ubicarlo
            en modo horizontal
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "20%", transform: "rotate(90deg)" }}
              src={logo}
              alt="Logo"
            />
          </div>
          <br />
          <p style={{ textAlign: "center", fontFamily: "Kalam " }}>
            (Giralo!!)
          </p>

          <p style={{ textAlign: "center", fontFamily: "Kalam " }}>
            🚨 Para una mejor visualización recomendamos responder desde un
            computador 🚨
          </p>

          <button className="botonModal" onClick={closeModal}>
            Cerrar
          </button>
        </Modal>
        // Segundo Modal
        <Modal
          style={customStyles}
          isOpen={isSecondModalOpen}
          onRequestClose={closeSecondModal}
        >
          <h2 style={{ textAlign: "center", fontFamily: "Kalam bold" }}>
            HAW{" "}
          </h2>
          <h4 style={{ textAlign: "center", fontFamily: "Kalam " }}>
            Felicidad en el trabajo
          </h4>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "50%", }}
              src={logo1}
              alt="Logo1"
            />
          </div>
          <br />
          <p style={{ textAlign: "center", fontFamily: "Kalam " }}>
            IMPORTANTE: Al finalizar el siguiente cuestionario, usted
            obtendrá el reporte del nivel de su felicidad en el trabajo
          </p>

          <button className="botonModal" onClick={closeSecondModal}>
            Cerrar
          </button>
        </Modal>
      </Router>
    </>
  );
}

export default App;
