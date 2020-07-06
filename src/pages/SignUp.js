import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'

import AppIcon from '../images/bookmarklet.png'

//Material Ui
import { withStyles, TextField } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { CircularProgress } from '@material-ui/core'

const styles = (theme) => ({
	...theme.formulaire,
})

function SignUp(props) {
	const { classes } = props

	//state control
	const [state, setState] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		handle: '',
		loading: false,
		errors: {
			errors: {
				email: '',
				password: '',
			},
		},
	})

	//submitting form

	const handleSubmit = (e) => {
		e.preventDefault()

		setState({ ...state, loading: false })

		const newUserData = {
			email: state.email,
			password: state.password,
			confirmPassword: state.confirmPassword,
			handle: state.handle,
		}
		axios
			.post('/signup', newUserData)
			.then((res) => {
				console.log(res)
				localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
				setState({
					...state,
					loading: false,
				})
				props.history.push('/')
			})
			.catch((err) => {
				setState({
					...state,
					errors: err.response.data,
					loading: false,
				})

				console.log(state)
			})
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
					Sign Up
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

					<TextField
						id='confirmPassword'
						name='confirmPassword'
						type='password'
						label='Confirm Password'
						className={classes.textField}
						helperText={state.errors.confirmPassword}
						error={state.errors.confirmPassword ? true : false}
						value={state.confirmPassword || ''}
						onChange={handleChange}
						fullWidth
					/>

					<TextField
						id='handle'
						name='handle'
						type='text'
						label='Handle'
						className={classes.textField}
						helperText={state.errors.handle}
						error={state.errors.handle ? true : false}
						value={state.handle || ''}
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
						Sign Up
						{state.loading && (
							<CircularProgress size={30} className={classes.progress} />
						)}
					</Button>
					<br />
					<Typography>
						<small>
							Already have an account? Login <Link to='/login'>here</Link>
						</small>
					</Typography>
				</form>
			</Grid>
			<Grid item sm />
		</Grid>
	)
}

SignUp.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SignUp)
