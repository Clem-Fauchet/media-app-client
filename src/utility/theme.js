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

	custom: {
		//Form
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

		//Separator
		invisibleSeparator: {
			border: 'none',
		},

		visibleSeparator: {
			width: '100%',
			borderBottom: '1px solid rgba(0,0,0,0.1)',
		},

		//Card
		card: {
			position: 'relative',
			display: 'flex',
			marginBottom: 20,
		},
		imageCard: {
			minWidth: 200,
			objectFit: 'cover',
		},
		contentCard: {
			padding: 25,
			objectFit: 'cover',
		},
		likeBox: {
			margin: '0 1rem 0 0.5rem',
		},

		//Profile
		paper: {
			padding: 20,
		},
		profile: {
			'& .image-wrapper': {
				textAlign: 'center',
				position: 'relative',
				'& button': {
					position: 'absolute',
					top: '80%',
					left: '75%',
				},
			},
			'& .profile-image': {
				width: 200,
				height: 200,
				objectFit: 'cover',
				maxWidth: '100%',
				borderRadius: '50%',
			},
			'& .profile-details': {
				textAlign: 'center',
				'& span, svg': {
					verticalAlign: 'middle',
				},
				'& a': {
					color: '#B33771',
				},
			},
			'& hr': {
				border: 'none',
				margin: '0 0 10px 0',
			},
			'& svg.button': {
				'&:hover': {
					cursor: 'pointer',
				},
			},
		},

		//SKeleton

		fullLine: {
			height: '15px',
			width: '90%',
			marginBottom: '10px',
			backgroundColor: 'rgba(0,0,0,0.5)',
		},

		halfLine: {
			height: '15px',
			width: '50%',
			backgroundColor: 'rgba(0,0,0,0.5)',
			marginBottom: '10px',
		},
	},
}

export default themeFile
