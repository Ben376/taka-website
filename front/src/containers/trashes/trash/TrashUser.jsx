import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import moment from 'moment';

class TrashUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id : 1,
			user:[],
		}
	}

	componentWillMount() {
		this.setState({user:this.props.userDetails});
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.userDetails!==this.props.userDetails){
			this.setState({user:nextProps.userDetails});
		}
	}

	render() {
		return (
			<div>
				{
					(this.state.user && this.state.user.length>0)
						?
						<Grid container style={{textAlign:'center'}}>
							<Grid item xs={4}>
								<h1>IDENTITE</h1>
								<h3>{this.state.user[0].serialNumber}</h3>
								<p>{this.state.user[0].firstname} {this.state.user[0].lastname}</p>
								<p>{this.state.user[0].email}</p>
							</Grid>
							<Grid item xs={4}>
								<h1>ADRESSE</h1>
								<p>{this.state.user[0].address}</p>
								<p>{this.state.user[0].zip_code}</p>
								<p>{this.state.user[0].city}</p>
							</Grid>
							<Grid item xs={4}>
								<h1>INFORMATIONS COMPTE</h1>
								<p>Créé le : </p>
								<p>{moment(this.state.user[0].createdAt).format("DD-MM-YYYY")}</p>
							</Grid>
						</Grid>
						:
						<div style={{textAlign:'center'}}>
							<p>Aucun utilisateur enregistré pour cette poubelle.</p>
						</div>
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userDetails : state.UserId
	}
};

export default connect(mapStateToProps)(TrashUser);
