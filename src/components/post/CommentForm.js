import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

//Redux Stuff
import { connect } from 'react-redux'
import { submitComment, getPosts } from '../../redux/actions/dataAction'

//Material UI
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { TextField } from '@material-ui/core'

const styles = (theme) => ({
	...theme.formulaire,
})

function CommentForm(props) {
	const [state, setState] = useState({
		body: '',
		errors: {},
	})

	const { classes, authenticated } = props

	useEffect(() => {
		if (props.UI.errors) {
			setState((prevState) => ({
				...prevState,
				errors: props.UI.errors,
			}))
		}
	}, [props.UI.errors]) // eslint-disable-line react-hooks/exhaustive-deps

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		props.submitComment(props.postId, { body: state.body })
		setState({ body: '', errors: {} })

		if (state.body !== '') {
			const timer = setTimeout(() => props.getPosts(), 3000)
			return () => clearTimeout(timer)
		}
	}

	const commentFormMarkup = authenticated ? (
		<Grid item sm={12} style={{ textAlign: 'center' }}>
			<form onSubmit={handleSubmit}>
				<TextField
					name='body'
					type='text'
					label='Comment on post'
					error={state.errors.comment ? true : false}
					helperText={state.errors.comment}
					value={state.body}
					onChange={handleChange}
					fullWidth
					className={classes.textField}
				/>
				<Button
					type='submit'
					variant='contained'
					color='primary'
					className={classes.button}
				>
					Submit
				</Button>
			</form>
			<hr className={classes.visibleSeparator} />
		</Grid>
	) : null

	return <>{commentFormMarkup}</>
}

const mapStateToProps = (state) => ({
	UI: state.UI,
	authenticated: state.user.authenticated,
})

CommentForm.propTypes = {
	submitComment: PropTypes.func.isRequired,
	getPosts: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
	authenticated: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, {
	submitComment,
	getPosts,
})(withStyles(styles)(CommentForm))
