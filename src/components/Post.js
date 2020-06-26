import React from 'react'
import { Link } from 'react-router-dom'

//date format
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

//Material Ui Style
import { withStyles } from '@material-ui/core/styles'
import { Card } from '@material-ui/core'
import { CardContent, CardMedia } from '@material-ui/core'
import { Typography } from '@material-ui/core'

const styles = {
	card: {
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
}

function Post(props) {
	dayjs.extend(relativeTime)

	const {
		classes,
		post: { body, userImage, createdAt, userHandle },
	} = props

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
				<Typography variant='body2' color='textSecondary'>
					{dayjs(createdAt).fromNow()}
				</Typography>
				<Typography variant='body1'>{body}</Typography>
			</CardContent>
		</Card>
	)
}

export default withStyles(styles)(Post)
