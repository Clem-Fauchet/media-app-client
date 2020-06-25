import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

//Components
import NavBar from './components/Navbar'

//Pages
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#B33771',
			contrastText: '#FFF',
		},
		secondary: {
			main: '#6F1E51',
			contrastText: '#7A7A7A',
		},
		typography: {
			useNextVariants: true,
		},
	},
})

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
