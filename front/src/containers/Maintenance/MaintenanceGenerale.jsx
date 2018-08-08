import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {connect} from 'react-redux';
import {getMaintenance} from "../../actions/index";
import {bindActionCreators} from "redux";
import {getIdUser, getIdTrash} from "../../actions/index";

class MaintenanceGenerale extends React.Component {
	
	componentWillMount() {
		this.props.getMaintenance(this.props.loggedIn.token)
	}
	
	handleClick(id) {
		this.props.getIdUser(id);
		this.props.getIdTrash(id, this.props.loggedIn.token);
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
					data={this.props.data ? this.props.data : []}
					previousText='précédent'
					nextText='suivant'
					loadingText='chargement...'
					noDataText='Pas de résultat trouvé'
					pageText='Page'
					ofText='sur'
					rowsText='lignes'
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
											textAlign: 'center',
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
										<div>
											{row.value} %
										</div>
									)
								},
								{
									Header: "Plastique",
									accessor: "plastic_filling_rate",
									Cell: row => (
										<div>
											{row.value} %
										</div>
									)
								},
								{
									Header: "Métal",
									accessor: "metal_filling_rate",
									Cell: row => (
										<div>
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
									Header: "Capot 1",
									accessor: "cowl_switch1",
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											backgroundColor: row.value === 1 ? '#d13135' : '#448f7f'
										}}>
										</div>
									)
								},
								{
									Header: "Capot 2",
									accessor: "cowl_switch2",
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											backgroundColor: row.value === 1 ? '#d13135' : '#448f7f'
										}}>
										</div>
									)
								},
								{
									Header: "Tiroir 1",
									accessor: "drawer_switch1",
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											backgroundColor: row.value === 1 ? '#d13135' : '#448f7f'
										}}>
										</div>
									)
								},
								{
									Header: "Tiroir 2",
									accessor: "drawer_switch2",
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											backgroundColor: row.value === 1 ? '#d13135' : '#448f7f'
										}}>
										</div>
									)
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
											textAlign: 'center',
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
											textAlign: 'center',
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
											color: 'transparent',
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
											color: 'transparent',
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
									Header: "Manuelle",
									accessor: "user_default",
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											backgroundColor: row.value === 1 ? '#d13135' : '#448f7f'
										}}>
										</div>
									)
								},
								{
									Header: "Automatique",
									accessor: "auto_default",
									Cell: row => (
										<div style={{
											width: '100%',
											height: '100%',
											backgroundColor: row.value === 1 ? '#d13135' : '#448f7f'
										}}>
										</div>
									)
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
	return bindActionCreators({getMaintenance, getIdUser, getIdTrash}, dispatch);
}

const mapStateToProps = state => {
	return {
		id: state.TrashId,
		data: state.Maintenance,
		loggedIn: state.loggedIn
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceGenerale);
