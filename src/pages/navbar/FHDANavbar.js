import React from 'react';
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import { useOktaAuth } from '@okta/okta-react'
import da_logo from "../../assets/pic/fhdalogo.jpg";

const FHDANavbar = ({ setCorsErrorModalOpen }) => {
  const { authState, oktaAuth } = useOktaAuth();
  
  const isCorsError = (err) => (err.name === 'AuthApiError' && !err.errorCode && err.xhr.message === 'Failed to fetch');
  const logout = async () => {
    try {
      await oktaAuth.signOut();
    } catch (err) {
      if (isCorsError(err)) {
        setCorsErrorModalOpen(true);
      } else {
        throw err;
      }
    }
  };

  if (!authState) {
    return null;
  }

  return (
    <div>
      <Navbar bg="red" variant="dark" className="navbar">
        <Link className="navbar-brand" to="/">
          <img className="navbar-img" src={da_logo} alt="" /> FHDATime
        </Link>
        <Nav className="mr-auto">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/catalog">Catalog</Link>
          <Link className="nav-link" to="/story">Story</Link>
          <Link className="nav-link" to="/about">About</Link>
          {authState.isAuthenticated && (
            <Link className="nav-link" onClick={logout} to='/'>Logout</Link>
          )}
          {!authState.isPending && !authState.isAuthenticated && (
            <Link className="nav-link" to='/login'>Login</Link>
          )}
          
        </Nav>
      </Navbar>
    </div>
  );
};
export default FHDANavbar;