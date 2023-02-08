import { checkError, client } from './client.js';

export async function getPosts() {
  const resp = await client.from('posts').select('*').order('id', { ascending: false });
  return checkError(resp);
}

export async function getPostDetail(id) {
  const resp = await client.from('posts').select('*').match({ id }).single();
  return checkError(resp);
}

export async function updatePost(id, { title, description }) {
  const resp = await client.from('posts').update({ title, description }).match({ id }).single();
  return checkError(resp);
}
