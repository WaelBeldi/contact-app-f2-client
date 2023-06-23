import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../redux/actions/authActions';
import { toggleFalse } from '../redux/actions/editActions';
import Login from './auth/Login';
import Register from './auth/Register';

const AppNavBar = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.authReducer.isAuth)
  const user = useSelector(state => state.authReducer.user)

  const logout = () => {
    dispatch(logoutUser())
  }
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>MERN AUTH</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
          </Nav.Link>
          {!isAuth
            ? (<></>)
            : (
              <>
                <Nav.Link>
                  <Link to="/contact_list" style={{ color: "white", textDecoration: "none" }}>Contact List</Link>
                </Nav.Link>
                <Nav.Link onClick={() => { dispatch(toggleFalse()) }}>
                  <Link to="/add" style={{ color: "white", textDecoration: "none" }}>Add Contact</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>Profile</Link>
                </Nav.Link>
              </>
            )
          }
        </Nav>
      </Container>
      {isAuth
        ? (<>
          <span> Hello {user.name} </span>
          <Button onClick={logout}>Logout</Button>
        </>)
        : (
          <>
            <Login />
            <Register />
          </>
        )
      }
    </Navbar>
  )
}

export default AppNavBar