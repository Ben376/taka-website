import React from 'react';
import Modal from 'react-responsive-modal';
import './TrashesTableUser.css';
import {connect} from "react-redux";
import TrashHistoryModal from '../../components/TrashHistoryModal';
import {Button} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import InsertChart from '@material-ui/icons/InsertChart';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import {deleteUserTrash} from "../../actions";
import {bindActionCreators} from "redux";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

class TrashesTableUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open:false,
			serialNumber:""
		}
	}

	handleOpen(id) {
		this.setState({open:true, serialNumber:id})
	}

	handleClose() {
		this.setState({open:false})
	}

	handleSubmit() {
		this.handleClose();
		this.props.deleteUserTrash(this.state.serialNumber, this.props.loggedIn.loggedId)
	}

	render() {
		return (
			<div>
				<div className='table-user' style={{margin: 'auto'}}>
					<div className='table-user-div' style={{margin: 'auto'}}>
						<Modal open={this.props.open} onClose={() => this.props.modalClose()}>
							<h2>Liste des poubelles</h2>
							<div>
								{
									this.props.serialList.map(x =>
										<div style={{display: 'flex', border: '1px solid black', padding: '5px'}}>
											<div style={{border: '1px solid black', padding: '5px'}}>
												<h4>Poubelle {x.serial_number}</h4>
											</div>
											<div style={{border: '1px solid black', padding: '5px'}}>
												<h4>Taux de remplissage moyen</h4>
												<p>Verre&nbsp;: {x.glass_at_dumping}%</p>
												<p>Plastique&nbsp;: {x.plastic_at_dumping}%</p>
												<p>Métal&nbsp;: {x.metal_at_dumping}%</p>
											</div>
											<div style={{border: '1px solid black', padding: '5px'}}>
												<h4>Taux de remplissage moyen au vidage</h4>
												<p>Verre&nbsp;: {x.glass_filling_rate}%</p>
												<p>Plastique&nbsp;: {x.plastic_filling_rate}%</p>
												<p>Métal&nbsp;: {x.metal_filling_rate}%</p>
											</div>
											<div style={{border: '1px solid black', padding: '5px'}}>
												<h4>Volume total traité depuis le début</h4>
												<p>Verre&nbsp;: {x.total_glass}m³</p>
												<p>Plastique&nbsp;: {x.total_plastic}m³</p>
												<p>Métal&nbsp;: {x.total_metal}m³</p>
											</div>
											<div style={{display:'flex', flexDirection:'column'}}>
												<Button
													variant="fab"
													aria-label="send"
													onClick={() => this.props.handleOpen(x.serial_number)}
													style={{backgroundColor: '#58b0a1', margin: '1rem', float: 'right', minHeight: '4rem', minWidth: '4rem',}}>
													<Icon>
														<InsertChart/>
													</Icon>
												</Button>
												<Button
													variant="fab"
													aria-label="send"
													onClick={() => this.handleOpen(x.serial_number)}
													style={{backgroundColor: '#58b0a1', margin: '1rem', float: 'right', minHeight: '4rem', minWidth: '4rem',}}>
													<Icon>
														<RemoveCircleOutline/>
													</Icon>
												</Button>
											</div>
											<TrashHistoryModal currentSerial={this.props.currentSerial} open={this.props.openTrashHistory} handleClose={this.props.handleClose}/>
										</div>
									)}
							</div>
						</Modal>
					</div>
				</div>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose.bind(this)}
					aria-labelledby="alert-dialog-slide-title"
					aria-describedby="alert-dialog-slide-description"
				>
					<DialogTitle id="alert-dialog-slide-title">
						Suppression de la poubelle
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-slide-description">
							Vous êtes sur le point de supprimer cette poubelle et toutes ses données<br/>
							Voulez-vous continuer?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose.bind(this)} color="primary">
							Annuler
						</Button>
						<Button onClick={this.handleSubmit.bind(this)} color="primary">
							Confirmer
						</Button>
					</DialogActions>
				</Dialog>
			</div>

		);
	}
}

const mapStateToProps = state => ({
	serialList: state.serialList,
	loggedIn: state.loggedIn,
});

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({deleteUserTrash}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TrashesTableUser);
