/** @type {import('next').NextConfig} */
const nextConfig = {
	publicRuntimeConfig : {
		// Will be available on both server and client
		baseUrl : process.env.BASE_URL,
	},
	async rewrites() {
		return [
			{
				source      : '/api-web/:path*',
				destination : `${process.env.BASE_URL}/:path*`,
			},
		]
	},
	images : {
		remotePatterns : [
			{
				protocol : 'https',
				hostname : 'avatars.githubusercontent.com',
				port     : '',
				pathname : '/u/**',
			},
			{
				protocol : 'https',
				hostname : 'res.cloudinary.com',
				port     : '',
				pathname : '/*/image/upload/**',
			},
		],
	},
}

module.exports = nextConfig
