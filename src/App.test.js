import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './context/UserContext';

import * as authFns from './services/auth';
import * as postFns from './services/posts';

jest.mock('./services/auth');
jest.mock('./services/posts');

const mockUser = {
  id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'random@example.com',
};

test('user can sign in', async () => {
  authFns.getUser.mockReturnValue(null);
  authFns.authUser.mockReturnValue(mockUser);

  render(
    <UserProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </UserProvider>
  );
  const emailInput = screen.getByLabelText('Email address');
  fireEvent.change(emailInput, { target: { value: 'random@example.com' } });
  expect(emailInput.value).toBe('random@example.com');

  const passwordInput = screen.getByLabelText('Password');
  fireEvent.change(passwordInput, { target: { value: '123456' } });

  const button = screen.getByRole('button');
  fireEvent.click(button);

  const usernameText = await screen.findByText('random');
  expect(usernameText).toBeInTheDocument();
});

const fakePosts = [
  {
    id: 1,
    title: 'Fake Post #1',
    body: '#1 body',
    user_id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2',
    username: 'random',
  },
  {
    id: 2,
    title: 'Fake Post #2',
    body: '#2 body',
    user_id: '42',
    username: 'otherUser',
  },
];

it('signed in users should see a list of posts at /posts', async () => {
  authFns.getUser.mockReturnValue(mockUser);
  postFns.getPosts.mockReturnValue(fakePosts);
  render(
    <UserProvider>
      <MemoryRouter initialEntries={['/posts']}>
        <App />
      </MemoryRouter>
    </UserProvider>
  );
  await screen.findByText(/Fake Post #1/i);
  await screen.findByTitle(/deleteIcon/i);
  await screen.findByText(/Fake Post #2/i);
});
