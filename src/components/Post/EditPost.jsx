import React from 'react';
import { Redirect, useHistory, useParams } from 'react-router';
import { usePost } from '../../hooks/usePost.js';
import PostForm from './PostForm';
import { useUser } from '../../context/UserContext';
import { updatePost } from '../../services/posts.js';
import '../../App.css';

export default function EditPost() {
  const { user } = useUser();
  const { id } = useParams();
  const { handleUpdatePost, postDetail, error, loading } = usePost(id);

  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return <PostForm mode="Edit" submitHandler={handleUpdatePost} id={id} {...postDetail} />;
}
