import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'
import axios from 'axios'

import * as jwtDecode from 'jwt-decode' //library decoding json token

//Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { logOutUser, getUserData } from './redux/actions/userAction'

//Material UI stuff
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'

import themeFile from './utility/theme'

//Components
import NavBar from './components/layout/Navbar'
import AuthRoute from './utility/AuthRoute'

//Pages
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import User from './pages/User'

let theme = createMuiTheme(themeFile)
theme = responsiveFontSizes(theme)

const token = localStorage.FBIdToken
if (token) {
	const decodedToken = jwtDecode(token)
	if (decodedToken.exp * 1000 < Date.now()) {
		store.dispatch(logOutUser())
		window.location.href = '/login'
	} else {
		store.dispatch({ type: SET_AUTHENTICATED })
		axios.defaults.headers.common['Authorization'] = token
		store.dispatch(getUserData())
	}
}

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>
				<div className='App'>
					<Router>
						<NavBar />
						<div className='container'>
							<Switch>
								<Route exact path='/' component={Home} />
								<AuthRoute exact path='/login' component={Login} />
								<AuthRoute exact path='/signup' component={SignUp} />
								<Route exact path='/users/:handle' component={User} />
								<Route
									exact
									path='/users/:handle/post/:postId'
									component={User}
								/>
							</Switch>
						</div>
					</Router>
				</div>
			</Provider>
		</MuiThemeProvider>
	)
}

export default App
