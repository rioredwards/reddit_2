import { useEffect, useState } from 'react';
import { getPosts } from '../services/posts.js';

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const data = await getPosts();
        setPosts(data);
        setLoading(false);
      };
      fetchPosts();
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { posts, error, loading };
}
