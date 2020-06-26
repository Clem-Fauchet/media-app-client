import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import themeFile from './utility/theme'

//Components
import NavBar from './components/Navbar'

//Pages
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

const theme = createMuiTheme(themeFile)

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<div className='App'>
				<Router>
					<NavBar />
					<div className='container'>
						<Switch>
							<Route exact path='/' component={Home} />
							<Route exact path='/login' component={Login} />
							<Route exact path='/signup' component={SignUp} />
						</Switch>
					</div>
				</Router>
			</div>
		</MuiThemeProvider>
	)
}

export default App
