import { fireEvent, render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './context/UserContext';
import { mockPosts, mockUsers, mockNewPost } from './mockData.js';

import * as authFns from './services/auth';
import * as postFns from './services/posts';

jest.mock('./services/auth');
jest.mock('./services/posts');

describe('Auth component', () => {
  test('signs users in', async () => {
    authFns.getUser.mockReturnValue(null);
    authFns.authUser.mockReturnValue(mockUsers[0]);

    render(
      <UserProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </UserProvider>
    );

    const emailInput = screen.getByLabelText('Email address');
    fireEvent.change(emailInput, { target: { value: mockUsers[0].email } });
    expect(emailInput.value).toBe(mockUsers[0].email);

    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: mockUsers[0].password } });
    expect(passwordInput.value).toBe(mockUsers[0].password);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const usernameText = await screen.findByText(mockUsers[0].username);
    expect(usernameText).toBeInTheDocument();
  });
});

describe('Post components display', () => {
  it('list posts at /posts, to signed in users', async () => {
    authFns.getUser.mockReturnValue(mockUsers[0]);
    postFns.getPosts.mockReturnValue(mockPosts);

    render(
      <UserProvider>
        <MemoryRouter initialEntries={['/posts']}>
          <App />
        </MemoryRouter>
      </UserProvider>
    );

    await screen.findByText(/title0/i);
    await screen.findByTitle(/deleteIcon/i);
    await screen.findByText(/title1/i);
  });

  test('post detail page at /posts/:id, to signed in users', async () => {
    authFns.getUser.mockReturnValue(mockUsers[0]); // user is signed in
    postFns.getPosts.mockReturnValue(mockPosts);
    postFns.getPostDetail.mockReturnValue(mockPosts[0]); // post is returned

    // Go to /posts
    render(
      <UserProvider>
        <MemoryRouter initialEntries={['/posts']}>
          <App />
        </MemoryRouter>
      </UserProvider>
    );

    // Click on the first post title
    const postTitleLink = await screen.findByTestId('postLink0');
    expect(postTitleLink).toBeInTheDocument();
    fireEvent.click(postTitleLink);

    // Show post detail page with comments
    await screen.findByText(/comments/i);
  });
});

describe('signed in users can', () => {
  test('create a post', async () => {
    authFns.getUser.mockReturnValue(mockUsers[0]); // user is signed in
    postFns.getPosts.mockReturnValue(mockPosts);
    postFns.createPost.mockReturnValue(mockNewPost); // post is returned

    // Go to /posts
    render(
      <UserProvider>
        <MemoryRouter initialEntries={['/posts']}>
          <App />
        </MemoryRouter>
      </UserProvider>
    );

    // Click on the add post button
    const addPostButton = await screen.findByText(/Add Post/i);
    expect(addPostButton).toBeInTheDocument();
    fireEvent.click(addPostButton);

    // Show newPost form
    const formTitle = await screen.findByText(/New Post/i);
    expect(formTitle).toBeInTheDocument();

    // Fill out the form
    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: mockNewPost.title } });
    expect(titleInput.value).toBe(mockNewPost.title);

    const bodyInput = screen.getByLabelText(/body/i);
    fireEvent.change(bodyInput, { target: { value: mockNewPost.body } });
    expect(bodyInput.value).toBe(mockNewPost.body);

    const button = screen.getByText(/submit/i);
    act(() => {
      fireEvent.click(button);
    });

    // Show new post on /posts
    await screen.findByText(mockNewPost.title);
  });
});
