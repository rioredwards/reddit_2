import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { deletePost, getPostDetail, updatePost } from '../services/posts.js';

export function usePost(id) {
  const [postDetail, setPostDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const handleGetPost = async () => {
      setLoading(true);
      try {
        const resp = await getPostDetail(id);
        setPostDetail(resp);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };
    handleGetPost();
  }, [id]);

  const handleDeletePost = async () => {
    try {
      await deletePost(id);
      history.push('/posts');
    } catch (e) {
      setError(e.message);
    }
  };

  const handleUpdatePost = async (newPost) => {
    try {
      await updatePost(id, newPost);
      history.push('/posts');
    } catch (e) {
      setError(e.message);
    }
  };

  return {
    postDetail,
    handleDeletePost,
    handleUpdatePost,
    setPostDetail,
    error,
    loading,
    setLoading,
    setError,
  };
}
