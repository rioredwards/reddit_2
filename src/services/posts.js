import { checkError, client } from './client.js';

export async function getPosts() {
  const resp = await client.from('posts').select('*').order('id', { ascending: false });

  return checkError(resp);
}
