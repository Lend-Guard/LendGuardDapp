import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React ,{useState} from "react";
import {Connect} from "../WalletProvider/components/Connect"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


export default function Headers() {
  return (
    <Navbar expand="lg" className="" style={{backgroundColor: "#141414"}}>
      <Container fluid>
        <Navbar.Collapse id="navbarScroll">
        <Link to="/" className="navbar-brand">
        <h3 className="gradient-text">LendGuard</h3>
      </Link>
          <Form className="d-flex" style={{marginLeft: "auto"}}>
            <Connect/>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}