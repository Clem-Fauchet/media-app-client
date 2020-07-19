import React from 'react'
import NoImg from '../assets/images/pointyhat.png'
import PropTypes from 'prop-types'

//Material UI stuff
import { withStyles } from '@material-ui/core'
import { Paper } from '@material-ui/core'

//Icons
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined'
import { ReactComponent as Calendar } from '../assets/icons/calendar.svg'

const styles = (theme) => ({
	...theme.custom,

	imageProfile: {
		maxWidth: '200px',
		objectFit: 'cover',
	},

	handle: {
		height: '20px',
		backgroundColor: theme.palette.primary.main,
		width: '60px',
		margin: '0 auto 7px auto',
	},
})

function ProfileSkeleton(props) {
	const { classes } = props
	return (
		<Paper className={classes.paper}>
			<div className={classes.profile}>
				<div className='image-wrapper'>
					<img src={NoImg} alt='profile-pic' className={classes.imageProfile} />
				</div>
				<hr />
				<div className='profile-details'>
					<div className={classes.handle} />
					<hr />
					<div className={classes.fullLine} />
					<div className={classes.fullLine} />
					<hr />
					<LocationOnOutlinedIcon color='primary' /> {''}
					<span>Location</span>
					<hr />
					<LinkOutlinedIcon color='primary' /> {''}
					<span>https://website.com</span>
					<hr />
					<Calendar style={{ fill: '#B33771', width: '22' }} /> {''}
					<span>Joined date</span>
				</div>
			</div>
		</Paper>
	)
}

ProfileSkeleton.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProfileSkeleton)
