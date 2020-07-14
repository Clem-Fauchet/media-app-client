import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

//Redux stuff
import { connect } from 'react-redux'
import { getPosts } from '../redux/actions/dataAction'

//Material UI stuff
import { Grid } from '@material-ui/core'

//Component
import Post from '../components/Post'
import Profile from '../components/Profile.js'

function Home(myData) {

	const {data} = myData
	
	useEffect(() =>{
	 myData.getPosts()
	}, [])

	let recentPostsMarkup = !data.loading ? (
		data.posts.map((post, key) => <Post post={post} key={key} />)
	) : (
		<p>Loading...</p>
	)

	return (
		<Grid container spacing={8}>
			<Grid item sm={8} xs={12} m={16}>
				{recentPostsMarkup}
			</Grid>
			<Grid item sm={4} xs={12}>
				<Profile />
			</Grid>
		</Grid>
	)
}

Home.propTypes = {
	getPosts: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	data: state.data,
})

export default connect(mapStateToProps, { getPosts })(Home)
