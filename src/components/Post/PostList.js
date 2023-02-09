import React from 'react';
import { usePosts } from '../../hooks/usePosts.js';
import Post from './Post.js';
import '../../App.css';
import { useUser } from '../../context/UserContext.js';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PostList({ posts, loading, error }) {
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
