import React, { Component } from 'react'
import {CSVLink} from 'react-csv';
import { connect } from 'react-redux';
import moment from 'moment';

import '../../components/stats/ExportCSV.css';

class ExportCSV extends Component {
    state={
        fillingRateAtDumping: '',
        fillingRate: '',
        total: '',
        tub: '',  
    }

    componentWillMount() {

        fetch('/api/fillingRateAtDumping', { headers: { Authorization: 'Bearer ' + this.props.loggedIn.token}})
        .then(res => res.json()).then(json => {
            this.setState({fillingRateAtDumping: json.docs})
        });
         fetch('/api/fillingRate', { headers: { Authorization: 'Bearer ' + this.props.loggedIn.token}})
         .then(res => res.json()).then(json => {
            this.setState({fillingRate: json.docs})
        });
        fetch('/api/trashes/count', { headers: { Authorization: 'Bearer ' + this.props.loggedIn.token }})
        .then(res => res.json()).then(res => {
            this.setState({total: res.total})
        });
        fetch(`/api/stats/date/${this.props.data.date}/volumeTubsTrashes`, { headers: { Authorization: 'Bearer ' + this.props.loggedIn.token }})
        .then(res => res.json()).then(res => {
            this.setState({tub: res.docs})
              });
      }


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

/*     String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    } */

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
            const indexMonth = months.indexOf(currentMonth);
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

                if ( serial_number.match(/.*PRO$/) ) {
                    professionals[numberMonth]++;
                } else if ( serial_number.match(/.*PAR$/) ) {
                    privates[numberMonth]++;
                }
            }
        }
    }

    let par = [{TrashBinAddedOrderedByType: 'privates :', January: privates[6], February:privates[7] , March: privates[8], April:privates[9] , May:privates[10] , June:privates[11] , July: privates[0], August:privates[1] ,September:privates[2] , October:privates[3] , November:privates[4] , December: privates[5] }];
    let pro = [{TrashBinAddedOrderedByType: 'professionals :', January: professionals[6], February:professionals[7] , March: professionals[8], April:professionals[9] , May:professionals[10] , June:professionals[11] , July: professionals[0], August:professionals[1] ,September:professionals[2] , October:professionals[3] , November:professionals[4] , December: professionals[5] }];
    let total = [{ TotalNewTrashBinConnected: this.state.total }];
    const data = [...this.state.fillingRateAtDumping, ...this.state.fillingRate, ...total, ...this.state.tub, ...pro, ...par];

    return (
      <div>
          <br/>
          <div className='button-export' >

        <CSVLink
            data = {data}
            filename={"statistiques-completes.csv"}
            className='csv-export'>

            <p className='p-export'>
            Télécharger les statistiques en CSV</p>

        </CSVLink>
        </div>
        <br/>
      </div>
    )
  }
}

const mapStateToProps = state => {
	return {
        loggedIn: state.loggedIn,
        data : state.statsNewConnectedTrashes,
	}
}

export default connect(mapStateToProps)(ExportCSV)
