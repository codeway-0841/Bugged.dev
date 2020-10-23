import Link from 'next/link';

export default function Loading({ slug, title, date, description }) {
	return (
		<article>
			<header className="mb-2">
				<h3 className="mb-2">
					<Link href={'/post/[slug]'} as={`/post/${slug}`}>
						<a className="text-3xl font-bold text-red-600 font-display">{title}</a>
					</Link>
				</h3>
				<span className="text-sm">{date}</span>
			</header>
			<section>
				<p className="mb-8 text-lg">{description}</p>
			</section>
		</article>
	);
}
