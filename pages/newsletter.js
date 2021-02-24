/* eslint-disable jsx-a11y/anchor-is-valid */
import Layout from 'components/Layout';
import Bio from 'components/Bio';
import SEO from 'components/Seo';
import Subscribe from 'components/Subscribe';

export default function Newsletter() {
	return (
		<Layout>
			<SEO title="Newsletter" />

			<article>
				<header className="mb-8">
					<h1 className="mb-2 text-6xl font-black leading-none font-display">Newsletter</h1>
				</header>
				<p className="mb-4">
					In this newsletter, I share some tips about web development, articles, news, some great resources
					and new things I learn every day. So make sure you're subscribed to it.{' '}
				</p>
				<Subscribe />
				<hr className="mt-4" />
				<footer>
					<Bio className="mt-8 mb-16" />
				</footer>
			</article>
		</Layout>
	);
}
