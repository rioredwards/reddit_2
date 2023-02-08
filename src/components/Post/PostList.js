import React from 'react';
import { usePosts } from '../../hooks/usePosts.js';

export default function PostList() {
  const { posts, error, loading } = usePosts();

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div>
      {posts.map((post) => (
        <h1 key={post.id}>{post.title}</h1>
      ))}
    </div>
  );
}
