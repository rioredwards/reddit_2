import React from 'react';
import Post from './Post';
import '../../App.css';
import { Alert } from 'react-bootstrap';

export default function PostList({ posts }) {
  return (
    <div>
      {!posts.length && (
        <Alert variant="warning">
          👋 Looks like your list is empty!
          <br /> Use the form above to add a new ToDo!
        </Alert>
      )}
      {!!posts.length && posts.map((post) => <Post key={post.id} {...post}></Post>)}
    </div>
  );
}
