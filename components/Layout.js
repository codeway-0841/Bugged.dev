/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import useDarkMode from 'hooks/useDarkMode';
import Loading from './Loading';

export default function Layout({ children, primary }) {
	const [ loading, setLoading ] = useState(false);
	const [ darkMode, setDarkMode ] = useDarkMode();
	const { pathname, events } = useRouter();
	const isRoot = pathname === '/';

	const handleDarkModeChange = () => {
		if (darkMode) {
			return setDarkMode(false);
		}
		setDarkMode(true);
	};
	useEffect(() => {
		events.on('routeChangeStart', () => setLoading(true));
		events.on('routeChangeComplete', () => setLoading(false));

		return () => {
			events.off('routeChangeStart', () => setLoading(true));
			events.off('routeChangeComplete', () => setLoading(false));
		};
	}, []);

	return (
		<div className="max-w-screen-sm px-4 py-12 mx-auto antialiased font-body">
			{loading ? <Loading /> : null}

			<header>
				<div className={`flex justify-between align-bottom items-end ${primary || isRoot ? 'mb-8' : 'mb-2'}`}>
					{primary || isRoot ? (
						<h1>
							<Link href="/">
								<a className="font-black leading-none text-black no-underline text-5xl  md:text-6xl font-display mb-0">
									Bugged🐞
								</a>
							</Link>
						</h1>
					) : (
						<h1>
							<Link href="/">
								<a className="text-2xl font-black text-black no-underline font-display">Bugged🐞</a>
							</Link>
						</h1>
					)}{' '}
					<button className="focus:outline-none underline" onClick={handleDarkModeChange}>
						Go {darkMode ? 'light' : 'dark'}{' '}
					</button>
				</div>
			</header>
			<main>{children}</main>
			<footer className="text-lg font-light">© {new Date().getFullYear()}, Filled with bugs🐞.</footer>
		</div>
	);
}
