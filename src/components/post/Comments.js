import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

//Material UI
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { Typography } from '@material-ui/core'

const styles = (theme) => ({
	...theme.formulaire,

	commentImage: {
		mawWidth: '100%',
		height: '100px',
		objectFit: 'cover',
		borderRadius: '50%',
	},

	commentData: {
		marginLeft: '30px',
	},
})

function Comments(props) {
	const { comments, classes } = props
	return (
		<Grid container style={{ padding: '20px' }}>
			{comments.map((comment, index) => {
				const { body, createdAt, userImage, userHandle } = comment
				return (
					<Fragment key={createdAt}>
						<Grid item sm={12}>
							<Grid container>
								<Grid item sm={2}>
									<img
										src={userImage}
										alt='comment'
										className={classes.commentImage}
									/>
								</Grid>

								<Grid item sm={9}>
									<div className={classes.commentData}>
										<Typography
											variant='h5'
											component={Link}
											to={`/users/${userHandle}`}
											color='primary'
										>
											{userHandle}
										</Typography>
										<Typography variant='body2' color='textSecondary'>
											{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
										</Typography>
										<hr className={classes.invisibleSeparator} />
										<Typography variant='body1'>{body}</Typography>
									</div>
								</Grid>
							</Grid>
						</Grid>
						{index !== comments.length - 1 && (
							<hr className={classes.visibleSeparator} />
						)}
					</Fragment>
				)
			})}
		</Grid>
	)
}

Comment.propTypes = {
	comments: PropTypes.array.isRequired,
}

export default withStyles(styles)(Comments)
