import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import UserContext from '../UserContext'
import {Fragment, useContext} from 'react'

export default function AppNavbar() {

  const { user } = useContext(UserContext)

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/" className="mx-3">
        GizBytes
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link as={Link} to="/" exact>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/products" exact>
            Products
          </Nav.Link>

          { (user.id !== null) ?
            <Fragment>
              <Navbar.Text>Hello {user.firstName} {user.lastName} welcome to Gizbytes! </Navbar.Text>
              <Nav.Link as={Link} to="/user" exact>{/* <i class="fas fa-user"></i> */}Your Profile</Nav.Link>
              <Nav.Link as={Link} to="/cart" exact>{/* <i class="fas fa-user"></i> */}Cart</Nav.Link>            
              <Nav.Link as={Link} to="/logout" exact>Logout</Nav.Link>
            </Fragment> :
            <Fragment>
              <Nav.Link as={Link} to="/register" exact className="ml-auto">Register</Nav.Link>
              <Nav.Link as={Link} to="/login" exact>Login</Nav.Link>              
            </Fragment>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
