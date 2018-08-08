import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MenuItem, BottomNavigation } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = {
	root: {
		flexGrow: 1,
		backgroundColor:'#f5f5f5',
		display: 'flex',
		position: 'fixed',
		bottom: 0,
		width: '100%',
		marginTop: '4em'
	},
	navLink: {
		width: '25%',
		backgroundColor: '#f5f5f5',
		textDecoration: 'none',
		margin: 'auto',
		padding: 'auto',
		color: 'blue',
		'&:hover': {
		textDecoration: 'none',
		},
	},
	fontA: {
		margin: 'auto',
		color: 'black'
	}
};

class NavBottom extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<BottomNavigation  style={{zIndex:2}}className={classes.root}>
				<Link showlabel="true" to='/admin' className={classes.navLink}>
					<MenuItem variant="raised" color="primary" className="">
						<i style={{color:'#474747'}} showlabel="Recents" className={classes.fontA.concat(" fas fa-home fa-2x ")}/>
					</MenuItem>
				</Link>
				<Link to='/admin/maintenance' className={classes.navLink}>
					<MenuItem variant="raised" color="primary" className="">
						<i style={{color:'#474747'}} showlabel="Recents" className={classes.fontA.concat(" fas fa-wrench fa-2x ")}/>
					</MenuItem>
				</Link>
				<Link to='/admin/poubelles' className={classes.navLink}>
					<MenuItem variant="raised" color="primary" className="">
						<i style={{color:'#474747'}} showlabel="Recents" className={classes.fontA.concat(" fas fa-trash-alt fa-2x ")}/>
					</MenuItem>
				</Link>
				<Link to='/admin/statistiques' className={classes.navLink}>
					<MenuItem variant="raised" color="primary" className="">
						<i style={{color:'#474747'}} showlabel="Recents" className={classes.fontA.concat(" fas fa-chart-bar fa-2x ")}/>
					</MenuItem>
				</Link>
				<Link to='/admin/administrateurs' className={classes.navLink}>
					<MenuItem variant="raised" color="primary" className="">
						<i style={{color:'#474747'}} showlabel="Recents" className={classes.fontA.concat(" fas fa-user-cog fa-2x ")}/>
					</MenuItem>
				</Link>
			</BottomNavigation>
		);
	}
}

NavBottom.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBottom);
