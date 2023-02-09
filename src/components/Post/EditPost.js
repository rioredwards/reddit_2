import React from 'react';
import { Redirect, useHistory, useParams } from 'react-router';
import { usePost } from '../../hooks/usePost.js';
import PostForm from './PostForm.js';
import { useUser } from '../../context/UserContext.js';
import { updatePost } from '../../services/posts.js';
import '../../App.css';

export default function EditPost() {
  const history = useHistory();
  const { user } = useUser();
  const { id } = useParams();
  const { postDetail, setLoading, error, setError, loading } = usePost(id);

  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  const handleSubmit = async (newPost) => {
    setLoading(true);
    try {
      await updatePost(id, newPost);
      history.push('/posts');
    } catch (e) {
      setError(e.message);
    }
  };

  return <PostForm mode="Edit" submitHandler={handleSubmit} {...postDetail} />;
}
