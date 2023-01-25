import cache from './init';
import { query } from './utils/query';

interface Response {
  id: number;
  title: string;
  body: string;
}

const fetcher = async () => {
  const request = await fetch('https://jsonplaceholder.typicode.com/posts');
  const response = await request.json();
  return response;
};

const button = document.getElementById('request');

button?.addEventListener('click', async () => {
  await query<Response[]>('posts', fetcher, cache);
});
