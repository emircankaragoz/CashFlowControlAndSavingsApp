import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import styles from '../styles/Home.module.css'

export default function NavbarComponents({ user, handleSignOut }) {
  return (
      <Navbar
        variant="dark"
        collapseOnSelect
        expand="sm"
        className={styles.bgc_navbar}
      >
        <Container>
          <Navbar.Brand href="" className="fw-semibold">
            moingo
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <NavDropdown title={user.email} id="basic-nav-dropdown">
                <NavDropdown.Item href="">Ayarlar</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleSignOut}>
                  Çıkış Yap
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}
