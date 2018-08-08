import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TrashesTable from './TrashesTable';
import SortingProPrivate from './SortingProPrivate';
import Trash from '../../components/trashes/Trash'
import {connect} from 'react-redux';
import SearchBarGeo from './SearchBarGeo';
import Search from './Search';
import {setDefaultId} from "../../actions/index";
import {bindActionCreators} from "redux";
import Grid from '@material-ui/core/Grid';

const styles = {
	root: {
		maxWidth: '100%'
  },
  bar: {
    flexGrow: 1,
  },
	component: {
		display: 'block',
		margin: 'auto',
	},
	tab: {
		maxWidth: '100%'
	},
};

class Trashes extends React.Component {
	state = {
		data: [],
		message: '',
	};

	componentDidMount() {
		fetch('/api/trashesList', {headers: {Authorization: 'Bearer ' + this.props.loggedIn.token}})
			.then(res => res.json())
			.then(res => {
					this.setState({data: res.docs, message: "succeed"})
				},
				err => console.log(err)
			);
	}

	componentWillUnmount() {
		this.props.setDefaultId(null)
  }
  
  reset = () => {
    this.props.setDefaultId(null)
  }


	render() {
		const {classes} = this.props;
		const {data} = this.state;
		return (
			<div className={classes.root}>
			<h1 style={{textAlign:'center',borderStyle:'solid',borderRadius:5,color:'#474747'}}>POUBELLES</h1>
				<Grid container spacing={16} className={ classes.bar } style={{textAlign:'center'}}>
					<Grid item xs={12} md={3} className={classes.component}>
						<SortingProPrivate/>
					</Grid>
					<Grid item xs={12} md={3} className={classes.component}>
						<Search/>
					</Grid>
					<Grid item xs={12} md={3} className={classes.component}>
						<SearchBarGeo />
					</Grid>
					<Grid item xs={12} md={3} className={classes.component} style={{textAlign: 'center'}}>
            <Button onClick={ this.reset } variant='outlined' style={{ color:'#478e7f'}} >
              Réinitialiser
						</Button>
					</Grid>
					<Grid item xs={12}>
						{
							this.props.dataFromStore.length !== 0 || this.props.id
								?
									this.props.id
										?
										<TrashesTable data={[this.props.id]}/>
										:
										<TrashesTable data={this.props.dataFromStore}/>
								:
								<TrashesTable data={data}/>
						}
					</Grid>
					<Grid item xs={12} className={classes.component}>
					</Grid>
					<Grid item xs={12}>
						{
							(this.props.id)
								?
								<div>
									<Trash/>
								</div>
								:
								<div></div>
						}
					</Grid>
				</Grid>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		dataFromStore: state.trashes,
		id: state.TrashId,
		loggedIn: state.loggedIn,
		trashSerial: state.trashSerial,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({setDefaultId}, dispatch);
}

Trashes.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Trashes));
