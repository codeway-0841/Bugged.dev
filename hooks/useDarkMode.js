import { useEffect } from 'react';
import createPersistedState from 'use-persisted-state';
const useState = createPersistedState('darkMode');

const useDarkMode = () => {
	const [ darkMode, setDarkMode ] = useState(false);
	useEffect(
		() => {
			global.window.__onDarkModeChange = setDarkMode;
		},
		[ setDarkMode ]
	);

	useEffect(
		() => {
			global.window.__setDarkMode(darkMode);
		},
		[ darkMode ]
	);

	return [ darkMode, setDarkMode ];
};
export default useDarkMode;
