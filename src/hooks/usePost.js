import { useEffect, useState } from 'react';
import { getPostDetail } from '../services/posts.js';

export function usePost(id) {
  const [postDetail, setPostDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const resp = await getPostDetail(id);
        setPostDetail(resp);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  return { postDetail, error, loading };
}
