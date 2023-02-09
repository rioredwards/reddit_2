import React, { useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router';
import { useUser } from '../../context/UserContext.js';
import { deletePost } from '../../services/posts.js';
import { Button, Modal } from 'react-bootstrap';
import '../../App.css';
import { usePosts } from '../../hooks/usePosts.js';
import { usePost } from '../../hooks/usePost.js';

export default function DeletePost() {
  const history = useHistory();
  const { user } = useUser();
  const { id } = useParams();
  console.log('id', id);
  const { handleDeletePost, error } = usePost(id);

  const handleClose = () => {
    history.push('/posts');
  };

  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }
  if (error) return <h1>{error}</h1>;

  return (
    <Modal centered show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete post?</Modal.Title>
      </Modal.Header>
      <Modal.Body>{`Are you sure you want to delete your post? You can't undo this.`}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" onClick={() => handleDeletePost(id)}>
          Delete post
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
