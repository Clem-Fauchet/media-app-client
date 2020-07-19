import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

//date format
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

//Redux stuff
import { connect } from 'react-redux'
import { markNotificationsRead } from '../../redux/actions/userAction'

//Material Ui Style
import { withStyles } from '@material-ui/core/styles'
import { Menu } from '@material-ui/core'
import { MenuItem } from '@material-ui/core'
import { Tooltip } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { Badge } from '@material-ui/core'
import { Typography } from '@material-ui/core'

//Icons
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined'
import WhatshotOutlinedIcon from '@material-ui/icons/WhatshotOutlined'
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined'

const LightTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: theme.palette.common.white,
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: theme.shadows[1],
		fontSize: 11,
	},
}))(Tooltip)

const styles = {}

function Notifications(props) {
	const [anchorEl, setAnchorEl] = useState(null)

	dayjs.extend(relativeTime)

	// const { classes } = props
	const notifications = props.notifications

	const handleOpen = (e) => {
		setAnchorEl(e.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const onMenuOpened = () => {
		let unreadNotificationsIds = props.notifications
			.filter((notification) => !notification.read)
			.map((notification) => notification.notificationId)

		props.markNotificationsRead(unreadNotificationsIds)
	}

	let notificationIcon
	if (notifications && notifications.length > 0) {
		notifications.filter((notification) => notification.read === false).length >
		0
			? (notificationIcon = (
					<Badge
						badgeContent={
							notifications.filter(
								(notification) => notification.read === false
							).length
						}
						color='secondary'
					>
						<NotificationsNoneOutlinedIcon />
					</Badge>
			  ))
			: (notificationIcon = <NotificationsNoneOutlinedIcon />)
	} else {
		notificationIcon = <NotificationsNoneOutlinedIcon />
	}

	let notificationMarkup =
		notifications && notifications.length > 0 ? (
			notifications.map((notification) => {
				const verb = notification.type === 'like' ? 'liked' : 'commented on'
				const time = dayjs(notification.createdAt).fromNow()
				const iconColor = notification.read ? 'secondary' : 'primary'

				const icon =
					notification.type === 'like' ? (
						<WhatshotOutlinedIcon
							color={iconColor}
							style={{ marginRight: '10px' }}
						/>
					) : (
						<ChatOutlinedIcon
							color={iconColor}
							style={{ marginRight: '10px' }}
						/>
					)

				return (
					<MenuItem key={notification.createdAt} onClick={handleClose}>
						{icon}
						<Typography
							component={Link}
							color='inherit'
							variant='body1'
							to={`/users/${notification.recipient}/post/${notification.postId}`}
						>
							{notification.sender} {verb} your post {time}
						</Typography>
					</MenuItem>
				)
			})
		) : (
			<MenuItem onClick={handleClose}>You have no notification yet</MenuItem>
		)

	const open = Boolean(anchorEl)
	const id = open ? 'simple-menu' : undefined

	return (
		<>
			<LightTooltip title='Notifications' placement='bottom'>
				<IconButton
					onClick={handleOpen}
					aria-controls={id}
					aria-haspopup='true'
				>
					{notificationIcon}
				</IconButton>
			</LightTooltip>
			<Menu
				anchorEl={anchorEl}
				id={id}
				open={open}
				onClose={handleClose}
				onEntered={onMenuOpened}
			>
				{notificationMarkup}
			</Menu>
		</>
	)
}

const mapStateToProps = (state) => ({
	notifications: state.user.notifications,
})

Notifications.propTypes = {
	markNotificationsRead: PropTypes.func.isRequired,
	notifications: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, { markNotificationsRead })(
	withStyles(styles)(Notifications)
)
