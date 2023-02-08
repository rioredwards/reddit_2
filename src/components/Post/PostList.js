import React from 'react';
import { usePosts } from '../../hooks/usePosts.js';
import Post from './Post.js';

export default function PostList() {
  const { posts, error, loading } = usePosts();

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
