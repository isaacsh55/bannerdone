import { CONFIG } from 'src/global-config';
// import { getPosts } from 'src/actions/blog-ssr';

// import { PostListHomeView } from 'src/sections/blog/view';

// // ----------------------------------------------------------------------

export const metadata = { title: `Post list - ${CONFIG.appName}` };

export default async function Page() {
  // const { posts } = await getPosts();
  return <h1>Post Page</h1>;
}


