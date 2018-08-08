import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';

class SortingDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      week: '',
      month: '',
      year: '',
      twelveLastMonths: moment().subtract(1, 'years').format("YYYY-MM") + '_' +  moment().format("YYYY-MM"),
    }
  }

  componentWillMount() {
    this.setState({
        week: moment().format("YYYY-WW").replace('-', '-W'),
  			month: moment().format("YYYY-MM"),
  			year: moment().format("YYYY"),
    })
    this.props.action(this.state.twelveLastMonths, this.props.loggedIn.token)
	}

  handleChange = event => {
    switch (event.target.type) {
      case 'week':
        this.setState({
          week: event.target.value,
          month: moment().format("YYYY-MM"),
    			year: moment().format("YYYY"),
        })
        break;
      case 'month':
        this.setState({
          week: moment().format("YYYY-WW").replace('-', '-W'),
          month: event.target.value,
          year: moment().format("YYYY"),
        })
        break;
      case 'number':
        this.setState({
          week: moment().format("YYYY-WW").replace('-', '-W'),
          month: moment().format("YYYY-MM"),
          year: event.target.value,
        })
        break;
      case 'button':
        this.setState({
          week: moment().format("YYYY-WW").replace('-', '-W'),
          month: moment().format("YYYY-MM"),
          year: moment().format("YYYY"),
        })
        break;
      default:
        return this.state;
    }
    this.props.action(event.target.value, this.props.loggedIn.token)
	}

  render() {
  	return (
      <div style={{fontSize:'0.6rem'}}>
        <div style={{padding:5}} >
          <label> Trier par semaine : </label>
            <input style={{borderStyle:'1pxsolid',borderRadius:5}} type='week' onClick={this.handleChange} onChange={this.handleChange} value={this.state.week}/>
        </div>
        <div style={{padding:5}}>
          <label>Trier par mois : </label>
  		      <input style={{borderStyle:'1pxsolid',borderRadius:5}}  type='month' onClick={this.handleChange} onChange={this.handleChange} value={this.state.month}/>
        </div>
        <div style={{padding:5}}>
         <label>Trier par année : </label>
           <input style={{borderStyle:'1pxsolid',borderRadius:5}} type="number" step="1" min="2017" max={moment().format("YYYY")} onClick={this.handleChange} onChange={this.handleChange} value={this.state.year}/>
        </div>
        <div style={{padding:5}}>
          <button style={{background:'#478e7f',borderRadius:5,color:'white'}} type="button" onClick={this.handleChange} value={this.state.twelveLastMonths}>Les 12 derniers mois</button>
        </div>
      </div>
  	);
  }
}

const mapStateToProps = state => {
	return {
		loggedIn: state.loggedIn
	}
}

export default connect(mapStateToProps)(SortingDate);
