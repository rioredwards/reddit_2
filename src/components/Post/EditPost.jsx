import React from 'react';
import { Redirect, useHistory, useParams } from 'react-router';
import { usePostDetail } from '../../hooks/usePostDetail.js';
import PostForm from './PostForm';
import { useUser } from '../../context/UserContext';
import '../../App.css';
import { updatePost } from '../../services/posts.js';

export default function EditPost() {
  const { user } = useUser();
  const { id } = useParams();
  const { postDetail, error, setError, loading } = usePostDetail(id);
  const history = useHistory();

  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  const handleUpdatePost = async (newPost) => {
    try {
      await updatePost(id, newPost);
      history.push('/posts');
    } catch (e) {
      setError(e.message);
    }
  };

  return <PostForm mode="Edit" submitHandler={handleUpdatePost} id={id} {...postDetail} />;
}
