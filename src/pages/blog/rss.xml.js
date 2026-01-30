import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');
  
  // Filter only published posts
  const published = blog.filter(post => post.data.published !== false);
  
  // Sort by date descending
  const sorted = published.sort((a, b) => 
    new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return rss({
    title: "Kristee Joy Dutaro's Blog",
    description: "Articles about web development, full-stack development, and modern technologies",
    site: context.site,
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
    customData: '<language>en-us</language>',
  });
}
