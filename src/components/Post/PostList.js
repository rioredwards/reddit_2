import React from 'react';
import Post from './Post.js';
import '../../App.css';

export default function PostList({ posts }) {
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
