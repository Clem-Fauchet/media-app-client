import {
	SET_USER,
	//SET_ERRORS,
	//CLEAR_ERRORS,
	LOADING_USER,
	SET_AUTHENTICATED,
	SET_UNAUTHENTICATED,
	LIKE_POST,
	UNLIKE_POST,
	MARK_NOTIFICATIONS_READ,
} from '../types'

const initialState = {
	authenticated: false,
	loading: false,
	credentials: {},
	likes: [],
	notifications: [],
}

export default function (state = initialState, action) {
	switch (
		action.type //depending on action type we do something
	) {
		case SET_AUTHENTICATED:
			return {
				...state,
				authenticated: true,
			}

		case SET_UNAUTHENTICATED:
			return initialState

		case SET_USER:
			return {
				authenticated: true,
				loading: false,
				...action.payload,
			}

		case LOADING_USER:
			return {
				...state,
				loading: true,
			}

		case LIKE_POST:
			return {
				...state,
				likes: [
					...state.likes,
					{
						userHandle: state.credentials.handle,
						postId: action.payload.postId,
					},
				],
			}

		case UNLIKE_POST:
			return {
				...state,
				likes: state.likes.filter(
					(like) => like.postId !== action.payload.postId
				),
			}

		case MARK_NOTIFICATIONS_READ:
			state.notifications.forEach((notification) => (notification.read = true))
			return {
				...state,
			}

		default:
			return state
	}
}
