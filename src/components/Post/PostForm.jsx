import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../../App.css';

export default function PostForm({ mode, title = '', body = '', username, submitHandler }) {
  const [titleInput, setTitleInput] = useState(title);
  const [bodyInput, setBodyInput] = useState(body);

  return (
    <Form
      className="form-container p-3"
      onSubmit={(e) => {
        e.preventDefault();
        submitHandler({ title: titleInput, body: bodyInput, username });
      }}
    >
      <h2 className="text-center">{mode} Post</h2>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="title">Title</Form.Label>
        <Form.Control
          id="title"
          required
          placeholder="Enter title"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="body">Body</Form.Label>
        <Form.Control
          id="body"
          required
          as="textarea"
          rows={3}
          placeholder="Enter body"
          value={bodyInput}
          onChange={(e) => setBodyInput(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
