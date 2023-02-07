import './Header.css';
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useUser } from '../context/UserContext.js';
import { signOut } from '../services/auth.js';

export default function Header() {
  const { user, setUser } = useUser();

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  };

  return (
    <Navbar className="header px-3 justify-content-between">
      <Navbar.Brand href="/">
        <img
          src="/reddit.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="ToDo Logo"
        />
        {'  '}
        Reddit
      </Navbar.Brand>
      {user && (
        <Nav className="mr-auto">
          <Navbar.Text>{user.email}</Navbar.Text>
          <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
        </Nav>
      )}
    </Navbar>
  );
}
