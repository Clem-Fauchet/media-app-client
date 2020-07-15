import React, { useState } from 'react'
import PropTypes from 'prop-types'

import MyButton from '../../utility/MyButton'

//Redux stuff
import { connect } from 'react-redux'
import { deletePost } from '../../redux/actions/dataAction'

//Material Ui Style
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
//Form Dialog
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'

//Icons
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'

const styles = {
	deleteButton: {
		left: '90%',
		top: '10%',
		position: 'absolute',
		color: '#875875',
	},
}

function DeletePost(props) {
	const [state, setState] = useState({
		open: false,
	})

	const handleOpen = () => {
		setState({ ...state, open: true })
	}

	const handleClose = () => {
		setState({ ...state, open: false })
	}

	const deletePostFunction = () => {
		props.deletePost(props.postId)
		setState({ ...state, open: false })
	}

	const { classes } = props

	return (
		<>
			<MyButton
				tip='Delete post'
				onClick={handleOpen}
				btnClassName={classes.deleteButton}
				placement='top'
			>
				<DeleteOutlineOutlinedIcon />
			</MyButton>

			<Dialog open={state.open} onClose={handleClose} fullWidth maxWidth='sm'>
				<DialogTitle>Are you sure you want to delete this post? </DialogTitle>
				<DialogActions>
					<Button
						onClick={deletePostFunction}
						color='primary'
						style={{ fontWeight: '600' }}
					>
						Delete
					</Button>

					<Button
						onClick={handleClose}
						color='primary'
						style={{ fontWeight: '600' }}
					>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

DeletePost.propTypes = {
	deletePost: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
}

export default connect(null, { deletePost })(withStyles(styles)(DeletePost))
