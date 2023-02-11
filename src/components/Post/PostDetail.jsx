import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext.js';
import { usePostDetail } from '../../hooks/usePostDetail.js';
import Post from './Post.jsx';

export default function PostDetail() {
  const { user } = useUser();
  const { id } = useParams();
  const { postDetail, error, loading } = usePostDetail(id);

  console.log('id (in useParams)', id);
  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  console.log('postDetail', postDetail);

  return (
    <>
      <Post view="detail" postData={postDetail}></Post>
      <span>comments</span>
    </>
  );
}
