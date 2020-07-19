import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

//Redux stuff
// import { connect } from 'react-redux'

//Material UI
import { withStyles } from '@material-ui/core/styles'
import MuiLink from '@material-ui/core/Link'
import { Paper } from '@material-ui/core'
import { Typography } from '@material-ui/core'

//Icons
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined'
import { ReactComponent as Calendar } from '../../assets/icons/calendar.svg'

const styles = (theme) => ({
	...theme.custom,
})

function StaticProfile(props) {
	const {
		classes,
		profile: { handle, createdAt, imageUrl, bio, website, location },
	} = props

	return (
		<>
			<Paper className={classes.paper}>
				<div className={classes.profile}>
					<div className='image-wrapper'>
						<img src={imageUrl} alt='profile' className='profile-image' />
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
		</>
	)
}

StaticProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(StaticProfile)
