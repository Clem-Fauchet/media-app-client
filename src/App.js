import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'

//Components
import NavBar from './components/Navbar'

//Pages
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

function App() {
	return (
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
	)
}

export default App
