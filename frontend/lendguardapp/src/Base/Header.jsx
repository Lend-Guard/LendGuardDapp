import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React ,{useState} from "react";
import {Connect} from "../WalletProvider/components/Connect"
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Headers() {
  return (
    <Navbar expand="lg" className="" style={{backgroundColor: "#141414"}}>
      <Container fluid>
        <Navbar.Collapse id="navbarScroll">
            <h3 className="gradient-text">LendGuard</h3>
          <Form className="d-flex" style={{marginLeft: "auto"}}>
            <Connect/>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}