import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Grid } from '@material-ui/core'

//Component
import Post from '../components/Post'

function Home() {
	const [state, setState] = useState({
		posts: null,
	})

	useEffect(() => {
		axios
			.get('/posts')
			.then((res) => {
				setState({
					posts: res.data,
				})
			})
			.catch((err) => console.log(err))
	}, [])

	let recentPostsMarkup = state.posts ? (
		state.posts.map((post, key) => <Post post={post} key={key} />)
	) : (
		<p>Loading...</p>
	)

	return (
		<Grid container spacing={8}>
			<Grid item sm={8} xs={12} m={16}>
				{recentPostsMarkup}
			</Grid>
			<Grid item sm={4} xs={12}>
				<p>Profile...</p>
			</Grid>
		</Grid>
	)
}

export default Home
