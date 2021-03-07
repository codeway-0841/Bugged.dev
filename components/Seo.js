import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSiteMetaData } from 'utils/helpers';
// good size for images is 1200x630
export default function SEO({ title, description = '', type = '' }) {
	const { asPath } = useRouter();
	const siteMetadata = getSiteMetaData();

	const metaDescription = description || siteMetadata.description;
	const api = 'https://i.microlink.io/';
	const cardUrl = `https://cards.microlink.io/?preset=jxnblk&title=${title}&color=white&bg=rgb(192,57,43)&logo=https://bugged.dev/_next/static/images/profile-8415e25daf3503c4287cb52dc4c0690b.jpg&subtitle=Bugged.dev🐞`;
	const image = `${api}${encodeURIComponent(cardUrl)}`;

	return (
		<Head>
			<title>
				{title} | {siteMetadata.title}
			</title>
			<meta name="description" content={metaDescription} />
			<meta name="og:title" property="og:title" content={title} />
			<meta name="og:url" property="og:url" content={'https://bugged.dev' + asPath} />
			<meta name="og:image" property="og:image" content={image} />
			<meta name="og:description" property="og:description" content={metaDescription} />
			<meta property="og:locale" content="en_US" />

			<meta name="og:type" property="og:type" content={type || 'website'} />
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={metaDescription} />
			{/* <meta
				name="twitter:image"
				content={
					image ? isLink ? image : require(`../content/assets/${image}`) : 'https://bugged.dev/profile.jpg'
				}
			/> */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="image" content={image} />
			<meta itemProp="image" content={image} />
			<meta name="twitter:image" content={image} />
			<meta property="og:image" content={image} />
			<meta name="keywords" content="ReactJS, React, Javascript, Typescript, JS, TS, Front-end, NodeJS, NextJS" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta name="robots" content="index, follow" />
			<meta name="language" content="EN" />

			<meta name="twitter:creator" content={siteMetadata.social.twitter} />
			<link rel="icon" type="image/png" href="/favicon.ico" />
			<link rel="apple-touch-icon" href="/favicon.ico" />
		</Head>
	);
}
