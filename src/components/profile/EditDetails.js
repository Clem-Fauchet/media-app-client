import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import MyButton from '../../utility/MyButton'

//Redux stuff
import { connect } from 'react-redux'
import { editUserDetails } from '../../redux/actions/userAction'

//Material UI
import { withStyles } from '@material-ui/core/styles'
import { TextField, Button } from '@material-ui/core'
//Form Dialog
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

//Icons
import { ReactComponent as QuillInk } from '../../assets/icons/quill-ink.svg'

const styles = (theme) => ({
	...theme.custom,
	button: {
		float: 'right',
	},

	title: {
		color: theme.palette.secondary.main,
	},
})

function EditDetails(props) {
	const [state, setState] = useState({
		bio: '',
		website: '',
		location: '',
		open: false,
	})

	useEffect((credentials) => {
		mapUserDetailsToState(credentials)
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	const handleOpen = () => {
		setState({ open: true })
		mapUserDetailsToState(props.credentials)
	}

	const handleClose = () => {
		setState({ open: false })
	}

	const mapUserDetailsToState = (credentials) => {
		setState((prevState) => ({
			...prevState,
			bio: props.credentials.bio ? props.credentials.bio : '',
			website: props.credentials.website ? props.credentials.website : '',
			location: props.credentials.location ? props.credentials.location : '',
		}))
	}

	//changing input value
	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = () => {
		const userDetails = {
			bio: state.bio,
			website: state.website,
			location: state.location,
		}
		props.editUserDetails(userDetails)
		handleClose()
	}

	const { classes } = props

	return (
		<>
			<MyButton
				tip='Edit details'
				placement='top'
				onClick={handleOpen}
				btnClassName={classes.button}
			>
				<QuillInk style={{ fill: '#6F1E51', width: '26' }} />
			</MyButton>

			<Dialog open={state.open} onClose={handleClose} fullWidth maxWidth='sm'>
				<DialogTitle className={classes.title}>
					Share some details about yourself
				</DialogTitle>
				<DialogContent>
					<form>
						<TextField
							name='bio'
							type='text'
							label='Bio'
							multiline
							rows='3'
							placeholder='A short bio about yourself'
							className={classes.textField}
							value={state.bio}
							onChange={handleChange}
							fullWidth
						></TextField>

						<TextField
							name='website'
							type='text'
							label='Website'
							placeholder='Your personal/professional site'
							className={classes.textField}
							value={state.website}
							onChange={handleChange}
							fullWidth
						></TextField>

						<TextField
							name='location'
							type='text'
							label='Location'
							placeholder='Where you live'
							className={classes.textField}
							value={state.location}
							onChange={handleChange}
							fullWidth
						></TextField>
					</form>
				</DialogContent>

				<DialogActions>
					<Button
						style={{ fontWeight: '600' }}
						onClick={handleSubmit}
						color='primary'
					>
						Submit
					</Button>
					<Button style={{ fontWeight: '600' }} onClick={handleClose}>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

const mapStateToProps = (state) => ({
	credentials: state.user.credentials,
})

EditDetails.propTypes = {
	editUserDetails: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { editUserDetails })(
	withStyles(styles)(EditDetails)
)
