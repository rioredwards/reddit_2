import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import PostForm from './PostForm';
import { useUser } from '../../context/UserContext.js';
import '../../App.css';
import { createPost } from '../../services/posts.js';

export default function NewPost() {
  const [error, setError] = useState(null);
  const { user, parseUsername } = useUser();
  const history = useHistory();

  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }
  if (error) return <h1>{error}</h1>;

  const handleCreatePost = async (newPost) => {
    try {
      const resp = await createPost(newPost);
      console.log('resp', resp);
      history.push('/posts');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <PostForm mode="New" username={parseUsername(user.email)} submitHandler={handleCreatePost} />
  );
}
