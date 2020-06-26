export default {
	palette: {
		primary: {
			main: '#B33771',
			contrastText: '#FFF',
		},
		secondary: {
			main: '#6F1E51',
			contrastText: '#7A7A7A',
		},
		typography: {
			useNextVariants: true,
			fontFamily: ['Nunito', 'Lato', 'sans-serif'].join(','),
		},
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
	},
}
