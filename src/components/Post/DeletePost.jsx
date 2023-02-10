import React, { useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router';
import { useUser } from '../../context/UserContext.js';
import { Button, Modal } from 'react-bootstrap';
import '../../App.css';
import { deletePost } from '../../services/posts.js';

export default function DeletePost() {
  const history = useHistory();
  const { user } = useUser();
  const { id } = useParams();
  const [error, setError] = useState(null);

  const handleClose = () => {
    history.push('/posts');
  };

  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }
  if (error) return <h1>{error}</h1>;

  const handleDeletePost = async () => {
    try {
      await deletePost(id);
      history.push('/posts');
    } catch (e) {
      setError(e.message);
    }
  };

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
        <Button variant="primary" type="submit" onClick={() => handleDeletePost()}>
          Delete post
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
