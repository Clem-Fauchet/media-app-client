import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

//Redux stuff
import { connect } from 'react-redux'
import { getUserData } from '../redux/actions/dataAction'

//Material Ui stuff
import { Grid } from '@material-ui/core'

//Component
import Post from '../components/post/Post'
import StaticProfile from '../components/profile/StaticProfile'

function User(myData) {
	const [state, setState] = useState({
		profile: null,
	})

	const { data } = myData

	useEffect(() => {
		const handle = myData.match.params.handle
		myData.getUserData(handle)

		axios
			.get(`/user/${handle}`)
			.then((res) => {
				setState({ profile: res.data.user })
			})
			.catch((err) => console.error(err))
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	let postsMarkup = data.loading ? (
		<p>Loading data....</p>
	) : data.posts === null ? (
		<p>No posts from this user</p>
	) : (
		data.posts.map((post) => <Post post={post} key={post.postId} />)
	)

	return (
		<Grid container spacing={8}>
			<Grid item sm={8} xs={12} m={16}>
				{postsMarkup}
			</Grid>
			<Grid item sm={4} xs={12}>
				{state.profile === null ? (
					<p>Loading profile...</p>
				) : (
					<StaticProfile profile={state.profile} />
				)}
			</Grid>
		</Grid>
	)
}

const mapStateToProps = (state) => ({
	data: state.data,
})

User.propTypes = {
	getUserData: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { getUserData })(User)
