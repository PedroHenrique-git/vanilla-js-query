# vanilla js query

a library to fetch data and cache the return

## usage

all you need to do is create a new instance of the Db class (the class that represents our cache), after that, fetch some data using the fetcher function

```typescript
    // options available in constructor

    {
        persist?: boolean; // if the data should be save in some database
        cacheTime?: number; // represents the time that the data should be cached
        persistorType?: persistType; // localStorage or IndexedDB or customDB
        CustomDB?: CustomDB; // an external db that implements the Store interface
    }

    const cache = new Db();

    const getPosts = async () => {
      const request = await fetch('https://jsonplaceholder.typicode.com/posts');
      const response = await request.json();
      return response;
    };

    const getPostsBtn = document.getElementById('get-posts');

    getPostsBtn?.addEventListener('click', async () => {
      // fetcher parameters

      key: string // a unique value that represents some data
      fetcher: () => Promise<T> // a function that returns some promise
      cache: Db // an instance of the Db class
      expireTime?: number // the cache time for this data ex: Date.now() + 1 * 60 * 60 * 1000

      await fetcher<Response[]>('get-posts', getPosts, cache);
    });
```
