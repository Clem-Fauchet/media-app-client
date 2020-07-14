import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import MyButton from '../utility/MyButton'
import DeletePost from './DeletePost'

//date format
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

//Redux stuff
import { connect } from 'react-redux'
import { likePost, unlikePost } from '../redux/actions/dataAction'

//Material Ui Style
import { withStyles } from '@material-ui/core/styles'
import { Card } from '@material-ui/core'
import { CardContent, CardMedia } from '@material-ui/core'
import { Typography } from '@material-ui/core'

//Icons
import WhatshotOutlinedIcon from '@material-ui/icons/WhatshotOutlined'
import WhatshotIcon from '@material-ui/icons/Whatshot'
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

	const likedPost = () => {
		if (
			props.user.likes &&
			props.user.likes.find((like) => like.postId === props.post.postId)
		)
			//if it doesn't find anything return undefined
			return true
		else return false
	}

	const likePost = () => {
		props.likePost(props.post.postId)
	}

	const unlikePost = () => {
		props.unlikePost(props.post.postId)
	}

	const likeButton = !authenticated ? (
		<MyButton tip='Fire'>
			<Link to='/login'>
				<WhatshotIcon color='secondary' />
			</Link>
		</MyButton>
	) : likedPost() ? (
		<MyButton tip='UnFire' onClick={unlikePost}>
			<WhatshotOutlinedIcon color='primary' />
		</MyButton>
	) : (
		<MyButton tip='Fire' onClick={likePost}>
			<WhatshotIcon color='secondary' />
		</MyButton>
	)

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
					{likeButton}
					<span>{likeCount} fires</span>
				</span>

				<span className={classes.likeBox}>
					<MyButton tip='Comment'>
						<Scroll style={{ fill: '#6F1E51', width: '26' }} />
					</MyButton>
					<span>{commentCount} comments</span>
				</span>
			</CardContent>
		</Card>
	)
}

Post.propTypes = {
	likePost: PropTypes.func.isRequired,
	unlikePost: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	user: state.user,
})

const mapActionsToProps = {
	likePost,
	unlikePost,
}

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(Post))
