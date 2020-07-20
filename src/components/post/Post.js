import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Corner from '../../utility/Corner'
import LikeButton from './LikeButton'
import DeletePost from './DeletePost'
import PostDialog from './PostDialog'

//date format
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

//Redux stuff
import { connect } from 'react-redux'

//Material Ui Style
import { withStyles } from '@material-ui/core/styles'
import { Card } from '@material-ui/core'
import { CardContent, CardMedia } from '@material-ui/core'
import { Typography } from '@material-ui/core'

//Icons
import { ReactComponent as Scroll } from '../../assets/icons/scroll-quill.svg'

const styles = (theme) => ({
	...theme.custom,

	corner: {
		position: 'absolute',
		width: '20px',
		height: '20px',
		top: '0',
		right: '0',
	},

	commentButton: {
		backgroundColor: 'transparent',
		transition: 'none',
		'&:hover': {
			cursor: 'default',
			backgroundColor: 'transparent',
		},
	},
})

function Post(props) {
	dayjs.extend(relativeTime)

	const {
		classes,
		post: {
			body,
			userImage,
			createdAt,
			userHandle,
			likeCount,
			commentCount,
			postId,
		},
		user: {
			authenticated,
			credentials: { handle },
		},
	} = props

	const deleteButton =
		authenticated && userHandle === handle ? (
			<DeletePost postId={postId} />
		) : null

	return (
		<Card className={classes.card}>
			<CardMedia
				image={userImage}
				title='Profile image'
				className={classes.imageCard}
			/>
			<CardContent className={classes.contentCard}>
				<Typography
					variant='h5'
					component={Link}
					to={`/users/${userHandle}`}
					color='primary'
				>
					{userHandle}
				</Typography>

				{deleteButton}
				<Typography variant='body2' color='textSecondary'>
					{dayjs(createdAt).fromNow()}
				</Typography>
				<Typography variant='body1'>{body}</Typography>

				<span className={classes.likeBox}>
					<LikeButton postId={postId} />
					<span className='details'>{likeCount} fires</span>
				</span>

				<span className={classes.likeBox}>
					<button
						className={`MuiButtonBase-root MuiIconButton-root ${classes.commentButton}`}
					>
						<Scroll style={{ fill: '#6F1E51', width: '26' }} />
					</button>
					<span className='details'>{commentCount} comments</span>
				</span>
				<PostDialog
					postId={postId}
					userHandle={userHandle}
					openDialog={props.openDialog}
				/>

				<Corner corner={classes.corner} />
			</CardContent>
		</Card>
	)
}

Post.propTypes = {
	user: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	openDialog: PropTypes.bool,
}

const mapStateToProps = (state) => ({
	user: state.user,
})

export default connect(mapStateToProps)(withStyles(styles)(Post))
