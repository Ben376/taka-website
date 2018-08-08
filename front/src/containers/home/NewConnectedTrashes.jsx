import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import 'moment/locale/fr';
import {getNewConnectedTrashes} from '../../actions/index';
import {bindActionCreators} from 'redux';

class NewConnectedTrashes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			twelveLastMonths : moment().subtract(1, 'years').format("YYYY-MM") + '_' +  moment().format("YYYY-MM"),
			arrayData: [],
			numberLabels: 0,
		}
	}

	componentWillMount() {
		this.props.getNewConnectedTrashes(this.state.twelveLastMonths, this.props.loggedIn.token)
	}

	componentWillReceiveProps(nextprops) {
        if(nextprops.data.data) {
            this.setState({
							arrayData: nextprops.data.data,
							numberLabels: nextprops.data.labels,
						})
        }
    }

	render() {
		let arrayData = this.state.arrayData;
		let numberLabels = this.state.numberLabels;
		let currentDate = new Date();
		let labels = [];
		let professionals = [];
		let privates = [];
		const fr = moment().locale('fr');

		/*eslint no-extend-native: ["error", { "exceptions": ["String"] }]*/
		String.prototype.capitalize = function() {
		    return this.charAt(0).toUpperCase() + this.slice(1);
		}

		for(let i = 0; i < numberLabels; i++) {
			professionals.push(0);
			privates.push(0);
		}

		const months = moment.months(true);
		const currentMonth = fr.localeData().months(moment(currentDate));
		const indexMonth = months.indexOf(currentMonth)+1;
		for (let i = indexMonth; i < months.length; i++) {
			labels.push(months[i].capitalize())
		}
		for (let i = 0; i < indexMonth; i++) {
			labels.push(months[i].capitalize())
		}

		for(let j = 0; j < arrayData.length; j++) {
			let firstConnection = moment(arrayData[j].realeased);
			let numberMonth = firstConnection.diff(currentDate, 'months')-1;
			let serial_number = arrayData[j].serial_number;
			if ( serial_number && serial_number.match(/.*PRO$/) ) {
				professionals[12 + numberMonth]++;
			} else if ( serial_number && serial_number.match(/.*PAR$/) ) {
				privates[12 + numberMonth]++;
			}
		}

		const data = {
			labels:  labels,
			datasets: [
				{
					label: 'Professionnels',
					backgroundColor: 'rgba(29,150,131,1)',
					hoverBackgroundColor: 'rgba(29,150,131,0.8)',
					data: professionals,
				},
				{
					label: 'Particuliers',
					backgroundColor: 'rgba(87,88,90,1)',
					hoverBackgroundColor: 'rgba(87,88,90,0.8)',
					data: privates,
				}
			]
		};

		return (
			<Bar
				data={data}
				width={100}
				height={50}
				options={{
					maintainAspectRatio: true,
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}}
			/>
		);
	}
}

const mapStateToProps = state => ({
	data : state.statsNewConnectedTrashes,
  user: state.user,
  loggedIn: state.loggedIn,
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({getNewConnectedTrashes}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewConnectedTrashes);
