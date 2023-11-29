import React from 'react';
import logo from "./../logoHaw7.png"
import { Container} from "reactstrap";

function HeaderScroll({ active }) {
  const headerClassName = active ? 'header-scroll active' : 'headerScroll';
  
  return (
    <Container>
    <header className={headerClassName}>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav className="navigationScroll">
          <ul className="nav-listScroll">
            <li className="nav-itemScroll">
              <div className="nav-contents">
                Si tienes alguna inquietud, duda o sugerencia, por favor escríbeme  o llámame a:
                <br />
                <span className="nav-emails">paerazom@unal.edu.co - +57 311 4761809</span>
              </div>
            </li>
          </ul>
        </nav>
      
    </header>
    </Container>

  );
}

export default HeaderScroll;