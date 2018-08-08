import React from "react";

import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from 'react-redux';
import { getTrashesOffline } from "../../actions/index";
import { bindActionCreators } from "redux";
import moment from 'moment';
import 'moment/locale/fr';

class TrashesOffline extends React.Component {

  componentWillMount() {
    this.props.getTrashesOffline(this.props.loggedIn.token)
  }

	render() {

		return (

			<div>
				<ReactTable
					data={this.props.data ? this.props.data : []}
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
									accessor: "serial_number"
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
              Header: "Dates",
              columns: [
                {
                  Header: "Date d'inscription",
                  accessor: "realeased",
									Cell: row => (
										<div>
											{moment(row.value).format("DD-MM-YYYY")}
										</div>
									)
                },
                {
                  Header: "Dernière connexion",
                  accessor: "last_used",
									Cell: row => (
										<div>
											{moment(row.value).format("DD-MM-YYYY")}
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
	return bindActionCreators({getTrashesOffline}, dispatch);
}

const mapStateToProps = state => {
	return {
    data : state.TrashesOffline,
    loggedIn: state.loggedIn
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(TrashesOffline);
