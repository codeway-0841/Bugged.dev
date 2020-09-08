import Link from 'next/link';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown/with-html';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { getPostBySlug, getPostsSlugs } from 'utils/posts';
import SEO from 'components/Seo';
const Layout = dynamic(() => import('components/Layout'), { loading: '🐞' });
const Image = dynamic(() => import('components/Image'), { loading: '🐞' });
const Bio = dynamic((() => import('components/Bio'): { loading: '🐞' }));

const CodeBlock = ({ language, value }) => {
	return (
		<SyntaxHighlighter language={language} style={atomDark}>
			{value}
		</SyntaxHighlighter>
	);
};

const MarkdownImage = ({ alt, src }) => (
	<Image
		alt={alt}
		src={import(`../../content/assets/${src}`)}
		previewSrc={import(`../../content/assets/${src}?lqip`)}
		className='w-full'
	/>
);

export default function Post({ post, frontmatter, nextPost, previousPost }) {
	return (
		<Layout>
			<SEO type='article' title={frontmatter.title} description={frontmatter.description || post.excerpt} />

			<article>
				<header className='mb-8'>
					<h1 className='mb-2 text-6xl font-black leading-none font-display'>{frontmatter.title}</h1>
					<p className='text-sm'>{frontmatter.date}</p>
				</header>
				<ReactMarkdown
					className='mb-4 prose-sm prose sm:prose lg:prose-lg'
					escapeHtml={false}
					source={post.content}
					renderers={{ code: CodeBlock, image: MarkdownImage }}
				/>
				<hr className='mt-4' />
				<footer>
					<Bio className='mt-8 mb-16' />
				</footer>
			</article>
			<nav className='flex flex-wrap justify-between mb-10'>
				{previousPost ? (
					<Link href={'/post/[slug]'} as={`/post/${previousPost.slug}`}>
						<a className='text-lg font-bold'>← {previousPost.frontmatter.title}</a>
					</Link>
				) : (
					<div />
				)}
				{nextPost ? (
					<Link href={'/post/[slug]'} as={`/post/${nextPost.slug}`}>
						<a className='text-lg font-bold'>{nextPost.frontmatter.title} →</a>
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
		fallback : false
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
