import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import MyButton from '../utility/MyButton'

//Redux stuff
import { connect } from 'react-redux'
import { likePost, unlikePost } from '../redux/actions/dataAction'

//Icons
import WhatshotOutlinedIcon from '@material-ui/icons/WhatshotOutlined'
import WhatshotIcon from '@material-ui/icons/Whatshot'

function LikeButton(props) {
	const likedPost = () => {
		if (
			props.user.likes &&
			props.user.likes.find((like) => like.postId === props.postId)
		)
			//if it doesn't find anything return undefined
			return true
		else return false
	}

	const likePost = () => {
		props.likePost(props.postId)
	}

	const unlikePost = () => {
		props.unlikePost(props.postId)
	}

	const { authenticated } = props.user

	const likeButton = !authenticated ? (
		<Link to='/login'>
			<MyButton tip='Fire'>
				<WhatshotIcon color='secondary' />
			</MyButton>
		</Link>
	) : likedPost() ? (
		<MyButton tip='UnFire' onClick={unlikePost}>
			<WhatshotOutlinedIcon color='primary' />
		</MyButton>
	) : (
		<MyButton tip='Fire' onClick={likePost}>
			<WhatshotIcon color='secondary' />
		</MyButton>
	)
	return <>{likeButton}</>
}

const mapStateToProps = (state) => ({
	user: state.user,
})

const mapActionsToProps = {
	likePost,
	unlikePost,
}

LikeButton.propTypes = {
	user: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
	likePost: PropTypes.func.isRequired,
	unlikePost: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
