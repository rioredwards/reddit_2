import { useEffect, useState } from 'react';
import { getPosts } from '../services/posts.js';

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleGetPosts = async () => {
      setLoading(true);
      try {
        const resp = await getPosts();
        setPosts(resp);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };
    handleGetPosts();
  }, []);

  return { posts, setPosts, error, loading };
}
