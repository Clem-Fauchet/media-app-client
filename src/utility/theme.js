const themeFile = {
	palette: {
		primary: {
			main: '#B33771',
			contrastText: '#FFF',
		},
		secondary: {
			main: '#6F1E51',
			contrastText: '#FFF',
		},
		error: {
			main: '#d32f2f',
		},
	},

	typography: {
		fontFamily: ['sans-serif'].join(','),

		// useNextVariants: true,
	},

	formulaire: {
		form: {
			textAlign: 'center',
		},
		image: {
			margin: '20px auto',
		},
		pageTitle: {
			margin: '10px auto',
		},
		textField: {
			margin: '10px auto',
		},
		button: {
			margin: '30px auto 15px auto',
			position: 'relative',
		},
		progress: {
			position: 'absolute',
		},
		customError: {
			color: 'red',
			fontSize: '0.8rem',
		},

		invisibleSeparator: {
			border: 'none',
		},

		visibleSeparator: {
			width: '100%',
			borderBottom: '1px solid rgba(0,0,0,0.1)',
		},
	},

	navBar: {},
}

export default themeFile
