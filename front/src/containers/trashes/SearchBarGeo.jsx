import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { bindActionCreators } from "redux";
import { getIdTrash, getIdUser, getSugg, setDefaultId } from "../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class SearchBarGeo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: [],
            sugg: [],
            zipcode: [],
            cities: []

        };
    }

    componentWillMount() {
        fetch('/sql/geo')
            .then(res => res.json())
            .then(json => {
                let arr = json.map(j => j.zip_code?j.zip_code.toString():"");

                this.setState({ zipcode: arr })
            });

        fetch('/sql/city')
            .then(res => res.json())
            .then(json => {
                let arr = json.map(j => j.city || "");
                this.setState({ cities: arr })
            });
    }

    onChange = (event, { newValue, method }) => {
      if(method === 'click') {
        this.handleClick(newValue);
      } else if (event.target.value === '') {
        this.props.setDefaultId(null);
        this.props.getSugg(event.target.value)
      }
        this.setState({ value: newValue })
    };

    handleClick(value) {
        this.props.getSugg(value);
    };
    handleKeyPress = (e) => {
        if (e.key === 'Enter')
            this.handleClick(e.currentTarget.value)
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({ suggestions: this.getSuggestions(value) });
    };

    onSuggestionsClearRequested = () => {
        this.setState({ suggestions: [] });
    };

    getSuggestions = (value) => {
        if (value.match(/[0-9]/))
            return this.state.zipcode.filter(zip => zip.match(new RegExp('^'+value)))
        else
        // eslint-disable-next-line
            return this.state.cities.filter(city => city.match(new RegExp("^"+value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"),"i")))

    }

    getSuggestionValue = (suggestion) => {
        return suggestion;
    }

    renderSuggestion = (suggestion) => {
        return (
            <span>
                {suggestion}
            </span>
        );


    };

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "Code postal ou Ville",
            value,
            onChange: this.onChange,
            onKeyPress: this.handleKeyPress
        };
        return (
            <div>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps} />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getIdUser, getIdTrash, getSugg, setDefaultId }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(SearchBarGeo));
