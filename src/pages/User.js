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
		postIdParam: null,
	})

	const { postIdParam } = state
	const { posts, loading } = myData.data

	useEffect(() => {
		const handle = myData.match.params.handle
		const postId = myData.match.params.postId
		myData.getUserData(handle)

		if (postId) setState({ ...state, postIdParam: postId })

		axios
			.get(`/user/${handle}`)
			.then((res) => {
				setState({ profile: res.data.user })
			})
			.catch((err) => console.error(err))
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	let postsMarkup = loading ? (
		<p>Loading data....</p>
	) : posts === null ? (
		<p>No posts from this user</p>
	) : !postIdParam ? (
		posts.map((post) => <Post post={post} key={post.postId} />)
	) : (
		posts.map((post) => {
			if (post.postId !== postIdParam)
				return <Post post={post} key={post.postId} />
			else return <Post post={post} key={post.postId} openDialog />
		})
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
