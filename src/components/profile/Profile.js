import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

import EditDetails from './EditDetails'
import MyButton from '../../utility/MyButton'

//Redux stuff
import { connect } from 'react-redux'
import { logOutUser, uploadImage } from '../../redux/actions/userAction'

//Material UI
import { withStyles } from '@material-ui/core/styles'
import { Button, Paper } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import MuiLink from '@material-ui/core/Link'

//Icons
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined'
import { ReactComponent as Calendar } from '../../assets/icons/calendar.svg'
import { ReactComponent as QuillInk } from '../../assets/icons/quill-ink.svg'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'

const styles = (theme) => ({
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
				color: '#00bcd4',
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
	buttons: {
		textAlign: 'center',
		'& a': {
			margin: '20px 10px',
		},
	},
})

function Profile(props) {
	const {
		classes,
		user: {
			credentials: { handle, createdAt, imageUrl, bio, website, location },
			loading,
			authenticated,
		},
	} = props

	const handleImageChange = (e) => {
		const image = e.target.files[0]
		//send to server
		const formData = new FormData()
		formData.append('image', image, image.name)
		props.uploadImage(formData)
	}

	const handleEditPicture = () => {
		const fileInput = document.getElementById('imageUpload')
		fileInput.click()
	}

	const handleLogOut = () => {
		props.logOutUser()
	}

	let profileMarkup = !loading ? (
		authenticated ? (
			<Paper className={classes.paper}>
				<div className={classes.profile}>
					<div className='image-wrapper'>
						<img src={imageUrl} alt='profile' className='profile-image' />
						<input
							type='file'
							id='imageUpload'
							hidden='hidden'
							onChange={handleImageChange}
						/>
						<MyButton
							tip='Edit profile picture'
							placement='top'
							onClick={handleEditPicture}
							btnClassName='button'
						>
							<QuillInk style={{ fill: '#6F1E51', width: '26' }} />
						</MyButton>
					</div>
					<hr />
					<div className='profile-details'>
						<MuiLink
							component={Link}
							to={`/users/${handle}`}
							color='primary'
							variant='h5'
						>
							@{handle}
						</MuiLink>
						<hr />
						{bio && <Typography variant='body2'>{bio}</Typography>}
						<hr />
						{location && (
							<>
								<LocationOnOutlinedIcon color='primary' />{' '}
								<span>{location}</span>
								<hr />
							</>
						)}
						{website && (
							<>
								<LinkOutlinedIcon color='primary' />
								<a href={website} target='_blank' rel='noopener noreferrer'>
									{'  '}
									{website}
								</a>
								<hr />
							</>
						)}
						<Calendar style={{ fill: '#B33771', width: '22' }} />
						{'  '}
						<span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
					</div>
					<MyButton tip='Log out' onClick={handleLogOut} placement='top'>
						<KeyboardReturnIcon color='secondary' />
					</MyButton>
					<EditDetails />
				</div>
			</Paper>
		) : (
			<Paper className={classes.paper}>
				<Typography variant='body2' align='center'>
					No profile found, please login again
				</Typography>
				<div className={classes.buttons}>
					<Button
						variant='contained'
						color='primary'
						component={Link}
						to='/login'
					>
						Login
					</Button>
					<Button
						variant='contained'
						color='primary'
						component={Link}
						to='/signup'
					>
						Sign Up
					</Button>
				</div>
			</Paper>
		)
	) : (
		<p>Loading...</p>
	)

	return profileMarkup
}

const mapStateToProps = (state) => ({
	user: state.user,
})

const mapActionsToProps = { logOutUser, uploadImage }

Profile.propTypes = {
	user: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	logOutUser: PropTypes.func.isRequired,
	uploadImage: PropTypes.func.isRequired,
}

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(Profile))
