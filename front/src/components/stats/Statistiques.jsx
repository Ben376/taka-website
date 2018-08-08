import React, { Component } from 'react';

import TotalTrashes from '../../containers/TotalTrashes';
import NewConnectedTrashes from '../../containers/stats/NewConnectedTrashes';
import VolumeTubsTrashes from '../../containers/stats/VolumeTubsTrashes';
import FillingRate from '../../containers/stats/FillingRate';
import FillingRateAtDumping from '../../containers/stats/FillingRateAtDumping';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExportCSV from '../../containers/stats/ExportCSV';

const styles = {
	root: {
		flexGrow: 1,
	},
};


class Statistiques extends Component {
	render() {
		return (
			<div style={{ textAlign: 'center' }}>
				<h1 style={{ borderStyle: 'solid', borderRadius: 5,color:'#474747' }}>STATISTIQUES</h1>

				<Grid container spacing={24} style={{ marginBottom: 20 }}>
					<Grid item xs={12} sm={7} >
						<ExportCSV />
						<Paper style={{marginBottom:'10px'}}>
							<TotalTrashes  />
						</Paper>
						<Paper>
							<Typography style={{fontWeight: 700,color:'#474747'}} variant="headline" gutterBottom>
							Nouvelles poubelles connectées
							</Typography>
							<NewConnectedTrashes />
						</Paper>
					</Grid>
					<Grid item xs={12} sm={5}>
						<Paper style={{height:'100%'}}>
							<FillingRate />
							<FillingRateAtDumping />
						</Paper>
					</Grid>
				</Grid>
				<Grid container spacing={24} style={{ marginBottom: 20 }}>

					<Grid item xs={12} sm={12}>
						<Paper style={{marginBottom: '20px'}}>
							<Typography style={{fontWeight: 700,color:'#474747'}} variant="headline" gutterBottom>
							Volume total de déchets traités
							</Typography>
							<VolumeTubsTrashes />
						</Paper>
					</Grid>
				</Grid>

			</div>
		)
	}
}

export default withStyles(styles)(Statistiques);
