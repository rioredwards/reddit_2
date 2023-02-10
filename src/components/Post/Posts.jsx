import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Switch, Route, Link, useRouteMatch, Redirect } from 'react-router-dom';
import { useUser } from '../../context/UserContext.js';
import { usePosts } from '../../hooks/usePosts.js';
import DeletePost from './DeletePost';
import PostList from './PostList';

export default function Posts() {
  const { user } = useUser();
  const { posts, setPosts, error, loading } = usePosts();
  let match = useRouteMatch();

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
          <DeletePost setPosts={setPosts} />
        </Route>
      </Switch>
    </>
  );
}
