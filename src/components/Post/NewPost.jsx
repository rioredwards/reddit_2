import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import PostForm from './PostForm';
import { useUser } from '../../context/UserContext.js';
import { createPost } from '../../services/posts.js';
import '../../App.css';

export default function NewPost() {
  const [error, setError] = useState(null);
  const history = useHistory();
  const { user, parseUsername } = useUser();

  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }
  if (error) return <h1>{error}</h1>;

  const handleSubmit = async (newPost) => {
    try {
      await createPost(newPost);
      history.push('/posts');
    } catch (e) {
      setError(e.message);
    }
  };

  return <PostForm mode="New" username={parseUsername(user.email)} submitHandler={handleSubmit} />;
}
