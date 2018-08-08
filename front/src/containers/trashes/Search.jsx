import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import './search.css';
import { bindActionCreators } from "redux";
import { getIdTrash, getIdUser, setDefaultId } from "../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			suggestions: [],
			serial: {},
		};
	}

	componentDidMount() {
		fetch('/api/serial_number', { headers: { Authorization: 'Bearer ' + this.props.loggedIn.token } })
			.then(res => res.json())
			.then(json => {
				this.setState({serial: json.serial})
			});

	}

	onChange = (event, {newValue, method}) => {
		if(method === 'click') {
			this.handleClick(newValue);
		} else if (newValue === '') {
      this.props.setDefaultId(null);
    }
		this.setState({value:newValue});
	};

	onSuggestionsFetchRequested = ({value}) => {
		this.setState({suggestions: this.getSuggestions(value)});
	};

	onSuggestionsClearRequested = () => {
		this.setState({suggestions: []});
		this.props.setDefaultId(null);
	};

	handleClick(id) {
    this.props.getIdUser(id);
		this.props.getIdTrash(id, this.props.loggedIn.token);
	};

	escapeRegexCharacters = (str) => {
		return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	};

	getSuggestions = (value) => {
		const escapedValue = this.escapeRegexCharacters(value.trim());
		if (escapedValue === '') {
			return [];
		}
		const regex = new RegExp('^' + escapedValue, 'i');
		return this.state.serial.filter(language => regex.test(language));
	};

	getSuggestionValue = (suggestion) => {
		return suggestion;
	};

	renderSuggestion = (suggestion) => {
		return (
			<span>
	                {suggestion}
	            </span>
		);
	};

	render() {
		const {value, suggestions} = this.state;
		const inputProps = {
			placeholder: "Numéro de série",
			value,
			onChange: this.onChange
		};
		return (
			<div>
				<Autosuggest
					suggestions={suggestions}
					onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
					getSuggestionValue={this.getSuggestionValue}
					renderSuggestion={this.renderSuggestion}
					inputProps={inputProps}
          onclick={ this.handleClick }
          />
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    dataFromStore : state.trashes,
    id : state.TrashId,
    loggedIn: state.loggedIn,
		trashSerial: state.trashSerial,
  }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({getIdUser, getIdTrash, setDefaultId}, dispatch);
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Search));
