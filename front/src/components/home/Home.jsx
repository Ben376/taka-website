/*
	IMPORT REACT
*/

import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*
	IMPORT MATERIAL
*/

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

/*
	IMPORT COMPOSANTS
*/
import Warning from '../../containers/home/Warning';
import Map from './Map';
import NewConnectedTrashes from '../../containers/home/NewConnectedTrashes';
import VolumeTubsTrashes from '../../containers/VolumeTubsTrashes';
import TotalTrashes from '../../containers/TotalTrashes';

/*
	CONTENT
*/


const styles = {
	root: {
		flexGrow: 1,
	},
};

class Home extends Component {
	render() {
		const { classes } = this.props;
		return(
			<div>
				<Grid container spacing={24} style={{marginBottom: 20}}>
					<Grid item xs={12} sm={7} >
						<Paper className={classes.Paper} elevation={0}
							style={{paddingBottom: 20}}>
							<Warning/>
						</Paper>
						
						<Paper style={{paddingTop:50}}>
							<NewConnectedTrashes className={classes.trashes}/>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={5}>
						<Paper style={{height: '100%'}}>
							<Map />
						</Paper>
					</Grid>
					<Grid style={{marginBottom: 20}}item xs={12} sm={3}>
							<TotalTrashes />
					</Grid>
					<Grid style={{marginBottom: 20}}item xs={12} sm={9} >
							<VolumeTubsTrashes />
					</Grid>
				</Grid>
			</div>
		)
	}
}

Home.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
