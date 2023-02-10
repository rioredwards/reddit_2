import { useEffect, useState } from 'react';
import { getPostDetail } from '../services/posts.js';

export function usePostDetail(id) {
  const [postDetail, setPostDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return {
    postDetail,
    setPostDetail,
    error,
    setError,
    loading,
    setLoading,
  };
}
