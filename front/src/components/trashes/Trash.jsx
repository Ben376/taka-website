import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TrashDetails from '../../containers/trashes/trash/TrashDetails';
import TrashUser from '../../containers/trashes/trash/TrashUser';

const styles = {
	root: {
		maxWidth: '100%'
	},
	tab: {
		maxWidth: '100%'
	},
};

class Trash extends React.Component {
  state = {
		value: 0,

	};

  handleChange = (event, value) => {
		this.setState({ value });
  };
	
	render() {
        const { classes } = this.props;
		const { value } = this.state;
		return (
			<div className={classes.root}>
				<AppBar position="static" color="default">
					<Tabs className={classes.tabs} value={value} onChange={this.handleChange} indicatorColor="primary" fullWidth>
						<Tab className={classes.tab} label="Utilisateur" />
						<Tab className={classes.tab} label="Poubelle" />
					</Tabs>
				</AppBar>
				{value === 0 && <div><TrashUser/></div>}
				{value === 1 && <div><TrashDetails /></div>}
			</div>
		);
	}
}

export default withStyles(styles)(Trash);
