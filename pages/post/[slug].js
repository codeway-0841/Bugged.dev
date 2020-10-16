/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Layout from 'components/Layout';
import Image from 'components/Image';
import SEO from 'components/Seo';
import { getPostBySlug, getPostsSlugs } from 'utils/posts';
import Bio from 'components/Bio';
import dracula from 'react-syntax-highlighter/dist/cjs/styles/prism/dracula';
const ReactMarkdown = dynamic(() => import('react-markdown/with-html'), { loading: () => '🐞Please wait...' });
const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter/dist/cjs/prism-async-light'));
const CodeBlock = ({ language, value }) => {
	return (
		<SyntaxHighlighter language={language} style={dracula} customStyle={{ fontSize: '1rem' }}>
			{value}
		</SyntaxHighlighter>
	);
};

const MarkdownImage = ({ alt, src }) => {
	const isLink = src.startsWith('http');
	return (
		<Image
			post={true}
			alt={alt}
			src={isLink ? src : require(`../../content/assets/${src}`)}
			previewSrc={isLink ? src + '?lqip' : require(`../../content/assets/${src}?lqip`)}
			className="w-full"
		/>
	);
};

export default function Post({ post, frontmatter, nextPost, previousPost }) {
	return (
		<Layout>
			<SEO
				image={frontmatter.img || ''}
				type="article"
				title={frontmatter.title}
				description={frontmatter.description || post.excerpt}
			/>

			<article>
				<header className="mb-8">
					<h1 className="mb-2 text-6xl font-black leading-none font-display">{frontmatter.title}</h1>
					<p className="text-sm">{frontmatter.date}</p>
				</header>
				<ReactMarkdown
					className="mb-4 prose-sm prose sm:prose lg:prose-lg"
					escapeHtml={false}
					source={post.content}
					renderers={{ code: CodeBlock, image: MarkdownImage }}
				/>
				<hr className="mt-4" />
				<footer>
					<Bio className="mt-8 mb-16" />
				</footer>
			</article>
			<nav className="flex flex-wrap justify-between mb-10">
				{previousPost ? (
					<Link href={'/post/[slug]'} as={`/post/${previousPost.slug}`}>
						<a className="text-lg font-bold">← {previousPost.frontmatter.title}</a>
					</Link>
				) : (
					<div />
				)}
				{nextPost ? (
					<Link href={'/post/[slug]'} as={`/post/${nextPost.slug}`}>
						<a className="text-lg font-bold">{nextPost.frontmatter.title} →</a>
					</Link>
				) : (
					<div />
				)}
			</nav>
		</Layout>
	);
}

export async function getStaticPaths() {
	const paths = getPostsSlugs();

	return {
		paths,
		fallback: false
	};
}

export async function getStaticProps({ params: { slug } }) {
	const postData = getPostBySlug(slug);

	if (!postData.previousPost) {
		postData.previousPost = null;
	}

	if (!postData.nextPost) {
		postData.nextPost = null;
	}

	return { props: postData };
}
