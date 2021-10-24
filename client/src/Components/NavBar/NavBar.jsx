import React from "react";
import { Navbar, Nav,NavDropdown} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import "./NavBar.css";
function NavBar() {
  return (  
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Calc-Frete</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-start">
          <Nav>
            <LinkContainer to='/CalcFrete'><Nav.Link >Frete</Nav.Link></LinkContainer>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
            <Nav>
              <LinkContainer to='/'><Nav.Link >Sair</Nav.Link></LinkContainer>
            </Nav>
        </Navbar.Collapse>
      </Navbar>
  );
}

export default NavBar;
