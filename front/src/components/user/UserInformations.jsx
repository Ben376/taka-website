import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PermIdentity from '@material-ui/icons/PermIdentity';
import MailOutline from '@material-ui/icons/MailOutline';
import Storage from '@material-ui/icons/Storage';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Add from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import {TextField} from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/fr';

const styles = theme => ({
	root: {
		width: '100%',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
	icon: {
		verticalAlign: 'bottom',
		height: 20,
		width: 20,
	},
	details: {
		alignItems: 'center',
	},
	column: {
		flexBasis: '50%',
	},
	helper: {
		borderLeft: `2px solid ${theme.palette.divider}`,
		padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
	},
	button: {
		backgroundColor: '#478e7f',
		margin: '1rem',
		float: 'right',
	},
	avatar: {
		backgroundColor: '#f5f5f5',
		color:'#474747'

	},
	link: {
		color: theme.palette.primary.main,
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
});

const userInformations = (props) => {
	const {classes, newSerial, message, firstname, lastname, email, createdAt, address_diffusion, address, zip_code, city, permission} = props;
	return (
		<div>
			<ExpansionPanel>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
					<div className={classes.column}>
						<Avatar className={classes.avatar}>
							<PermIdentity/>
						</Avatar>
					</div>
					<div className={classes.column}>
						<Typography className={classes.heading}>Identifiants</Typography>
					</div>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails className={classes.details}>
					<div className={classes.column}>
						<Typography>
							{firstname}
						</Typography>
						<Typography variant="caption">
							Prénom
						</Typography>
						<Typography>
							{lastname}
						</Typography>
						<Typography variant="caption">
							Nom
						</Typography>
					</div>
					<div className={classes.column}>
						<Typography>
							{email}
						</Typography>
						<Typography variant="caption">
							Adresse mail
						</Typography>
					</div>
				</ExpansionPanelDetails>
			</ExpansionPanel>
			<ExpansionPanel>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
					<div className={classes.column}>
						<Avatar className={classes.avatar}>
							<Storage/>
						</Avatar>
					</div>
					<div className={classes.column}>
						<Typography className={classes.heading}>Informations</Typography>
					</div>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<div className={classes.column}>
						<Typography>
							{address_diffusion ? 'Autorisé' : 'Refusé'}
						</Typography>
						<Typography variant="caption">
							Utilisation de votre adresse à des fins statistiques
						</Typography>
						<Typography>
							{permission}
						</Typography>
						<Typography variant="caption">
							Fonction
						</Typography>
					</div>
					<div className={classes.column}>
						<Typography>
							{moment(createdAt).format("DD-MM-YYYY")}
						</Typography>
						<Typography variant="caption">
							Date de création
						</Typography>
					</div>
				</ExpansionPanelDetails>
			</ExpansionPanel>
			<ExpansionPanel>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
					<div className={classes.column}>
						<Avatar className={classes.avatar}>
							<MailOutline/>
						</Avatar>
					</div>
					<div className={classes.column}>
						<Typography className={classes.heading}>Coordonnées</Typography>
					</div>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<div className={classes.column}>
						<Typography>
							{address}
						</Typography>
						<Typography variant="caption">
							Adresse
						</Typography>
						<Typography>
							{zip_code}
						</Typography>
						<Typography variant="caption">
							Code postal
						</Typography>
					</div>
					<div className={classes.column}>
						<Typography>
							{city}
						</Typography>
						<Typography variant="caption">
							Ville
						</Typography>
					</div>
				</ExpansionPanelDetails>
			</ExpansionPanel>
			<ExpansionPanel>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
					<div className={classes.column}>
						<Avatar className={classes.avatar}>
							<Delete/>
						</Avatar>
					</div>
					<div className={classes.column}>
						<Typography className={classes.heading}>Nouvelle poubelle</Typography>
						<Typography className={classes.heading} color='error'>{message}</Typography>
					</div>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<TextField
						name='newSerial'
						label='Numéro de série'
						placeholder='Entrez le numéro de série de votre nouvelle poubelle'
						className={classes.textField}
						fullWidth
						margin="normal"
						onChange={props.isSerialValid}
						value={newSerial}
					/>
					<div>
						<Button disabled={!props.validSerial} variant="fab" aria-label="edit" className={classes.button}
						        onClick={props.addSerial}>
							<Icon><Add/></Icon>
						</Button>
					</div>
				</ExpansionPanelDetails>
			</ExpansionPanel>
			<div>
				<Button variant="fab" aria-label="edit" className={classes.button} onClick={props.modifyToggler}>
					<Icon><Edit/></Icon>
				</Button>
			</div>
		</div>
	);
}

userInformations.defaultProps = {
	firstname: 'firstname',
	lastname: 'lastname',
	username: 'username',
	about: 'about me',
	email: 'email',
	password: 'crypted in database',
	last_login: 'today',
	status: 'active',
	createAt: 'today',
	updateAt: 'today',
	adress: 'here',
	zip_code: '33000',
	city: 'bordeaux',
	permission: 'user',
};

export default withStyles(styles)(userInformations);
