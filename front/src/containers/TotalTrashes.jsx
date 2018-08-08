import React, {Component} from 'react';
import {connect} from 'react-redux';
import './TotalTrashes.css';

class TotalTrashes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			total: 0,
		}
	}
	
	componentDidMount() {
		fetch('/api/trashes/count', {headers: {Authorization: 'Bearer ' + this.props.loggedIn.token}})
			.then(res => res.json())
			.then(res => {
					this.setState({
						total: res.total,
					})
				},
				err => console.log(err)
			);
	}
	
	render() {
		return (
			<div className='TotalTrashes'>
				<i className='fas fa-trash-alt'/>
				<br/>
				<span>{this.state.total}</span>
				<br/>
				<p style={{margin:0}}>poubelles</p>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loggedIn: state.loggedIn
	}
};

export default connect(mapStateToProps)(TotalTrashes);
