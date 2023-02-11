import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { useUser } from '../../context/UserContext.js';
import { usePosts } from '../../hooks/usePosts.js';
import DeletePost from './DeletePost';
import EditPost from './EditPost.jsx';
import NewPost from './NewPost.jsx';
import PostDetail from './PostDetail.jsx';
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
      <Switch>
        <Route path={`${match.path}/new`}>
          <NewPost setPosts={setPosts} />
        </Route>
        <Route path={`${match.path}/:id/edit`}>
          <EditPost setPosts={setPosts} />
        </Route>
        <Route path={`${match.path}/:id/delete`}>
          <DeletePost setPosts={setPosts} />
          <PostList posts={posts} />
        </Route>
        <Route path={`${match.path}/:id`}>
          <PostDetail />
        </Route>
        <Route exact path={`${match.path}`}>
          <PostList posts={posts} />
        </Route>
      </Switch>
    </>
  );
}
