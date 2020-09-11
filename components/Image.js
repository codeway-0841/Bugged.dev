import { Fragment } from 'react';
import 'lazysizes';

export default function Image({ alt, src, previewSrc, className, post }) {
	return (
		<span className='block text-center text-red text-1xl'>
			<img className={`lazyload blur-up ${className}`} alt={alt} src={previewSrc} data-srcset={src} />
			<span className='mt-2'>{post ? alt : ''}</span>
		</span>
	);
}
