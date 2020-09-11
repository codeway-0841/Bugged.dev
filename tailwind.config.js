const defaultSans = [
	'system-ui',
	'-apple-system',
	'BlinkMacSystemFont',
	'"Segoe UI"',
	'Roboto',
	'"Helvetica Neue"',
	'Arial',
	'"Noto Sans"',
	'sans-serif',
	'"Apple Color Emoji"',
	'"Segoe UI Emoji"',
	'"Segoe UI Symbol"',
	'"Noto Color Emoji"'
];

const defaultSerif = [
	'Georgia',
	'Cambria',
	'"Times New Roman"',
	'Times',
	'serif'
];

module.exports = {
	purge    : [
		'./**/{pages,components,tailwind}/**/*.{js,jsx,ts,tsx,css}'
	],
	theme    : {
		extend     : {
			colors   : {
				red : '#c0392b'
			},
			fontSize : {
				'7xl' : '4.2rem',
				'6xl' : '3.7rem',
				'1xl' : '.8rem'
			},
			spacing  : {
				14 : '3.375rem'
			}
		},
		fontFamily : {
			display : [
				'Open Sans',
				...defaultSans
			],
			body    : [
				'Merriweather',
				...defaultSerif
			]
		},
		typography : (theme) => ({
			default : {
				css : {
					color             : theme('colors.gray.900'),
					blockquote        : {
						borderLeftColor : theme('colors.red')
					},
					'ol > li::before' : {
						color : theme('colors.red')
					},
					'ul > li::before' : {
						backgroundColor : theme('colors.red')
					},
					a                 : {
						color : theme('colors.red')
					}
				}
			}
		})
	},
	variants : {},
	plugins  : [
		require('@tailwindcss/typography')
	],
	future   : { removeDeprecatedGapUtilities: true }
};
