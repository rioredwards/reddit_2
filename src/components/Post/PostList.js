import React from 'react';
import { usePosts } from '../../hooks/usePosts.js';
import Post from './Post.js';
import '../../App.css';
import { useUser } from '../../context/UserContext.js';
import { Redirect } from 'react-router';

export default function PostList() {
  const { user } = useUser();

  const { posts, error, loading } = usePosts();

  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} {...post}>
          {post.title}
        </Post>
      ))}
    </div>
  );
}
