import Image from './Image';
import { getSiteMetaData } from 'utils/helpers';
import Profile from 'content/assets/profile.jpg';
import PreviewProfile from 'content/assets/profile.jpg?lqip';
import Link from 'next/link';
export default function Bio({ className }) {
	const { author, social } = getSiteMetaData();
	return (
		<div
			className={`flex items-center  ${className}   
        `}
		>
			<Image
				className="flex-shrink-0 mb-0 mr-1 md:mr-3 rounded-full w-0 md:w-16 md:h-16"
				src={Profile}
				previewSrc={PreviewProfile}
				alt="Profile"
			/>
			<p className="md:ml-3 text-base leading-7">
				Written by <b className="font-semibold">{author.name}</b>, {author.summary}
				<br />
				Follow him on <a href={`https://twitter.com/${social.twitter}`}>Twitter</a>,{' '}
				<a href={`https://github.com/${social.github}`}>Github</a> and{' '}
				<a href="https://dev.to/aslemammad">Dev.to</a>. Check out his{' '}
				<Link href={'/newsletter'}>
					<a>newsletter</a>
				</Link>.
			</p>
		</div>
	);
}
