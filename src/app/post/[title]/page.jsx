import { kebabCase } from 'es-toolkit';

import { CONFIG } from 'src/global-config';
// import axios, { endpoints } from 'src/lib/axios';
// import { getPost, getLatestPosts } from 'src/actions/blog-ssr';

// import { PostDetailsHomeView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Post details - ${CONFIG.appName}` };

export default async function Page({ params }) {
  // const { title } = params;

  // const { post } = await getPost(title);

  // const { latestPosts } = await getLatestPosts(title);

  // return <PostDetailsHomeView post={post} latestPosts={latestPosts} />;
  return <h1>Post Details Page</h1>; // Placeholder for the post details view
}

// ----------------------------------------------------------------------

/**
 * [1] Default
 * Remove [1] and [2] if not using [2]
 * Will remove in Next.js v15
 */
// const dynamic = CONFIG.isStaticExport ? 'auto' : 'force-dynamic';
// export { dynamic };

/**
 * [2] Static exports
 * https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 */
// export async function generateStaticParams() {
//   if (CONFIG.isStaticExport) {
//     const res = await axios.get(endpoints.post.list);
//     return res.data.posts.map((post) => ({ title: kebabCase(post.title) }));
//   }
//   return [];
// }
