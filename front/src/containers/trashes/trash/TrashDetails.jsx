import React, {Component} from 'react';
import "react-table/react-table.css";
import {connect} from "react-redux";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Icon from '@material-ui/core/Icon';
import InsertChart from '@material-ui/icons/InsertChart';
import TrashHistoryModal from '../../../components/TrashHistoryModal';
import {Button} from '@material-ui/core';

class TrashDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : 1 ,
            loaded : false,
            list:{},
            open:false
        }
    }

    componentWillMount() {
        this.setState({list:this.props.trashDetails})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.trashDetails!==this.props.list){
            this.setState({list:nextProps.trashDetails});
        }
    }

    handleOpen() {
  		this.setState({open:true})
  	}

  	handleClose() {
  		this.setState({open:false})
  	}

    render() {
        return (
            <div>
            {
            (this.state.list.length !== 0)
                ?
								<Grid container spacing={24} style={{marginTop: 20, textAlign:'center'}}>
										<Grid item xs={12} sm={4}>
											<Typography style={{backgroundColor:'#478e7f',borderRadius:5,color:'white',padding:5}} variant="title">
												Informations générales
											</Typography>
											<List style={{textAlign:'center'}}>
												<ListItem>Numéro de série : {this.state.list.serial_number}</ListItem>
												<ListItem>Bac sélectionné : {this.state.list.bin_selected}</ListItem>
												<ListItem>Date de première connexion : {moment(this.state.list.realeased).format("DD-MM-YYYY")}</ListItem>
												<ListItem>Dernière utilisation : {moment(this.state.list.last_used).format("DD-MM-YYYY")}</ListItem>
											</List>
										</Grid>
										<Grid item xs={12} sm={4}>
											<Typography style={{backgroundColor:'#478e7f',borderRadius:5,color:'white',padding:5}} variant="title">
												Défauts techniques
											</Typography>
											<List style={{textAlign:'center'}}>
												<ListItem>{(this.state.list.auto_default === 0) ? 'Pas de maintenance auto en cours' : 'Demande de maintenance auto en cours' }</ListItem>
												<ListItem>{(this.state.list.user_default === 0) ? 'Pas de maintenance manuelle en cours' : 'Demande de maintenance manuelle en cours' }</ListItem>
												<ListItem>{(this.state.list.cowl_switch1 === 0 && this.state.list.cowl_switch2 === 0) ? 'Pas de capot mal fermé' : (this.state.list.cowl_switch1 === 1 && this.state.list.cowl_switch2 === 0) ? 'Capot 1 mal fermé' : (this.state.list.cowl_switch1 === 0 && this.state.list.cowl_switch2 === 1) ? 'Capot 2 mal fermé' : 'Les deux capots sont mal fermés'  }</ListItem>
												<ListItem>{(this.state.list.drawer_switch1 === 0 && this.state.list.drawer_switch2 === 0) ? 'Pas de tiroir mal fermé' : (this.state.list.drawer_switch1 === 1 && this.state.list.drawer_switch2 === 0) ? 'Tiroir 1 mal fermé' : (this.state.list.drawer_switch1 === 0 && this.state.list.drawer_switch2 === 1) ? 'Tiroir 2 mal fermé' : 'Les deux tiroirs sont mal fermés'  }</ListItem>
											</List>
										</Grid>
										<Grid item xs={12} sm={4}>
											<Typography style={{backgroundColor:'#478e7f',borderRadius:5,color:'white',padding:5}} variant="title">
												Températures
											</Typography>
											<List style={{textAlign:'center'}}>
												<ListItem>{(this.state.list.overheat1 === 0 && this.state.list.overheat2 === 0) ? 'Pas de surchauffe' : (this.state.list.overheat1 === 1 && this.state.list.overheat2 === 0) ? 'Surchauffe emplacement 1' : (this.state.list.overheat1 === 0 && this.state.list.overheat2 === 1) ? 'Surchauffe emplacement 2' : 'Surchauffe aux deux emplacements'  }</ListItem>
												<ListItem>Température 1 : {this.state.list.temp1}°C</ListItem>
												<ListItem>Température 2 : {this.state.list.temp2}°C</ListItem>
											</List>
										</Grid>
										<Grid item xs={12} sm={4}>
											<Typography style={{backgroundColor:'#478e7f',borderRadius:5,color:'white',padding:5}}variant="title">
												Taux de déchets actuel
											</Typography>
											<List style={{textAlign:'center'}}>
												<ListItem>Verre : {this.state.list.glass_filling_rate}%</ListItem>
												<ListItem>Plastique : {this.state.list.plastic_filling_rate}%</ListItem>
												<ListItem>Métal : {this.state.list.metal_filling_rate}%</ListItem>
											</List>
										</Grid>
										<Grid item xs={12} sm={4}>
											<Typography style={{backgroundColor:'#478e7f',borderRadius:5,color:'white',padding:5}}variant="title">
												Taux de déchets après vidage
											</Typography>
											<List>
												<ListItem>Verre : {this.state.list.glass_at_dumping}%</ListItem>
												<ListItem>Plastique : {this.state.list.plastic_at_dumping}%</ListItem>
												<ListItem>Métal : {this.state.list.metal_at_dumping}%</ListItem>
											</List>
										</Grid>
										<Grid item xs={12} sm={4}>
											<Typography style={{backgroundColor:'#478e7f',borderRadius:5,color:'white',padding:5}} variant="title">
												Taux de déchets global
											</Typography>
											<List>
												<ListItem>Verre : {this.state.list.total_glass}</ListItem>
												<ListItem>Plastique : {this.state.list.total_plastic}</ListItem>
												<ListItem>Métal : {this.state.list.total_metal}</ListItem>
											</List>
										</Grid>
                    <Grid style={{textAlign:'center'}} item xs={12} sm={4}>
											<Typography style={{backgroundColor:'#478e7f',borderRadius:5,color:'white',padding:5}} variant="title">
												Historique de la poubelle
											</Typography>
                      <Button
                        variant="fab"
                        aria-label="send"
                        onClick={this.handleOpen.bind(this)}
                        style={{backgroundColor: '#f5f5f5', margin: '1rem', minHeight: '4rem', minWidth: '4rem',}}>
                        <Icon>
                          <InsertChart style={{color:'#505051'}}/>
                        </Icon>
                      </Button>
                      <TrashHistoryModal currentSerial={this.props.trashDetails.serial_number} open={this.state.open} handleClose={this.handleClose.bind(this)}/>
										</Grid>
								</Grid>
                :
                <p>'Aucune poubelle selectionnée'</p>
              }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        trashDetails : state.TrashId
    }
};

export default connect(mapStateToProps)(TrashDetails);
