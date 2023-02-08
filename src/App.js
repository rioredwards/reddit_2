import './App.css';
import Header from './components/Header';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from './components/Auth';
import { Col, Container, Row } from 'react-bootstrap';
import { useUser } from './context/UserContext.js';
import PostList from './components/Post/PostList.js';

function App() {
  const { user } = useUser();
  return (
    <div className="app">
      <Header />
      <Container className="mt-5">
        <Row className="d-flex justify-content-center">
          <Col sm={10} md={8} lg={6} className="border rounded px-3 py-3">
            <Switch>
              <Route exact path="/">
                <>
                  {user && <Redirect to="/posts" />}
                  {!user && <Redirect to="/auth/sign-in" />}
                </>
              </Route>
              <Route path="/auth/:type" component={Auth} />
              <Route path="/posts" component={PostList} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
