import React from 'react';
import { Button, Container } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect,
} from 'react-router-dom';
import { useUser } from '../../context/UserContext.js';
import { usePosts } from '../../hooks/usePosts.js';
import DeletePost from './DeletePost.js';
import PostList from './PostList.js';

export default function Posts() {
  const { user } = useUser();
  const { posts, error, loading } = usePosts();
  let match = useRouteMatch();

  console.log('rendering posts', Date.now());

  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <>
      <Container className="d-flex mb-3">
        <Link className="mx-auto" to={`${match.path}/new`}>
          <Button>Add post</Button>
        </Link>
      </Container>

      <PostList posts={posts} />

      <Switch>
        <Route path={`${match.path}/:id/delete`}>
          <DeletePost />
        </Route>
      </Switch>
    </>
  );
}
