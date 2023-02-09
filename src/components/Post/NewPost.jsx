import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import PostForm from './PostForm';
import { useUser } from '../../context/UserContext.js';
import { createPost } from '../../services/posts.js';
import '../../App.css';
import { usePosts } from '../../hooks/usePosts.js';

export default function NewPost() {
  const { user, parseUsername } = useUser();
  const { handleCreatePost, error } = usePosts();

  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }
  if (error) return <h1>{error}</h1>;

  return (
    <PostForm mode="New" username={parseUsername(user.email)} submitHandler={handleCreatePost} />
  );
}
