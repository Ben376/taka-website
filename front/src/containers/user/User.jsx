import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import TrashesTableUser from './TrashesTableUser';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Delete from '@material-ui/icons/Delete';
import axios from 'axios';
import Header from '../Header';
import UserInformations from '../../components/user/UserInformations';
import ModifyUser from '../../components/user/ModifyUser';
import Contact from '../../components/user/Contact'
import { checkout, getSerialList } from "../../actions";
import Paper from '@material-ui/core/Paper';
import welt from '../../images/welt.svg';
import stats from '../../images/stats.svg';

const styles = {
	root: {
		flexGrow: 1,
		
	},
	title: {
		fontSize: '2rem',
		lineHeight: '2rem',
		textAlign: 'center',
		color: 'white',
		backgroundColor: '#478e7f',
	},
	Card: {
		margin: '3rem 1rem',
		minWidth: 275,
	},
	header: {
		color: 'white',
		backgroundColor: '#478e7f',
		padding: '1.2rem',
		borderRadius:5
	},
	button: {
		backgroundColor: '#478e7f',
	},
	image: {
		display:'flex',
		justifyContent:'space-around'

	}
};

class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname: '',
			lastname: '',
			email: '',
			createdAt: '',
			address_diffusion: true,
			address: '',
			zip_code: 0,
			city: '',
			permission: 'particulier',
			password: '',
			password1: '',
			password2: '',
			passwordStrengh: 'poor',
			samePassword: true,
			modify: false,
			open: false,
			openModal: false,
      openDeleteDialog: false,
      openTrashHistory: false,
			validSerial: false,
			newSerial: '',
			serial_number: [],
      message:'',
      currentSerial: '',
		}
		this.modifyToggler = this.modifyToggler.bind(this);
		this.undoModifyToggler = this.undoModifyToggler.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleClickOpen = this.handleClickOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.deleteAccount = this.deleteAccount.bind(this);
		this.isSerialValid = this.isSerialValid.bind(this);
    this.addSerial = this.addSerial.bind(this);
    this.handleOpenTrasHistory = this.handleOpenTrasHistory.bind(this);
    this.handleCloseTrasHistory = this.handleCloseTrasHistory.bind(this);
	}

	componentWillMount() {
		fetch(`/user/read/${this.props.loggedIn.loggedId}`)
			.then(res => res.json())
			.then((res) => {
				this.setState({
					firstname: res.user.firstname,
					lastname: res.user.lastname,
					email: res.user.email,
					createdAt: res.user.createdAt,
					address_diffusion: res.user.address_diffusion,
					address: res.user.address,
					zip_code: res.user.zip_code,
					city: res.user.city,
					permission: res.user.permission,
				});
			});
		}

	undoModifyToggler() {
		this.setState(prevState => ({
			modify: !prevState.modify
		}));
	}

	modifyToggler() {
		this.setState(prevState => ({
			modify: !prevState.modify
		}));
		if (this.state.modify) {
			fetch(`/user/update`, {
				method: 'PUT',
				headers: new Headers({
					'Content-Type': 'application/json'
				}),
				body: JSON.stringify({
					firstname: this.state.firstname,
					lastname: this.state.lastname,
					email: this.state.email,
					address_diffusion: this.state.address_diffusion,
					createdAt: this.state.createdAt.substring(0, (this.state.createdAt.length - 1)),
					address: this.state.address,
					zip_code: this.state.zip_code,
					city: this.state.city,
					permission: this.state.permission,
					id: this.props.loggedIn.loggedId
				}),
			})
				.then(res => res.json())
				.then(
					res => {
						this.setState({
							message: res.info
						})
						setTimeout(() => {
							this.setState({ message: '' })
						}, 1000)
					}
				)
		}
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleClickOpen = () => {
		this.setState({ open: true });
	};
	
	handleClose = () => {
		this.setState({ open: false });
	};

	handleOpenDeleteDialog = () => {
		this.setState({ openDeleteDialog: true });
	}

	handleCloseDeleteDialog = () => {
		this.setState({ openDeleteDialog: false });
	};
	
	handleOpenTrasHistory = serial => {
		this.setState({
      openTrashHistory: true,
      currentSerial: serial,
    });
	}
	
	handleCloseTrasHistory = () => {
		this.setState({ openTrashHistory: false });
	};

	deleteAccount = () => {
		fetch('user/delete', {
			method: 'DELETE',
			headers: new Headers({
				'Content-type': 'application/json'
			}),
			body: JSON.stringify({
				id: this.props.loggedIn.loggedId
			}),
		})
			.then(res => res.json())
			.then(
				this.props.checkout()
			)
	}

	handlePassword = event => {
		let isSame = false;
		let newPasswordStrengh = this.state.passwordStrengh;
		const averageSecurity = new RegExp(/.{6,}/);
		const {name, value} = event.target;

		const goodSecurity = new RegExp(/[^a-zA-Z0-9]{1,}/);
		if (name === 'password1') {
			isSame = (value === this.state.password2);
			(value.match(goodSecurity) && value.match(averageSecurity)) ?
				newPasswordStrengh = 'good' :
				value.match(averageSecurity) ?
					newPasswordStrengh = 'average' :
					newPasswordStrengh = 'poor';
		} else {
			isSame = (value === this.state.password1);
		}
		this.setState({
			[name]: value,
			samePassword: isSame,
			passwordStrengh: newPasswordStrengh
		});
	}

	isSerialValid = (event) => {
		const checkSerial = new RegExp(/^\d*(PRO|PAR)$/i);
		this.setState({
			validSerial: event.target.value.match(checkSerial),
			newSerial: event.target.value
		})
	}

	addSerial = () => {
		fetch('/user/createTrash', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({
				userId: this.props.loggedIn.loggedId,
				serialNumber: this.state.newSerial
			}),
		})
			.then(res => res.json())
			.then(
				res => {
					this.setState({
						message: res.info,
						newSerial: ''
					})
					setTimeout(() => {
						this.setState({message: ''})
					}, 1000)
				}
			)
	}

	changePassword = () => {
		if ((this.state.passwordStrengh !== 'poor') && this.state.samePassword) {
			fetch(`/user/checkPassword`, {
				method: 'POST',
				headers: new Headers({
					'Content-Type': 'application/json'
				}),
				body: JSON.stringify({
					password: this.state.password,
					id: this.props.loggedIn.loggedId,
				}),
			})
				.then(res => res.json())
				.then(
					res => {
						if (res.message !== 'mot de passe vérifié') {
							this.setState({
								message: res.message
							})
						} else {
							fetch('/user/changePassword', {
								method: 'PUT',
								headers: new Headers({
									'Content-Type': 'application/json'
								}),
								body: JSON.stringify({
									password: this.state.password1,
									id: this.props.loggedIn.loggedId,
								}),
							})
								.then(res => res.json())
								.then(
									res => {
										this.setState({
											message: res.message
										});
										this.setState({ open: false });
									});
						}
						;
					});
		} else {
			this.setState({ message: 'Validation invalide' })
		}
	};

	openModal() {
		this.setState({ openModal: true });
		this.serialNumber();
	}

	modalClose() {
		this.setState({ openModal: false });
	}

	serialNumber() {
		axios.get(`/user/readSN/${ this.props.loggedIn.loggedId }`)
			.then(response => {
				for(let i = 0; i < response.data.data.length; i++) {
					this.props.getSerialList(response.data.data[i].serialNumber)
				}
			})
	}

	render() {
		const { classes } = this.props
		const { open, message, newSerial, openDeleteDialog, validSerial, firstname, lastname, email, createdAt, address_diffusion, address, zip_code, city, permission, modify, password, password1, password2, passwordStrengh, samePassword } = this.state
		return (
			<div>
				<Header/>
				<Grid container>
					<Grid item xs={ 12 }>
						<Card className={ classes.title }>
							<CardContent>
								<Typography className={ classes.title }>
									Bienvenue sur votre espace
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={ 12 } md={ 6 }>
						<Card className={ classes.Card }>
							<CardContent>
								<Typography style={{textAlign:'center',borderRadius:5,marginBottom:20}} variant="headline" component="h2" className={ classes.header }>
									Vos informations
								</Typography>
								{ !modify ? (
									<UserInformations
										firstname={ firstname }
										lastname={ lastname }
										email={ email }
										createdAt={ createdAt }
										address_diffusion={ address_diffusion }
										address={ address }
										zip_code={ zip_code }
										city={ city }
										permission={ permission }
										modifyToggler={ this.modifyToggler }
										handleChange={ this.handleChange }
										isSerialValid={ this.isSerialValid }
										addSerial={ this.addSerial }
										validSerial={ validSerial }
										message={ message }
										newSerial={ newSerial }
									/>
								) : (
									<ModifyUser
										firstname={ firstname }
										lastname={ lastname }
										email={ email }
										createdAt={ createdAt }
										address_diffusion={ address_diffusion }
										address={ address }
										zip_code={ zip_code }
										city={ city }
										permission={ permission }
										password={ password }
										password1={ password1 }
										password2={ password2 }
										passwordStrengh={ passwordStrengh }
										samePassword={ samePassword }
										modifyToggler={ this.modifyToggler }
										undoModifyToggler={ this.undoModifyToggler }
										handleChange={this.handleChange}
										handleClickOpen={this.handleClickOpen}
										handleClose={ this.handleClose }
										handlePassword={ this.handlePassword }
										changePassword={ this.changePassword }
										open={ open }
										deleteAccount={ this.deleteAccount }
										openDeleteDialog={ openDeleteDialog }
										handleOpenDeleteDialog={ this.handleOpenDeleteDialog }
										handleCloseDeleteDialog={ this.handleCloseDeleteDialog }
									/>
								)
								}
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={ 12 } md={ 6 }>
						<Card className={ classes.Card }>
							<CardContent >
								<div>
									<Typography   style={{textAlign:'center',marginBottom:20}} variant="headline" component="h2" className={classes.header}>
										Visualisez vos Poubelles
									</Typography>
								</div>
									<Paper className={ classes.image } style={{marginBottom:20}}>
												<img src={welt} style={{width:'auto',height:'35vh'}} alt="world recycle"/>
												<img src={stats} style={{width:'auto',height:'35vh'}} alt="stats recycle"/>
									</Paper>
								
								<div style={ { display:'flex', justifyContent:"flex-end"} }>
								<Button variant="fab" aria-label="send" className={classes.button} onClick={this.openModal.bind(this)}>
									<Icon><Delete/></Icon>
								</Button>
								</div>
								
				                <TrashesTableUser
				                  idUser={ this.props.loggedIn.loggedId }
				                  open={ this.state.openModal }
				                  openTrashHistory= { this.state.openTrashHistory }
				                  modalClose={ this.modalClose.bind(this) }
				                  handleOpen={ this.handleOpenTrasHistory}
				                  handleClose={ this.handleCloseTrasHistory }
				                  currentSerial={ this.state.currentSerial }
				                />
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} md={6}>
						<Card className={classes.Card}>
							<CardContent >
								<Typography style={{textAlign:'center',borderRadius:5}} variant="headline" component="h2" className={classes.header}>
									Nous contacter
								</Typography>
								<Contact
									firstname={ firstname }
									lastname={ lastname }
									email={ email }
									city={ city }
								/>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={ 12 } md={ 6 }>
						<Card className={ classes.Card }>
							<CardContent>
								<Typography style={{textAlign:'center',borderRadius:5}} variant="headline" component="h2" className={ classes.header }>
									Conditions d'utilisation
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({checkout,getSerialList}, dispatch);
};

const mapStateToProps = state => ({
	user: state.user,
	loggedIn: state.loggedIn,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(User));
