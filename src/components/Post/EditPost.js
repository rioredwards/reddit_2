import React from 'react';
import { useParams } from 'react-router';
import { usePost } from '../../hooks/usePost.js';

export default function EditPost() {
  const { id } = useParams();
  const { postDetail, error, loading } = usePost(id);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return <div>EditPost</div>;
}
