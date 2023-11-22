import type { Config } from 'tailwindcss'

const config: Config = {
	content : [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme : {
		extend : {
			backgroundImage : {
				'gradient-radial' : 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic' :
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'dashed-line' : "url('/+++.svg')",
				plus          : "url('/+++.svg')",
			},
			colors : {
				dark              : '#222222',
				'dark-secondary'  : 'rgba(84, 84, 84, 0.46)',
				orange            : '#F26B50',
				green             : '#4FAA84',
				white             : '#FBFBFB',
				'white-overlay'   : 'rgba(251, 251, 251, 0.40)',
				'white-overlay-2' : 'rgba(251, 251, 251, 0.20)',
			},
			boxShadow : {
				skill : '0px 1px 4px 1px rgba(34, 34, 34, 0.25)',
			},
		},
	},
	plugins : [],
}
export default config
