import { Db, fetcher } from 'vanilla-js-query';

const cache = new Db({ persistorType: 'localStorage', persist: true });

interface Response {
  id: number;
  title: string;
  body: string;
}

const getPosts = async () => {
  const request = await fetch('https://jsonplaceholder.typicode.com/posts');
  const response = await request.json();
  return response;
};

const getPostById = async (id: string | number) => {
  const request = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );
  const response = await request.json();
  return response;
};

const setPost = async () => {
  const request = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const response = await request.json();
  return response;
};

const getPostsBtn = document.getElementById('get-posts');
const getPostBtn = document.getElementById('get-post');
const setPostBtn = document.getElementById('set-post');

getPostsBtn?.addEventListener('click', async () => {
  await fetcher<Response[]>('get-posts', getPosts, cache);
});

getPostBtn?.addEventListener('click', async () => {
  await fetcher<Response[]>('get-post', () => getPostById(1), cache);
});

setPostBtn?.addEventListener('click', async () => {
  const { data, error, loading } = await fetcher<Response[]>(
    'set-post',
    setPost,
    cache,
    Date.now() + 1 * 60 * 60 * 1000,
  );
});
