import React from 'react';
import Post from './Post';
import '../../App.css';
import { Alert, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PostList({ posts }) {
  return (
    <>
      <Container className="d-flex mb-3">
        <Link className="mx-auto" to={`posts/new`}>
          <Button>Add post</Button>
        </Link>
      </Container>
      {!posts.length && (
        <Alert variant="warning">
          👋 Looks like your list is empty!
          <br /> Use the form above to add a new Post!
        </Alert>
      )}
      {!!posts.length &&
        posts.map((post) => {
          return <Post key={post.id} view="list" postData={post} />;
        })}
    </>
  );
}
