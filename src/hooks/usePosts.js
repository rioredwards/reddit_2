import { useEffect, useState } from 'react';
import { getPosts } from '../services/posts.js';

export function usePosts() {
  const [posts, setPosts] = useState;

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts();
      setPosts(data);
    };
    fetchPosts();
  }, []);
}
