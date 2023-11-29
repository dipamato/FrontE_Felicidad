import React from 'react';
import logoG from "./../logoHaw6.PNG"
import { Container,  Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";




function HeaderStatic()  {
  return (
    <Container>
    <header className="headerStatic">
      
      <div className="logo">
        <img src={logoG} alt="LogoG" />
      </div>
      <nav className="navigation">
     {/* <Nav style={{marginLeft: "350px"}} className="navigation">
        
          <NavItem className="ml-auto"><NavLink href="/">Contactame: </NavLink></NavItem>
          <NavItem className="ml-auto"><NavLink href="/cursos">paerazom@unal.edu.co</NavLink></NavItem>*/}
        <ul className="nav-list">
            <li className="nav-item">
              <div className="nav-content">
                Si tienes alguna inquietud, duda o sugerencia, por favor escríbeme  o llámame a:
                <br />
                <span className="nav-email">paerazom@unal.edu.co - +57 311 4761809</span>
              </div>
            </li>
          </ul>
          </nav>
      
    </header>

    </Container>
  );
}

export default HeaderStatic;