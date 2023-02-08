import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useUser } from '../context/UserContext.js';
import { signOut } from '../services/auth.js';
import '../App.css';

export default function Header() {
  const { user, setUser, parseUsername } = useUser();

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
          <Navbar.Text>{user && parseUsername(user.email)}</Navbar.Text>
          <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
        </Nav>
      )}
    </Navbar>
  );
}
