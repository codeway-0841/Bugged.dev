import Head from 'next/head';
import { getSiteMetaData } from 'utils/helpers';

export default function SEO({ title, description = '' }) {
	const siteMetadata = getSiteMetaData();

	const metaDescription = description || siteMetadata.description;

	return (
		<Head>
			<title>
				{title} | {siteMetadata.title}
			</title>
			<meta name='description' content={metaDescription} />
			<meta property='og:type' content='website' />
			<meta name='og:title' property='og:title' content={title} />
			<meta name='og:image' property='og:image' content='/profile.jpg' />
			<meta name='og:description' property='og:description' content={metaDescription} />
			<meta name='twitter:card' content='summary' />
			<meta name='twitter:title' content={title} />
			<meta name='twitter:description' content={metaDescription} />
			<meta name='keywords' content='ReactJS, React, Javascript, Typescript, JS, TS, Front-end, NodeJS, NextJS' />
			<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			<meta name='robots' content='index, follow' />

			<meta name='twitter:creator' content={siteMetadata.social.twitter} />
			<link rel='icon' type='image/png' href='/favicon.ico' />
			<link rel='apple-touch-icon' href='/favicon.ico' />
		</Head>
	);
}
