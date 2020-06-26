module.exports = {
	plugins: [
		{
			resolve: 'gatsby-plugin-web-font-loader',
			options: {
				google: {
					families: ['Nunito', 'Lato', 'sans-serif'],
				},
			},
		},
	],
}
