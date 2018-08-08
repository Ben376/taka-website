import React from "react";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import {connect} from 'react-redux';
import {getIdUser, getIdTrash} from "../../actions/index";
import {bindActionCreators} from "redux";

class TrashesTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			donnees: []
		}
	}

	handleClick(id) {
		this.props.getIdUser(id);
		this.props.getIdTrash(id, this.props.loggedIn.token);
	}

	filter(array1, array2) {
		return array1.filter(p => array2.find(p2 => p2.serialNumber === p.serial_number));
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.sugg.length > 0){
			this.setState({donnees:	this.filter(nextProps.data, nextProps.sugg)});
		}else{
			this.setState({donnees:nextProps.data});
		}
	}

	render() {
		return (
			<div>
				<ReactTable
					getTdProps={(state, rowInfo) => {
						return {
							onClick: () => {
								this.handleClick(rowInfo.original.serial_number)
							}
						};
					}}
					data={this.state.donnees.length > 0 ? this.state.donnees : []}
					previousText='précédent'
          nextText= 'suivant'
          loadingText= 'chargement...'
          noDataText= 'Pas de résultat trouvé'
          pageText= 'Page'
          ofText= 'sur'
          rowsText= 'lignes'
					columns={[
						{
							Header: "Identification",
							columns: [
								{
									Header: "Numéro de série",
									accessor: "serial_number",
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											textAlign:'center',
											fontWeight: 'bold'
										}}>
										{row.value}
										</div>
									)
								}
							]
						},
						{
							Header: "Taux de remplissage",
							columns: [
								{
									Header: "Verre",
									accessor: "glass_filling_rate",
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											textAlign:'center',
											fontWeight: 'bold',
											color: row.value >= 90 ? '#d13135' : '#448f7f'
										}}>
										{row.value} %
										</div>
									)
								},
								{
									Header: "Plastique",
									accessor: "plastic_filling_rate",
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											textAlign:'center',
											fontWeight: 'bold',
											color: row.value >= 90 ? '#d13135' : '#448f7f'
										}}>
										{row.value} %
										</div>
									)
								},
								{
									Header: "Métaux",
									accessor: "metal_filling_rate",
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											textAlign:'center',
											fontWeight: 'bold',
											color: row.value >= 90 ? '#d13135' : '#448f7f'
										}}>
										{row.value} %
										</div>
									)
								}
							]
						},
						{
							Header: 'Total',
							columns: [
								{
									Header: "Verre",
									accessor: "total_glass",
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											textAlign:'center',
										}}>
										{row.value}
										</div>
									)
								},
								{
									Header: "Plastique",
									accessor: "total_plastic",
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											textAlign:'center',
										}}>
										{row.value}
										</div>
									)
								},
								{
									Header: "Métaux",
									accessor: "total_metal",
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											textAlign:'center',
										}}>
										{row.value}
										</div>
									)
								}
							]
						},
						{
							Header: 'Après utilisation',
							columns: [
								{
									Header: "Verre",
									accessor: "glass_at_dumping",
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											textAlign:'center',
											fontWeight: 'bold',
											color: row.value >= 90 ? '#d13135' : '#448f7f'
										}}>
										{row.value} %
										</div>
									)
								},
								{
									Header: "Plastique",
									accessor: "plastic_at_dumping",
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											textAlign:'center',
											fontWeight: 'bold',
											color: row.value >= 90 ? '#d13135' : '#448f7f'
										}}>
										{row.value} %
										</div>
									)
								},
								{
									Header: "Métaux",
									accessor: "metal_at_dumping",
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											textAlign:'center',
											fontWeight: 'bold',
											color: row.value >= 90 ? '#d13135' : '#448f7f'
										}}>
										{row.value} %
										</div>
									)
								}
							]
						},
						{
							Header: 'Interrupteurs',
							columns: [
								{
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											backgroundColor: row.value === 1 ? '#d13135' : '#448f7f'
										}}>
										</div>
									),
									Header: "Capot 1",
									accessor: "cowl_switch1"
								},
								{
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											backgroundColor: row.value === 1 ? '#d13135' : '#448f7f'
										}}>
										</div>
									),
									Header: "Capot 2",
									accessor: "cowl_switch2"
								},
								{
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											backgroundColor: row.value === 1 ? '#d13135' : '#448f7f'
										}}>
										</div>
									),
									Header: "Tiroir 1",
									accessor: "drawer_switch1"
								},
								{
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											backgroundColor: row.value === 1 ? '#d13135' : '#448f7f'
										}}>
										</div>
									),
									Header: "Tiroir 2",
									accessor: "drawer_switch2"
								}
							]
						},
						{
							Header: 'Températures',
							columns: [
								{
									Header: "Moteur 1",
									accessor: "temp1",
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											textAlign:'center',
											fontWeight: 'bold',
											color: row.value >= 60 ? '#d13135' : '#448f7f'
										}}>
										{row.value}°c
										</div>
									)
								},
								{
									Header: "Moteur 2",
									accessor: "temp2",
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											textAlign:'center',
											fontWeight: 'bold',
											color: row.value >= 60 ? '#d13135' : '#448f7f'
										}}>
										{row.value}°c
										</div>
									)
								},
								{
									Header: "Surchauffe moteur 1",
									accessor: "overheat1",
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											color:'transparent',
											backgroundColor: row.value === 1 ? '#d13135' : '#448f7f'
										}}>
										{row.value}
										</div>
									)
								},
								{
									Header: "Surchauffe moteur 2",
									accessor: "overheat2",
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											color:'transparent',
											backgroundColor: row.value === 1 ? '#d13135' : '#448f7f'
										}}>
										{row.value}
										</div>
									)
								}
							]
						},
						{
							Header: 'Maintenance',
							columns: [
								{
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											backgroundColor: row.value === 1 ? '#d13135' : '#448f7f'
										}}>
										</div>
									),
									Header: "utilisateur",
									accessor: "user_default"
								},
								{
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											backgroundColor: row.value === 1 ? '#d13135' : '#448f7f'
										}}>
										</div>
									),
									Header: "automatique",
									accessor: "auto_default"
								}
							]
						}
					]}
					defaultPageSize={10}
					className="-striped -highlight"
				/>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({getIdUser, getIdTrash}, dispatch);
}

function mapStateToProps(state) {
	return {
		zipCode: state.zipCode,
		id: state.TrashId,
		loggedIn: state.loggedIn,
		sugg: state.sugg
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TrashesTable);
