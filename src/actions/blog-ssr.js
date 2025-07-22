import axios, { endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

export async function getPosts() {
  // const res = await axios.get(endpoints.post.list);

  // return res.data;
   const res = await axios.get(endpoints.post.list);
  const safeData = JSON.parse(JSON.stringify(res.data));
  return { posts: safeData }; // wrap in an object, match usage

  // return {
  //   posts: [
  //     { id: '1', title: 'Static Post', body: 'This is static content' },
  //   ],
  // };
  
}

// ----------------------------------------------------------------------

export async function getPost(title) {
  const URL = title ? `${endpoints.post.details}?title=${title}` : '';

  const res = await axios.get(URL);

  return res.data;
}

// ----------------------------------------------------------------------

export async function getLatestPosts(title) {
  const URL = title ? `${endpoints.post.latest}?title=${title}` : '';

  const res = await axios.get(URL);

  return res.data;
}
