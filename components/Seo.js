import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSiteMetaData } from 'utils/helpers';
// good size for images is 1200x630
export default function SEO({ title, description = '', type = '' }) {
	const { asPath } = useRouter();
	const siteMetadata = getSiteMetaData();

	const metaDescription = description || siteMetadata.description;
	const api = 'https://i.microlink.io/';
	const cardUrl = `https://cards.microlink.io/?preset=twitter&data=image&title=${title}&p=2gh-PD4KICA8RmxleAogICAgc3R5bGU9e3sgem9vbTogcXVlcnkuem9vbSB9fQogICAgc3g9e3sKICAgICAgcDogNSwKICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsCiAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywKICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsCiAgICAgIGJnOiBxdWVyeS50aGVtZXNbcXVlcnkudGhlbWVdLmJnLAogICAgfX0KICA-CiAgICA8TGluawogICAgICBocmVmPSdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI_ZmFtaWx5PVJvYm90bzp3Z2h0QDQwMDs3MDAmZGlzcGxheT1ibG9jaycKICAgICAgcmVsPSdzdHlsZXNoZWV0JwogICAgLz4KICAgICAgICAgIDxGbGV4CiAgICAgICAgICAgIHN4PXt7CiAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsCiAgICAgICAgICAgICAgZm9udEZhbWlseTogJ1JvYm90bycsCiAgICAgICAgICAgIH19CiAgICAgICAgICA-CiAgICAgICAgICAgIDxGbGV4IGFzPSdoZWFkZXInIHN4PXt7IHdpZHRoOiAnMTAwJScgfX0-CiAgICAgICAgICAgICAgPEF2YXRhcgogICAgICAgICAgICAgICAgc3g9e3sgd2lkdGg6ICc1MHB4JyB9fQogICAgICAgICAgICAgICAgc3JjPXtxdWVyeS5pbWd9CiAgICAgICAgICAgICAgLz4KCiAgICAgICAgICAgICAgPEJveCBzeD17eyBsaW5lSGVpZ2h0OiAnMS4yNScsIHBsOiAyIH19PgogICAgICAgICAgICAgICAgPFRleHQKICAgICAgICAgICAgICAgICAgc3g9e3sKICAgICAgICAgICAgICAgICAgICBjb2xvcjoKICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5LnRoZW1lc1txdWVyeS50aGVtZV0ucHJpbWFyeSwKICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMiwKICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsCiAgICAgICAgICAgICAgICAgIH19CiAgICAgICAgICAgICAgICA-CiAgICAgICAgICAgICAgICAgIE0uIEJhZ2hlciBBYmlhdAogICAgICAgICAgICAgICAgPC9UZXh0PgogICAgICAgICAgICAgICAgPFRleHQKICAgICAgICAgICAgICAgICAgc3g9e3sKICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMiwKICAgICAgICAgICAgICAgICAgICBjb2xvcjoKICAgICAgICAgICAgICAgICAgICAgICcjYzAzOTJiJywKICAgICAgICAgICAgICAgICAgfX0KICAgICAgICAgICAgICAgID4KICAgICAgICAgICAgICAgICAgQEFzbGVtYW1tYWRhbQogICAgICAgICAgICAgICAgPC9UZXh0PgogICAgICAgICAgICAgIDwvQm94PgogICAgICAgICAgICA8L0ZsZXg-CgogICAgICAgICAgICA8RmxleAogICAgICAgICAgICAgIGFzPSdzZWN0aW9uJwogICAgICAgICAgICAgIHN4PXt7IHB0OiAzLCB3aWR0aDogJzEwMCUnIH19CiAgICAgICAgICAgID4KICAgICAgICAgICAgICA8VGV4dAogICAgICAgICAgICAgICAgc3g9e3sKICAgICAgICAgICAgICAgICAgY29sb3I6IHF1ZXJ5LnRoZW1lc1txdWVyeS50aGVtZV0ucHJpbWFyeSwKICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogNDAwLAogICAgICAgICAgICAgICAgICBmb250U2l6ZTogNCwKICAgICAgICAgICAgICAgIH19CiAgICAgICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHF1ZXJ5LnRpdGxlIH19CiAgICAgICAgICAgICAgLz4KICAgICAgICAgICAgPC9GbGV4PgoKICAgICAgICAgICAgPEZsZXgKICAgICAgICAgICAgICBhcz0nZm9vdGVyJwogICAgICAgICAgICAgIHN4PXt7CiAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywKICAgICAgICAgICAgICAgIHB0OiAzLAogICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJywKICAgICAgICAgICAgICB9fQogICAgICAgICAgICA-CiAgICAgICAgICAgICAgPFRleHQKICAgICAgICAgICAgICAgIHN4PXt7CiAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDQwMCwKICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDIsCiAgICAgICAgICAgICAgICAgIGNvbG9yOgogICAgICAgICAgICAgICAgICAgICcjYzAzOTJiJywKICAgICAgICAgICAgICAgIH19CiAgICAgICAgICAgICAgPgogICAgICAgICAgICAgICAgSGVyZSBpbiBCdWdnZWQuZGV28J-QngogICAgICAgICAgICAgICAgPC9UZXh0PgogICAgICAgICAgICA8L0ZsZXg-CiAgICAgICAgICA8L0ZsZXg-CiAgICAgICAgCiAgPC9GbGV4Pgo8Lz4&img=https%3A%2F%2Fbugged.dev%2F_next%2Fstatic%2Fimages%2Fprofile-8415e25daf3503c4287cb52dc4c0690b.jpg`;
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
