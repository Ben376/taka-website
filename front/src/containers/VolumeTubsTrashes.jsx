import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import moment from 'moment';
import {bindActionCreators} from 'redux';
import {getVolumeTubsTrashes} from '../actions/index';
import CardVolumeTrash from '../components/home/CardVolumeTrash.jsx';

import bottle from '../images/volumeTubsTrashes/bottle.svg';
import conserve from '../images/volumeTubsTrashes/conserve.svg';
import plastic from '../images/volumeTubsTrashes/plastic.svg';

const styles ={
	root: {
		flexGrow: 1,
	},
};

class VolumeTubsTrashes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			twelveLastMonths : moment().subtract(1, 'years').format("YYYY-MM") + '_' +  moment().format("YYYY-MM"),
			metrics: [
				{name: 'glass', value: 0, image: bottle},
				{name: 'plastic', value: 0, image: conserve},
				{name: 'metal', value: 0, image: plastic}
			],
			message: '',
		};
	}

	componentWillMount() {
		this.props.getVolumeTubsTrashes(this.state.twelveLastMonths, this.props.loggedIn.token)
	}

	componentWillReceiveProps(nextprops) {
        if(nextprops.data.docs) {
            this.setState({
				metrics: [
					{name: 'glass', value: nextprops.data.docs[0].totalAmountGlass, image: bottle},
					{name: 'plastic', value: nextprops.data.docs[0].totalAmountPlastic, image: conserve},
					{name: 'metal', value: nextprops.data.docs[0].totalAmountMetal, image: plastic}
				],
			})
        }
    }

	render() {
		const {classes} = this.props;
		return (
			<div className={classes.root}>
				<Grid container spacing={24}>
					{
						this.state.metrics.map((metric, i) =>
							<Grid key={i} item xs={12} sm={4}>
								<CardVolumeTrash style={{height: '36vh'}} image={metric.image} value={metric.value}/>
							</Grid>
						)
					}
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		data : state.statsVolumeTubsTrashes,
		loggedIn: state.loggedIn
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({getVolumeTubsTrashes}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VolumeTubsTrashes));
