import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children, primary }) {
	const { pathname } = useRouter();
	const isRoot = pathname === '/';

	const header =
		primary || isRoot ? (
			<h1 className='mb-8'>
				<Link href='/'>
					<a className='font-black leading-none text-black no-underline text-6xl font-display'>
						Bugged.dev🐞
					</a>
				</Link>
			</h1>
		) : (
			<h1 className='mb-2'>
				<Link href='/'>
					<a className='text-2xl font-black text-black no-underline font-display'>Bugged.dev🐞</a>
				</Link>
			</h1>
		);

	return (
		<div className='max-w-screen-sm px-4 py-12 mx-auto antialiased font-body'>
			<header>{header}</header>
			<main>{children}</main>
			<footer className='text-lg font-light'>© {new Date().getFullYear()}, Filled with bugs🐞.</footer>
		</div>
	);
}
