import React, { useState } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

import MyButton from '../../utility/MyButton'
import LikeButton from './LikeButton'
import Comments from './Comments'
import CommentForm from './CommentForm'

//Redux Stuff
import { connect } from 'react-redux'
import { getPost, clearErrors } from '../../redux/actions/dataAction'

//Material UI
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { CircularProgress } from '@material-ui/core'
//Form Dialog
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

//Icons
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore'
import { ReactComponent as Scroll } from '../../assets/icons/scroll-quill.svg'

const styles = (theme) => ({
	...theme.formulaire,

	profileImage: {
		maxWidth: '200px',
		height: '200px',
		borderRadius: '50%',
		objectFit: 'cover',
	},

	dialogContent: {
		padding: '20px',
		overflow: 'hidden',
	},

	closeButton: {
		position: 'absolute',
		left: '90%',
	},

	expandButton: {
		position: 'absolute',
		left: '90%',
	},

	spinnerDiv: {
		textAlign: 'center',
		marginTop: '50px',
		marginBottom: '20px',
	},

	likeBox: {
		margin: '0 1rem 0 0',
	},
})

function PostDialog(props) {
	const {
		classes,
		post: {
			postId,
			body,
			createdAt,
			likeCount,
			commentCount,
			userImage,
			userHandle,
			comments,
		},
		UI: { loading },
	} = props

	const [state, setState] = useState({
		open: false,
	})
	const handleOpen = () => {
		setState({ ...state, open: true })
		props.getPost(props.postId)
	}

	const handleClose = () => {
		setState({ ...state, open: false, errors: {} })
		props.clearErrors()
	}

	const dialogMarkup = loading ? (
		<div className={classes.spinnerDiv}>
			<CircularProgress size={200} thickness={2} />
		</div>
	) : (
		<Grid container spacing={5}>
			<Grid item sm={5}>
				<img src={userImage} alt='Profile' className={classes.profileImage} />
			</Grid>
			<Grid item sm={7}>
				<Typography
					component={Link}
					color='secondary'
					variant='h5'
					to={`/users/${userHandle}`}
				>
					@{userHandle}
				</Typography>
				<hr className={classes.invisibleSeparator} />
				<Typography variant='body2' color='textSecondary'>
					{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
				</Typography>
				<hr className={classes.invisibleSeparator} />
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
			</Grid>
			<hr className={classes.visibleSeparator} style={{ width: '95%' }} />

			<CommentForm postId={postId} />
			<Comments comments={comments} />
		</Grid>
	)

	return (
		<>
			<MyButton
				onClick={handleOpen}
				tip='Expand post'
				tipClassName={classes.expandButton}
			>
				<UnfoldMoreIcon color='secondary' />
			</MyButton>

			<Dialog open={state.open} onClose={handleClose} fullWidth maxWidth='sm'>
				<MyButton
					tip='Close'
					onClick={handleClose}
					tipClassName={classes.closeButton}
				>
					<CancelOutlinedIcon />
				</MyButton>

				<DialogContent className={classes.dialogContent}>
					{dialogMarkup}
				</DialogContent>
			</Dialog>
		</>
	)
}

const mapStateToProps = (state) => ({
	post: state.data.post,
	UI: state.UI,
})

const mapActionsToProps = {
	getPost,
	clearErrors,
}

PostDialog.propTypes = {
	clearErrors: PropTypes.func.isRequired,
	getPost: PropTypes.func.isRequired,
	postId: PropTypes.string.isRequired,
	userHandle: PropTypes.string.isRequired,
	post: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
}

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(PostDialog))
