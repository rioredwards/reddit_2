import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Switch, Route, Link, useRouteMatch, Redirect } from 'react-router-dom';
import { useUser } from '../../context/UserContext.js';
import { usePosts } from '../../hooks/usePosts.js';
import DeletePost from './DeletePost';
import EditPost from './EditPost.jsx';
import NewPost from './NewPost.jsx';
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

      <Switch>
        <Route path="/posts/new">
          <NewPost setPosts={setPosts} />
        </Route>
        <Route path="/posts/:id/edit">
          <EditPost setPosts={setPosts} />
        </Route>
        <Route path={`${match.path}/:id/delete`}>
          <DeletePost setPosts={setPosts} />
          <PostList posts={posts} />
        </Route>
        <Route exact path="/posts">
          <PostList posts={posts} />
        </Route>
      </Switch>
    </>
  );
}
