import React from 'react';
//import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {history} from "../../index";
import {withStyles} from '@material-ui/core/styles';

const styles = {
	cards: {
		width: "auto",
		padding: 3,
		'&:hover': {
			cursor: 'pointer'
		}
	}
}

class WarningCard extends React.Component {
	
	redirectMaintenance() {
		history.push('/admin/maintenance');
	}
	
	render() {
		const {line, src, type, style} = this.props;
		const cardStyle = { ...this.props.style.card};
		const { classes } = this.props;
		return (
			<div>
				<Card style={cardStyle} onClick={this.redirectMaintenance.bind(this)} className={classes.cards}>
					<Avatar alt="alerte" src={src} style={style.avatar}>
					</Avatar>
					<Typography style={style.text} component="p">
						{line} {line > 1 ? "Poubelles" : "Poubelle"}
						<br/>
						{type}
					</Typography>
				</Card>
			</div>
		);
	}
}

export default withStyles(styles)(WarningCard);
