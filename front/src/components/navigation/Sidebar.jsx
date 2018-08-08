import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import MenuItem from '@material-ui/core/MenuItem';

const styles = {
	navItem: {
		margin:'auto',
		fontSize:'23px',
	},
	navLink: {
		textDecoration:'none',
	}
};

class Sidebar extends React.Component {
	render() {
		const { classes } = this.props;
		const path = window.location.pathname;
		return (
			<div style={{width:'100%'}}>
				<Link to='/admin' className={classes.navLink}>
					<MenuItem variant="raised" className={classes.navItem} color="primary" style={(path === "/admin"? {backgroundColor:'#d1cfcf'} : {backgroundColor:'#f5f5f5'})}>
						<i  style={{color:'#505051'}}className={(" fas fa-home fa-1x ")}/>
						<p style={{marginLeft: '20px',color:'#505051'}}>Accueil</p>
					</MenuItem>
				</Link>
				<Link to='/admin/maintenance' className={classes.navLink}>
					<MenuItem variant="raised" className={classes.navItem} color="primary" style={(path === "/admin/maintenance"? {backgroundColor:'#d1cfcf'} : {backgroundColor:'#f5f5f5'})}>
						<i  style={{color:'#474747'}}className={(" fas fa-wrench fa-1x ")}/>
						<p style={{marginLeft: '20px',color:'#474747'}}>Maintenance</p>
					</MenuItem>
				</Link>
				<Link to='/admin/poubelles' className={classes.navLink}>
					<MenuItem variant="raised" className={classes.navItem} color="primary" style={(path === "/admin/poubelles"? {backgroundColor:'#d1cfcf'} : {backgroundColor:'#f5f5f5'})}>
						<i style={{color:'#474747'}}className={(" fas fa-trash-alt fa-1x ")}/>
						<p style={{marginLeft: '20px',color:'#474747'}}>Poubelles</p>
					</MenuItem>
				</Link>
				<Link to='/admin/statistiques' className={classes.navLink}>
					<MenuItem variant="raised" className={classes.navItem} color="primary" style={(path === "/admin/statistiques"? {backgroundColor:'#d1cfcf'} : {backgroundColor:'#f5f5f5'})}>
						<i  style={{color:'#474747'}} className={(" fas fa-chart-bar fa-1x ")}/>
						<p style={{marginLeft: '20px',color:'#474747'}}>Statistiques</p>
					</MenuItem>
				</Link>
				<Link to='/admin/administrateurs' className={classes.navLink}>
					<MenuItem variant="raised" className={classes.navItem} color="primary" style={(path === "/admin/administrateurs"? {backgroundColor:'#d1cfcf'} : {backgroundColor:'#f5f5f5'})}>
						<i  style={{color:'#474747'}} className={(" fas fa-user-cog fa-1x  ")}/>
						<p style={{marginLeft: '20px',color:'#474747'}}>Administrateurs</p>
					</MenuItem>
				</Link>
			</div>
		);
	}
}

Sidebar.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);


