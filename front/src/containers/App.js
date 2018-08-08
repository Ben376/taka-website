 import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import Admin from '../components/admin/Admin';
import User from './user/User';
import LoginSignUpUser from "./LoginSignUpUser";

import { connect } from "react-redux";
import { history } from "../index";


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: false,
			admin: false,
			user: false,
			payload: {}
		}
  }

	componentDidMount() {
    const token = localStorage.getItem('redux');
		if(token) {
			this.setState({ token:true, payload: this.parseJwt() });
		} else {
			history.push('/')
		}
	}

	componentWillReceiveProps(nextProps) {
			if (nextProps.loggedIn.loggedIn) {
				this.setState({ admin: nextProps.loggedIn.loggedIn, payload: this.parseJwt() });
			} else {
				this.setState({ admin: false });
			}
		}

	parseJwt() {
		const tokenFromStorage = JSON.parse(localStorage.getItem('redux'));
		if (tokenFromStorage.loggedIn.token) {
			const base64Payload = JSON.stringify(tokenFromStorage).split('.')[1];
			return JSON.parse(window.atob(base64Payload));
		} else {
			return 'no token to parse'
		}
	}

	render() {
		if (!this.props.loggedIn.loggedIn) {
			return (
				<div className='Taka'>
          {history.location.pathname !== '/' && <Redirect to='/'/>}
					<Route exact path='/' component={LoginSignUpUser}/>
				</div>
			);
		} else {
			if (this.state.payload.permission === "administrateur") {
				return (
					<div className='Taka'>
            {(/\/admin/gi).test(history.location.pathname) || <Redirect to='/admin'/>}
            <Route path='/admin' component={Admin} />
					</div>
				);
			} else if (this.state.payload.permission !== "administrateur" && this.state.payload.permission) {
				return (
					<div className='Taka'>
            {(/\/utilisateur/gi).test(history.location.pathname) || <Redirect to='/utilisateur'/>}
            <Route path='/utilisateur' component={User} />
					</div>
				);
			} else {
        return (
					<div className='Taka'>
					</div>
				);
      }
		}
	}
}

const mapStateToProps = state => {
	return {
		loggedIn: state.loggedIn
	}
};

export default withRouter(connect(mapStateToProps)(App));
