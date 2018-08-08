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
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Send from '@material-ui/icons/Send';
import Undo from '@material-ui/icons/Undo';
import VpnKey from '@material-ui/icons/VpnKey';
import Select from '@material-ui/core/Select';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

// import PropTypes from 'prop-types';

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

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
		backgroundColor: '#58b0a1',
		margin: '1rem',
		float: 'right',
	},
	center: {
		justifyContent: 'center',
		padding: '1rem',
	},
	avatar: {
		backgroundColor: '#f5f5f5',
		color:'#474747'
	},
	right: {
		margin: '1rem',
		float: 'right',
	},
	link: {
		color: theme.palette.primary.main,
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
});

const ModifyUser = (props) => {
	
	const {open, openDeleteDialog, classes, firstname, lastname, email, createdAt, address_diffusion, address, zip_code, city, permission, password, password1, password2, passwordStrengh, samePassword} = props;
	
	return (
		<div classNames={classes.root}>
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
						<FormControl className={classes.formControl} aria-describedby="firstname-helper-text">
							<Input id="firstname-helper" value={firstname} onChange={props.handleChange}
							       name='firstname'/>
							<FormHelperText id="firstname-helper-text">Prénom</FormHelperText>
						</FormControl>
						<FormControl className={classes.formControl} aria-describedby="lastname-helper-text">
							<Input id="lastname-helper" value={lastname} onChange={props.handleChange} name='lastname'/>
							<FormHelperText id="lastname-helper-text">Nom</FormHelperText>
						</FormControl>
					</div>
					<div className={classes.column}>
						<FormControl className={classes.formControl} aria-describedby="email-helper-text">
							<Input id="email-helper" type="email" value={email} onChange={props.handleChange}
							       name='email'/>
							<FormHelperText id="email-helper-text">Adresse mail</FormHelperText>
						</FormControl>
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
						<FormControl className={classes.formControl} aria-describedby="address_diffusion-helper-text">
							<Select
								value={address_diffusion}
								onChange={props.handleChange}
								name='address_diffusion'
								inputProps={{
									address_diffusion: {address_diffusion},
									id: 'address_diffusion',
								}}
							>
								<MenuItem value={1}>Autoriser</MenuItem>
								<MenuItem value={0}>Refuser</MenuItem>
							</Select>
							<FormHelperText id="address_diffusion-helper-text">Diffusion de votre
								addresse</FormHelperText>
						</FormControl>
						<br/>
						<FormControl className={classes.formControl} aria-describedby="permission-helper-text">
							<Select
								value={permission}
								onChange={props.handleChange}
								name='permission'
								inputProps={{
									fonction: {permission},
									id: 'fonction',
								}}
							>
								<MenuItem value="Particulier">Particulier</MenuItem>
								<MenuItem value="Professionnel">Professionnel</MenuItem>
							</Select>
							<FormHelperText id="permission-helper-text">Fonction</FormHelperText>
						</FormControl>
					</div>
					<div className={classes.column}>
						<FormControl className={classes.formControl} aria-describedby="createdAt-helper-text">
							<Typography>
								{createdAt}
							</Typography>
							<FormHelperText id="createdAt-helper-text">Date de création (Ce champ n'est pas
								modifiable)</FormHelperText>
						</FormControl>
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
						<FormControl className={classes.formControl} aria-describedby="address-helper-text">
							<Input id="address-helper" value={address} onChange={props.handleChange} name='address'/>
							<FormHelperText id="address-helper-text">Adresse</FormHelperText>
						</FormControl>
						<FormControl className={classes.formControl} aria-describedby="zip_code-helper-text">
							<Input id="zip_code-helper" type="number" value={zip_code} onChange={props.handleChange}
							       name='zip_code'/>
							<FormHelperText id="zip_code-helper-text">Code postal</FormHelperText>
						</FormControl>
					</div>
					<div className={classes.column}>
						<FormControl className={classes.formControl} aria-describedby="city-helper-text">
							<Input id="city-helper" value={city} onChange={props.handleChange} name='city'/>
							<FormHelperText id="city-helper-text">Ville</FormHelperText>
						</FormControl>
					</div>
				</ExpansionPanelDetails>
			</ExpansionPanel>
			<ExpansionPanel>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
					<div className={classes.column}>
						<Avatar className={classes.avatar}>
							<VpnKey/>
						</Avatar>
					</div>
					<div className={classes.column}>
						<Typography className={classes.heading}>Mot de passe</Typography>
					</div>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails className={classes.right}>
					<Button onClick={props.handleClickOpen} variant="outlined">Changer votre mot de passe</Button>
					<Dialog
						open={open}
						TransitionComponent={Transition}
						keepMounted
						onClose={props.handleClose}
						aria-labelledby="form-dialog-title"
					>
						<DialogTitle id="form-dialog-title">Mot de passe</DialogTitle>
						<div className={classes.center}>
							<FormControl className={classes.formControl} aria-describedby="password-helper-text">
								<Input id="password-helper" type='password' value={password}
								       onChange={props.handleChange} name='password'/>
								<FormHelperText id="password-helper-text">Ancien mot de passe</FormHelperText>
							</FormControl>
						</div>
						<div className={classes.center}>
							<FormControl className={classes.formControl} aria-describedby="password1-helper-text">
								<Input id="password1-helper" type='password' value={password1}
								       onChange={props.handlePassword} name='password1'/>
								<FormHelperText id="password1-helper-text">Nouveau mot de passe</FormHelperText>
							</FormControl>
						</div>
						<div className={classes.center}>
							<FormControl className={classes.formControl} aria-describedby="password2-helper-text">
								<Input id="password2-helper" type='password' value={password2}
								       onChange={props.handlePassword} name='password2'/>
								<FormHelperText id="password2-helper-text">Vérification du mot de passe</FormHelperText>
							</FormControl>
						</div>
						<Typography className={classes.center}>
							{(passwordStrengh === 'poor') ?
								'Votre mot  de passe doit contenir au moins 6 caratères' :
								(passwordStrengh === 'average') ?
									'Ajouter un caractère spéciale pour améliorer votre mot de passe' :
									'Mot de passe conforme'
							}
						</Typography>
						<Typography className={classes.center}>
							{!samePassword ? 'Vos mots de passe sont différents' : ''}
						</Typography>
						<DialogActions>
							<Button onClick={props.handleClose} color="primary">
								Annuler
							</Button>
							<Button onClick={props.changePassword} color="primary">
								Confirmer
							</Button>
						</DialogActions>
					</Dialog>
				</ExpansionPanelDetails>
			</ExpansionPanel>
			<Button variant="fab" aria-label="send" className={classes.button} onClick={props.modifyToggler}>
				<Icon><Send/></Icon>
			</Button>
			<Button variant="fab" aria-label="send" className={classes.button} onClick={props.handleOpenDeleteDialog}>
				<Icon><RemoveCircleOutline/></Icon>
			</Button>
			<Button variant="fab" aria-label="send" className={classes.button} onClick={props.undoModifyToggler}>
				<Icon><Undo/></Icon>
			</Button>
			<Dialog
				open={openDeleteDialog}
				onClose={props.handleCloseDeleteDialog}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">
					Suppression de votre compte
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Vous êtes sur le point de supprimer votre compte.<br/>
						Taka ne pourra plus assurer le suivi technique de votre poubelle.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={props.handleCloseDeleteDialog} color="primary">
						Annuler
					</Button>
					<Button onClick={props.deleteAccount} color="primary">
						Confirmer
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

//  ModifyUser.propTypes = propTypes;

ModifyUser.defaultProps = {
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

export default withStyles(styles)(ModifyUser);
