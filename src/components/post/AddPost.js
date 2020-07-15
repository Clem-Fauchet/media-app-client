import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import MyButton from '../../utility/MyButton'

//Redux stuff
import { connect } from 'react-redux'
import { addPost, clearErrors } from '../../redux/actions/dataAction'

//Material UI
import { withStyles } from '@material-ui/core/styles'
import { TextField, Button } from '@material-ui/core'
import { CircularProgress } from '@material-ui/core'
//Form Dialog
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

//Icons
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'

const styles = (theme) => ({
	...theme.formulaire,
	navButton: {
		margin: '0 1em',
	},
	submitButton: {
		position: 'relative',
		margin: '1em 0',
		float: 'right',
	},
	progressSpinner: {
		position: 'absolute',
	},
	closeButton: {
		position: 'absolute',
		left: '90%',
		top: '5%',
	},
})

function AddPost(props) {
	const {
		classes,
		UI: { loading },
	} = props

	const [state, setState] = useState({
		open: false,
		body: '',
		errors: {},
	})
	const { errors } = state

	useEffect(() => {
		if (props.UI.errors) {
			setState((prevState) => ({ ...prevState, errors: props.UI.errors }))
		}

		if (!props.UI.errors && !props.UI.loading) {
			setState({ body: '', open: false, errors: {} })
		}
	}, [props.UI.errors]) // eslint-disable-line react-hooks/exhaustive-deps

	const handleOpen = () => {
		setState({ ...state, open: true })
	}

	const handleClose = () => {
		clearErrors()
		setState({ ...state, open: false, errors: {} })
	}

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		props.addPost({ body: state.body })
	}

	return (
		<>
			<MyButton
				tip='Add a post'
				btnClassName={classes.navButton}
				onClick={handleOpen}
			>
				<AddOutlinedIcon />
			</MyButton>
			<Dialog open={state.open} onClose={handleClose} fullWidth maxWidth='sm'>
				<MyButton
					tip='Close'
					onClick={handleClose}
					tipClassName={classes.closeButton}
				>
					<CancelOutlinedIcon />
				</MyButton>
				<DialogTitle>Post a new scream</DialogTitle>
				<DialogContent>
					<form onSubmit={handleSubmit}>
						<TextField
							name='body'
							type='text'
							label='Post something'
							multiline
							rows='3'
							placeholder='Want to share something?'
							error={errors.body ? true : false}
							helperText={errors.body}
							className={classes.TextField}
							onChange={handleChange}
							fullWidth
						/>
					</form>
					<Button
						type='submit'
						variant='contained'
						color='primary'
						className={classes.submitButton}
						disabled={loading}
						onClick={handleSubmit}
					>
						Submit
						{loading && (
							<CircularProgress size={30} className={classes.progressSpinner} />
						)}
					</Button>
				</DialogContent>
			</Dialog>
		</>
	)
}

const mapStateToProps = (state) => ({
	UI: state.UI,
})

AddPost.propTypes = {
	addPost: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { addPost, clearErrors })(
	withStyles(styles)(AddPost)
)
