import { client } from './client.js';

export function getUser() {
  return client.auth.currentUser;
}

export async function authUser(email, password, type) {
  let resp;
  if (type === 'sign-up') {
    resp = await client.auth.signUp({ email, password });
  } else {
    resp = await client.auth.signIn({ email, password });
  }

  if (resp.error) {
    throw resp.error;
  }
  return resp.user;
}

export async function signOut() {
  await client.auth.signOut();
}
