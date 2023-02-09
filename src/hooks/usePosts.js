import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createPost, getPosts } from '../services/posts.js';

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const handleGetPosts = async () => {
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
    };
    handleGetPosts();
  }, []);

  const handleCreatePost = async (newPost) => {
    try {
      await createPost(newPost);
      history.push('/posts');
    } catch (e) {
      setError(e.message);
    }
  };

  return { handleCreatePost, posts, error, loading };
}
