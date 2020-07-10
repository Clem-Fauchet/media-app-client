import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

//Redux stuff
import { connect } from 'react-redux'
import { logOutUser, uploadImage } from '../redux/actions/userAction'

//Material UI
import { withStyles } from '@material-ui/core/styles'
import { Button, Paper } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import MuiLink from '@material-ui/core/Link'
import { IconButton } from '@material-ui/core'
import { Tooltip } from '@material-ui/core'

//Icons
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined'
// import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import { ReactComponent as Calendar } from '../assets/icons/calendar.svg'
import { ReactComponent as QuillInk } from '../assets/icons/quill-ink.svg'

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

const LightTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: theme.palette.common.white,
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: theme.shadows[1],
		fontSize: 11,
	},
}))(Tooltip)

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
						<LightTooltip title='Edit profile picture' placement='top'>
							<IconButton onClick={handleEditPicture} className='button'>
								<QuillInk style={{ fill: '#6F1E51', width: '26' }} />
							</IconButton>
						</LightTooltip>
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