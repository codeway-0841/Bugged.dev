import clsx from 'clsx';

import Image from './Image';
import { getSiteMetaData } from 'utils/helpers';
import Profile from '../content/assets/profile.jpg';
import PreviewProfile from '../content/assets/profile.jpg?lqip';
export default function Bio({ className }) {
	const { author, social } = getSiteMetaData();
	return (
		<div className={`flex items-center ${className}`}>
			<Image
				className='flex-shrink-0 mb-0 mr-3 rounded-full w-16 h-16'
				src={Profile}
				previewSrc={PreviewProfile}
				alt='Profile'
			/>
			<p className='text-base leading-7'>
				Written by <b className='font-semibold'>{author.name}</b> {author.summary}
				<br />Follow him on
				<a href={`https://twitter.com/${social.twitter}`}> Twitter</a> and
				<a href={`https://github.com/${social.github}`}> Github</a>.
			</p>
		</div>
	);
}
