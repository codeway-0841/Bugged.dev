/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';

import Layout from 'components/Layout';
import Bio from 'components/Bio';
import SEO from 'components/Seo';
import Article from 'components/Article';
import { getSortedPosts } from 'utils/posts';

export default function Home({ posts }) {
	return (
		<Layout>
			<SEO title="All posts" />
			<Bio className="my-14" />
			{posts.map(({ frontmatter: { title, description, date }, slug }) => (
				<Article title={title} description={description} date={date} slug={slug} key={slug} />
			))}
		</Layout>
	);
}

export async function getStaticProps() {
	const posts = getSortedPosts();

	return {
		props: {
			posts
		}
	};
}
