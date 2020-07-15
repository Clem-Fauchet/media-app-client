import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import MyButton from '../../utility/MyButton'
import AddPost from '../post/AddPost'

//Redux Stuff
import { connect } from 'react-redux'

//Material Ui Stuff
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

//Icons
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined'

const styles = (theme) => ({
	...theme.navBar,
	navButton: {
		margin: '0 1em',
	},
})

function Navbar(props) {
	const { authenticated, classes } = props
	return (
		<div>
			<AppBar>
				<Toolbar className='nav-container'>
					{authenticated ? (
						<>
							<AddPost />

							<MyButton tip='Home' btnClassName={classes.navButton}>
								<Link to='/'>
									<HomeRoundedIcon />
								</Link>
							</MyButton>

							<MyButton tip='Notifications' btnClassName={classes.navButton}>
								<NotificationsNoneOutlinedIcon />
							</MyButton>
						</>
					) : (
						<>
							<Button
								color='inherit'
								component={Link}
								to='/login'
								className={classes.navButton}
							>
								Login
							</Button>
							<Button
								color='inherit'
								component={Link}
								to='/'
								className={classes.navButton}
							>
								Home
							</Button>
							<Button
								color='inherit'
								component={Link}
								to='/signup'
								className={classes.navButton}
							>
								Sign Up
							</Button>
						</>
					)}
				</Toolbar>
			</AppBar>
		</div>
	)
}

Navbar.propTypes = {
	authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated,
})

export default connect(mapStateToProps)(withStyles(styles)(Navbar))
