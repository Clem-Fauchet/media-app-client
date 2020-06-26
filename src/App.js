import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import themeFile from './utility/theme'
import jwtDecode from 'jwt-decode' //library decoding json token

//Components
import NavBar from './components/Navbar'
import AuthRoute from './utility/AuthRoute'

//Pages
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

const theme = createMuiTheme(themeFile)

let authenticated
const token = localStorage.FBIdToken
if (token) {
	const decodedToken = jwtDecode(token)
	if (decodedToken.exp * 1000 < Date.now()) {
		window.location.href = '/login'
		authenticated = false
	} else {
		authenticated = true
	}
}

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<div className='App'>
				<Router>
					<NavBar />
					<div className='container'>
						<Switch>
							<Route exact path='/' component={Home} />
							<AuthRoute
								exact
								path='/login'
								component={Login}
								authenticated={authenticated}
							/>
							<AuthRoute
								exact
								path='/signup'
								component={SignUp}
								authenticated={authenticated}
							/>
						</Switch>
					</div>
				</Router>
			</div>
		</MuiThemeProvider>
	)
}

export default App
