import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import MyButton from '../utility/MyButton'
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
import { ReactComponent as Scroll } from '../assets/icons/scroll-quill.svg'

const styles = {
	card: {
		position: 'relative',
		display: 'flex',
		marginBottom: 20,
	},
	image: {
		width: 200,
	},
	content: {
		padding: 25,
		objectFit: 'cover',
	},
	likeBox: {
		margin: '0 1rem 0 0.5rem',
	},
}

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
				className={classes.image}
			/>
			<CardContent className={classes.content}>
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
					<span>{likeCount} fires</span>
				</span>

				<span className={classes.likeBox}>
					<MyButton tip='Comment'>
						<Scroll style={{ fill: '#6F1E51', width: '26' }} />
					</MyButton>
					<span>{commentCount} comments</span>
				</span>
				<PostDialog postId={postId} userHandle={userHandle} />
			</CardContent>
		</Card>
	)
}

Post.propTypes = {
	user: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	user: state.user,
})

export default connect(mapStateToProps)(withStyles(styles)(Post))
