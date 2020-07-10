import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

//Redux stuff
import { connect } from 'react-redux'
import { editUserDetails } from '../redux/actions/userAction'

//Material UI
import { withStyles } from '@material-ui/core/styles'
import { Tooltip, TextField, Button } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
//Form Dialog
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

//Icons
import { ReactComponent as QuillInk } from '../assets/icons/quill-ink.svg'

const styles = (theme) => ({
	...theme.formulaire,
	button: {
		float: 'right',
	},
})

const LightTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: theme.palette.common.white,
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: theme.shadows[1],
		fontSize: 11,
	},
}))(Tooltip)

function EditDetails(props) {
	const [state, setState] = useState({
		bio: '',
		website: '',
		location: '',
		open: false,
	})

	useEffect((credentials) => {
		mapUserDetailsToState(credentials)
	}, [])

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
			<LightTooltip title='Edit details' placement='top'>
				<IconButton onClick={handleOpen} className={classes.button}>
					<QuillInk style={{ fill: '#6F1E51', width: '26' }} />
				</IconButton>
			</LightTooltip>
			<Dialog open={state.open} onClose={handleClose} fullWidth maxWidth='sm'>
				<DialogTitle>Edit your details</DialogTitle>
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
							placeholder='Your personnal/professional site'
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
					<Button
						style={{ fontWeight: '600' }}
						onClick={handleClose}
						color='primary'
					>
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
