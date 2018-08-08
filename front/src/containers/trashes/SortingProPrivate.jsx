import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTrashes, sortTrashesBy} from '../../actions/index';
import './SortingProPrivate.css';

class SortingProPrivate extends React.Component {
	state = {
		status: '',
	};
	
	handleChange = event => {
		this.setState({status: event.target.value});
		if (event.target.value === "") {
			this.props.getTrashes(this.props.loggedIn.token);
		}
		if (event.target.value !== "") {
			this.props.sortTrashesBy(event.target.value, this.props.loggedIn.token);
		}
	};
	
	render() {
		return (
			<form className='form' autoComplete="off">
				<FormControl className='formControl'>
					<InputLabel htmlFor="Status">Pros / Particuliers</InputLabel>
					<Select value={this.state.status} onChange={this.handleChange} input={<Input name="status" id="Status"/>}>
						<MenuItem value="">
							<em>Aucun</em>
						</MenuItem>
						<MenuItem value='professionals'>Professionnels</MenuItem>
						<MenuItem value='privates'>Particuliers</MenuItem>
					</Select>
					<FormHelperText>Trier par professionnels ou particuliers</FormHelperText>
				</FormControl>
			</form>
		);
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({getTrashes, sortTrashesBy}, dispatch);
}

const mapStateToProps = state => {
	return {
		loggedIn: state.loggedIn
	}
}

export default connect(mapStateToProps, matchDispatchToProps)(SortingProPrivate);