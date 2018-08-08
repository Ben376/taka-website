import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Bar} from 'react-chartjs-2';
import moment from 'moment';
import 'moment/locale/fr';
import SortingDate from './SortingDate';
import {getNewConnectedTrashes} from '../../actions/index';
import {bindActionCreators} from 'redux';

class NewConnectedTrashes extends Component {

	render() {
		let arrayData = this.props.data.data;
		let numberLabels = this.props.data.labels;
		let twelveLastMonths = this.props.data.twelveLastMonths;
		let date = this.props.data.date;

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

		if (numberLabels === 7) {
			const days = moment.weekdays(true);
			for(let i = 0; i < numberLabels; i++) {
				labels.push(days[i].capitalize())
			}

			for(let j = 0; j < arrayData.length; j++) {
				let day = moment(arrayData[j].realeased).day()-1;
				let serial_number = arrayData[j].serial_number;

				if ( serial_number.match(/.*PRO$/) ) {
					professionals[day]++;
				} else if ( serial_number.match(/.*PAR$/) ) {
					privates[day]++;
				}
			}
		} else if (numberLabels >= 28 && numberLabels <= 31) {
			for(let i = 0; i < numberLabels; i++) {
				labels.push(i+1);
			}
			for(let j = 0; j < arrayData.length; j++) {
				let numberDay = moment(arrayData[j].realeased).date()-1;
				let serial_number = arrayData[j].serial_number;

				if ( serial_number.match(/.*PRO$/) ) {
					professionals[numberDay]++;
				} else if ( serial_number.match(/.*PAR$/) ) {
					privates[numberDay]++;
				}
			}
		} else if (numberLabels === 12) {
			const months = moment.months(true);

			if (twelveLastMonths === true) {
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
			} else {
				for(let i = 0; i < numberLabels; i++) {
					labels.push(months[i].capitalize())
				}

				for(let j = 0; j < arrayData.length; j++) {
					let firstConnection = moment(arrayData[j].realeased);
					let numberMonth = firstConnection.diff(new Date(moment(date + '-01')), 'months');
					let serial_number = arrayData[j].serial_number;

					if ( serial_number && serial_number.match(/.*PRO$/) ) {
						professionals[numberMonth]++;
					} else if ( serial_number && serial_number.match(/.*PAR$/) ) {
						privates[numberMonth]++;
					}
				}
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
			<div>
				<SortingDate action={this.props.getNewConnectedTrashes} />
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
			</div>
		);
	}
}

function mapStateToProps(state) {
		return {
			data : state.statsNewConnectedTrashes,
		}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({getNewConnectedTrashes}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(NewConnectedTrashes);
