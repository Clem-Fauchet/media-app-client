import {
	SET_USER,
	SET_ERRORS,
	CLEAR_ERRORS,
	LOADING_USER,
	LOADING_UI,
	SET_UNAUTHENTICATED,
} from '../types'

import axios from 'axios'

const setAuthorizationHeader = (token) => {
	const FBIdToken = `Bearer ${token}`
	localStorage.setItem('FBIdToken', FBIdToken)
	axios.defaults.headers.common['Authorization'] = FBIdToken
}

export const loginUser = (userData, history) => (dispatch) => {
	dispatch({ type: LOADING_UI })
	axios
		.post('/login', userData)
		.then((res) => {
			setAuthorizationHeader(res.data.token)
			dispatch(getUserData())
			dispatch({ type: CLEAR_ERRORS })

			history.push('/')
		})
		.catch((err) => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			})
		})
}

export const signUpUser = (newUserData, history) => (dispatch) => {
	dispatch({ type: LOADING_UI })
	axios
		.post('/signup', newUserData)
		.then((res) => {
			setAuthorizationHeader(res.data.token)
			dispatch(getUserData())
			dispatch({ type: CLEAR_ERRORS })

			history.push('/')
		})
		.catch((err) => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			})
		})
}

export const logOutUser = () => (dispatch) => {
	localStorage.removeItem('FBIdToken')
	delete axios.defaults.headers.common['Authorization']
	dispatch({ type: SET_UNAUTHENTICATED }) //clear out user state
}

export const getUserData = () => (dispatch) => {
	dispatch({ type: LOADING_USER })
	axios
		.get('./user')
		.then((res) => {
			dispatch({
				type: SET_USER,
				payload: res.data,
			})
		})
		.catch((err) => console.log(err))
}

export const uploadImage = (formData) => (dispatch) => {
	dispatch({ type: LOADING_USER })
	axios
		.post('/user/image', formData)
		.then(() => {
			dispatch(getUserData())
		})
		.catch((err) => console.log(err))
}

export const editUserDetails = (userDetails) => (dispatch) => {
	dispatch({ type: LOADING_USER })
	axios
		.post('/user', userDetails)
		.then(() => {
			dispatch(getUserData())
		})
		.catch((err) => console.log(err))
}
