import React, { Fragment } from 'react'
import NoImg from '../assets/images/pointyhat.png'
import PropTypes from 'prop-types'

//Material UI stuff
import { Card, CardMedia, CardContent } from '@material-ui/core'
import { withStyles } from '@material-ui/core'

const styles = (theme) => ({
	...theme.custom,

	contentCard: {
		width: '100%',
		flexDirection: 'column',
	},

	handle: {
		width: '60px',
		height: '17px',
		backgroundColor: theme.palette.primary.main,
		marginBottom: '7px',
	},

	date: {
		height: '14px',
		width: '100px',
		backgroundColor: 'rgba(0,0,0,0.3)',
		marginBottom: '20px',
	},
})

function PostSkeleton(props) {
	const { classes } = props

	const content = Array.from({ length: 5 }).map((item, index) => (
		<Card className={classes.card} key={index}>
			<CardMedia className={classes.imageCard} image={NoImg} />
			<CardContent className={classes.contentCard}>
				<div className={classes.handle} />
				<div className={classes.date} />
				<div className={classes.fullLine} />
				<div className={classes.fullLine} />
				<div className={classes.halfLine} />
			</CardContent>
		</Card>
	))

	return <Fragment>{content}</Fragment>
}

PostSkeleton.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostSkeleton)
