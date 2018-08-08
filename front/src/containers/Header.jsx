import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import logo from '../images/taka.svg';
import {history} from "../index";
import {checkout} from "../actions";

const styles = {
	root: {
		flexGrow: 1,
	},
	media: {
		height: 0,
		paddingTop: '56.25%'
	},
	marginAuto: {
		margin:"auto"
	},
	img: {
		width:'175px',
		padding:'10px'
	},
	button: {
		display: 'block',
		margin: 'auto'
	}
};

class Header extends React.Component {
	
	logOut() {
		localStorage.clear();
		this.props.checkout();
		history.push('/');
	}
	
	render() {
		const { classes } = this.props;
		return (
			<div  className={classes.root}>
				<AppBar position="static" color="default">
					<Toolbar>
						<Grid container>
							<Grid item xs={6} sm={3} className={classes.marginAuto}>
								<Typography variant="title" color="inherit">
									<img src={logo} alt="Logo Taka" className={classes.img}/>
								</Typography>
							</Grid>
							<Grid item xs={12} sm={3} className={classes.marginAuto}>
								<Grid container>
									<Grid item xs className={classes.marginAuto} style={{alignItems:'center'}}>
									</Grid>
									<Grid item xs>
									</Grid>
								</Grid>
							</Grid>

							<Grid item xs={12} sm={3} className={classes.marginAuto + ' searchBar'}>
							</Grid>
							<Grid item xs={12} sm={3} className={classes.marginAuto}>
								<Button className={classes.button} variant="contained" color="secondary" onClick={this.logOut.bind(this)}>Déconnexion</Button>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({checkout}, dispatch);
}

export default connect(null,mapDispatchToProps)(withStyles(styles)(Header));
