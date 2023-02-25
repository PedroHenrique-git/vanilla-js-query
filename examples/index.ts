import { Db, fetcher } from 'vanilla-js-query';

const cache = new Db({ persistorType: 'localStorage' });

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

const button = document.getElementById('request');

button?.addEventListener('click', async () => {
  await fetcher<Response[]>('posts', getPosts, cache);
});
