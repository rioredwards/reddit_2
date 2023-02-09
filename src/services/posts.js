import { checkError, client } from './client.js';

export async function getPosts() {
  const resp = await client.from('posts').select('*').order('id', { ascending: false });
  return checkError(resp);
}

export async function getPostDetail(id) {
  const resp = await client.from('posts').select('*').match({ id }).single();
  return checkError(resp);
}

export async function createPost({ title, body, username }) {
  const resp = await client.from('posts').insert({ title, body, username }).single();
  return checkError(resp);
}

export async function updatePost(id, { title, body }) {
  const resp = await client.from('posts').update({ title, body }).match({ id }).single();
  return checkError(resp);
}

export async function deletePost(id) {
  const resp = await client.from('posts').delete().match({ id }).single();
  return checkError(resp);
}
