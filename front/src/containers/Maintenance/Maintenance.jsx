import React from "react";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import "react-table/react-table.css";
import MaintenanceGenerale from './MaintenanceGenerale';
import TrashesOffline from './TrashesOffline';
import Trash from '../../components/trashes/Trash'
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {setDefaultId} from "../../actions/index";
import Typography from '@material-ui/core/Typography';


const styles = {
	root: {
		maxWidth: '100%'
	},
	component: {
		display: 'block',
		margin: 'auto'
	},
	tab: {
		maxWidth: '100%'
	},
};

class Maintenance extends React.Component {
	state = {
		id:null,
		message: ''
	};


	componentWillUnmount() {
		this.props.setDefaultId(null)
	}

	render() {
		return (
			<div style={{textAlign:'center'}}>
				<h1 style={{borderStyle:'solid',borderRadius:5,color:'#474747'}}>MAINTENANCE</h1>
				<Typography style={{fontWeight: 700,color:'#474747'}} variant="headline" gutterBottom>
					Maintenance générale 
				</Typography>
				<MaintenanceGenerale />
				<Grid item xs={12}>
					{
						(this.props.id)
							?
							<div>
								<Trash />
							</div>
							:
							<div></div>
					}
				</Grid>
				<Typography style={{ paddingTop:'10px',fontWeight: 700,color:'#474747'}} variant="headline" gutterBottom>
					Poubelles déconnectées depuis plus d'un mois 
				</Typography>
				<TrashesOffline />
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		dataFromStore: state.trashes,
		id: state.TrashId,
		loggedIn: state.loggedIn
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({setDefaultId}, dispatch);
}

Maintenance.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Maintenance));
