import './App.css';
import Header from './components/Header';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from './components/Auth';
import { Col, Container, Row } from 'react-bootstrap';
import PostList from './components/Post/PostList.js';
import EditPost from './components/Post/EditPost.js';
import NewPost from './components/Post/NewPost.js';
import Posts from './components/Post/Posts.js';

function App() {
  return (
    <div className="app">
      <Header />
      <Container className="mt-5">
        <Row className="d-flex justify-content-center">
          <Col sm={10} md={8} lg={6} className="border rounded px-3 py-3">
            <Switch>
              <Route path="/auth/:type" component={Auth} />
              <Route path="/posts/:id/edit" component={EditPost} />
              <Route path="/posts/new" component={NewPost} />
              <Route path="/posts" component={Posts} />
              <Route path="*">
                <Redirect to="/auth/sign-in" />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
