import Document, { Head, Main, NextScript, Html } from 'next/document';

import { getSiteMetaData } from 'utils/helpers';

export default class MyDocument extends Document {
	render() {
		const siteMetadata = getSiteMetaData();

		return (
			<Html lang={siteMetadata.language}>
				<Head>
					<script
						async
						src="https://aslemammad-ackee.herokuapp.com/tracker.js"
						data-ackee-server="https://aslemammad-ackee.herokuapp.com"
						data-ackee-domain-id="7134e287-4738-4ca8-89c7-069ef8abf7f4"
					/>
					<script
						dangerouslySetInnerHTML={{
							__html: `window.__onDarkModeChange = function () {};
										window.__setDarkMode = function () {}`
						}}
					/>
				</Head>

				<body>
					{' '}
					<Main />
					<NextScript />
					<script
						global="true"
						dangerouslySetInnerHTML={{
							__html: `
			  (function () {
                function setTheme(newTheme) {
                  document.getElementsByTagName("HTML")[0].classList.remove(!newTheme ? 'dark-mode' : 'light-mode');
                  document.getElementsByTagName("HTML")[0].classList.add(newTheme ? 'dark-mode' : 'light-mode');
                  window.__darkMode = newTheme;
                  window.__onDarkModeChange(newTheme);
                }
                window.__onDarkModeChange = function () {};
                window.__setDarkMode = function (newTheme) {
                  setTheme(newTheme);
                  try {
                    localStorage.setItem("darkMode", JSON.stringify(window.__darkMode));
                  } catch (err) {}
                };
                const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
                darkQuery.addListener(function (event) {
                  window.__setDarkMode(event.matches ? true : false);
                });
                let darkMode;
                try {
                  darkMode = JSON.parse(localStorage.getItem("darkMode"));
                } catch (err) {}
                setTheme(darkMode);
              })();
            `
						}}
					/>
				</body>
			</Html>
		);
	}
}
