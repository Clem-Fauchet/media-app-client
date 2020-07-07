import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import AppIcon from '../images/bookmarklet.png'

//Redux stuff
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userAction'

//Material Ui
import { withStyles, TextField } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { CircularProgress } from '@material-ui/core'

const styles = (theme) => ({
	...theme.formulaire,
})

function Login(props) {
	const { classes } = props

	//state control
	const [state, setState] = useState({
		email: '',
		password: '',
		errors: {},
	})

	//submitting form
	useEffect(() => {
		if (props.UI.errors) {
			setState({ ...state, errors: props.UI.errors })
		}
	}, [props.UI.errors])

	const handleSubmit = (e) => {
		e.preventDefault()

		const userData = {
			email: state.email,
			password: state.password,
		}
		props.loginUser(userData, props.history)
	}

	//changing input value
	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<Grid container className={classes.form}>
			<Grid item sm />
			<Grid item sm>
				<img
					width='60'
					src={AppIcon}
					alt='BookMark Icon'
					className={classes.image}
				/>
				<Typography
					variant='h2'
					color='secondary'
					className={classes.pageTitle}
				>
					Login
				</Typography>
				<form noValidate onSubmit={handleSubmit}>
					<TextField
						id='email'
						name='email'
						type='email'
						label='Email'
						className={classes.textField}
						helperText={state.errors.email}
						error={state.errors.email ? true : false}
						value={state.email || ''}
						onChange={handleChange}
						fullWidth
					/>

					<TextField
						id='password'
						name='password'
						type='password'
						label='Password'
						autoComplete='off'
						className={classes.textField}
						helperText={state.errors.password}
						error={state.errors.password ? true : false}
						value={state.password || ''}
						onChange={handleChange}
						fullWidth
					/>
					{state.errors.general && (
						<Typography variant='body2' className={classes.customError}>
							{state.errors.general}
						</Typography>
					)}
					<Button
						type='submit'
						value='submit'
						variant='contained'
						color='primary'
						className={classes.button}
						disabled={state.loading}
					>
						Login
						{state.loading && (
							<CircularProgress size={30} className={classes.progress} />
						)}
					</Button>
					<br />
					<Typography variant='caption'>
						Don't have an account? Sign Up <Link to='/signup'>here</Link>
					</Typography>
				</form>
			</Grid>
			<Grid item sm />
		</Grid>
	)
}

Login.propTypes = {
	classes: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		UI: state.UI,
	}
}

const mapActionsToProps = {
	loginUser,
}

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(Login))
