import './Auth.css';
import { useState } from 'react';
import { Button, Container, Form, Nav } from 'react-bootstrap';
import { Redirect, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { authUser } from '../services/auth';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { type } = useParams();
  const { user, setUser } = useUser();

  if (user) {
    return <Redirect to="/posts" />;
  }

  const submitAuth = async () => {
    try {
      const newUser = await authUser(email, password, type);
      setUser(newUser);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container className="auth-container d-flex flex-column align-items-center px-3 py-4">
      <Form
        onSubmit={(e) => {
          submitAuth();
          e.preventDefault();
        }}
      >
        <h2>Welcome to Reddit</h2>
        <hr />
        <Nav className="mt-4" justify variant="tabs" activeKey={type}>
          <Nav.Item>
            <Nav.Link eventKey="sign-in" href="/auth/sign-in">
              Sign In
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="sign-up" href="/auth/sign-up">
              Sign Up
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Form.Group className="mb-3 mt-4">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            id="emailInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            id="passwordInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {type}
        </Button>
      </Form>
    </Container>
  );
}
