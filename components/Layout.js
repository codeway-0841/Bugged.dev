/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useRouter } from 'next/router';

import useDarkMode from 'hooks/useDarkMode';

export default function Layout({ children, primary }) {
	const [ darkMode, setDarkMode ] = useDarkMode();
	const { pathname } = useRouter();
	const isRoot = pathname === '/';

	const handleDarkModeChange = () => {
		if (darkMode) {
			return setDarkMode(false);
		}
		setDarkMode(true);
	};

	return (
		<div className="max-w-screen-sm px-4 py-12 mx-auto antialiased font-body items-end">
			<header>
				<div className={`flex justify-between align-bottom ${primary || isRoot ? 'mb-8' : 'mb-2'}`}>
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
