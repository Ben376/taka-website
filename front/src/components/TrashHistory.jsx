import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import 'moment/locale/fr';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#58b0a1',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class TrashHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: []
    }
  }

  componentDidMount() {
    if (this.props.serialNumber !== '') {
    fetch(`/user/serialNumberHistory/${ this.props.serialNumber }`)
    .then(res => res.json())
    .then( res => {
        this.setState({
          datas : res
        });
      }
    )}
  };

  render() {

  const { classes } = this.props;
  const { datas } = this.state;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell padding="dense">Dernière utilisation</CustomTableCell>
              <CustomTableCell padding="dense">Bac sélectionné</CustomTableCell>
              <CustomTableCell padding="dense">Taux de remplissage du verre</CustomTableCell>
              <CustomTableCell padding="dense">Taux de remplissage du métal</CustomTableCell>
              <CustomTableCell padding="dense">Taux de remplissage du plastique</CustomTableCell>
              <CustomTableCell padding="dense">Taux de remplissage du verre après utilisation</CustomTableCell>
              <CustomTableCell padding="dense">Taux de remplissage du plastique après utilisation</CustomTableCell>
              <CustomTableCell padding="dense">Taux de remplissage du métal après utilisation</CustomTableCell>
              <CustomTableCell padding="dense">Total du verre recyclé</CustomTableCell>
              <CustomTableCell padding="dense">Total du plastique recyclé</CustomTableCell>
              <CustomTableCell padding="dense">Total du métal recyclé</CustomTableCell>
              <CustomTableCell padding="dense">Taux de verre au vidage</CustomTableCell>
              <CustomTableCell padding="dense">Taux de plastique au vidage</CustomTableCell>
              <CustomTableCell padding="dense">Taux de métal au vidage</CustomTableCell>
              <CustomTableCell padding="dense">Interrupteur du capot n°1</CustomTableCell>
              <CustomTableCell padding="dense">Interrupteur du capot n°2</CustomTableCell>
              <CustomTableCell padding="dense">Interrupteur du tiroir n°1</CustomTableCell>
              <CustomTableCell padding="dense">Interrupteur du tiroir n°2</CustomTableCell>
              <CustomTableCell padding="dense">Température du moteur n°1</CustomTableCell>
              <CustomTableCell padding="dense">Température du moteur n°2</CustomTableCell>
              <CustomTableCell padding="dense">Surchauffe détectée du moteur n°1</CustomTableCell>
              <CustomTableCell padding="dense">Surchauffe détectée du moteur n°2</CustomTableCell>
              <CustomTableCell padding="dense">Défaut signalé automatiquement</CustomTableCell>
              <CustomTableCell padding="dense">Défaut signalé par l'utilisateur</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas.map(data => {
              return (
                <TableRow className={classes.row} key={data._id}>
                  <CustomTableCell padding="checkbox">{moment(data.last_used).format("DD-MM-YYYY")}</CustomTableCell>
                  <CustomTableCell numeric padding="checkbox">{data.bin_selected}</CustomTableCell>
                  <CustomTableCell numeric padding="checkbox">{data.glass_filling_rate}%</CustomTableCell>
                  <CustomTableCell numeric padding="checkbox">{data.metal_filling_rate}%</CustomTableCell>
                  <CustomTableCell numeric padding="checkbox">{data.plastic_filling_rate}%</CustomTableCell>
                  <CustomTableCell numeric padding="checkbox">{data.glass_after_use}%</CustomTableCell>
                  <CustomTableCell numeric padding="checkbox">{data.plastic_after_use}%</CustomTableCell>
                  <CustomTableCell numeric padding="checkbox">{data.metal_after_use}%</CustomTableCell>
                  <CustomTableCell numeric padding="checkbox">{data.total_glass}</CustomTableCell>
                  <CustomTableCell numeric padding="checkbox">{data.total_plastic}</CustomTableCell>
                  <CustomTableCell numeric padding="checkbox">{data.total_metal}</CustomTableCell>
                  <CustomTableCell numeric padding="checkbox">{data.glass_at_dumping}%</CustomTableCell>
                  <CustomTableCell numeric padding="checkbox">{data.plastic_at_dumping}%</CustomTableCell>
                  <CustomTableCell numeric padding="checkbox">{data.metal_at_dumping}%</CustomTableCell>
                  <CustomTableCell numeric padding="checkbox">{data.cowl_switch1}</CustomTableCell>
                  <CustomTableCell numeric padding="checkbox">{data.cowl_switch2}</CustomTableCell>
                  <CustomTableCell numeric padding="checkbox">{data.drawer_switch1}</CustomTableCell>
                  <CustomTableCell numeric padding="checkbox">{data.drawer_switch2}</CustomTableCell>
                  <CustomTableCell numeric padding="checkbox">{data.temp1}°c</CustomTableCell>
                  <CustomTableCell numeric padding="checkbox">{data.temp2}°c</CustomTableCell>
                  <CustomTableCell numeric padding="checkbox">{data.overheat1}</CustomTableCell>
                  <CustomTableCell numeric padding="checkbox">{data.overheat2}</CustomTableCell>
                  <CustomTableCell numeric padding="checkbox">{data.auto_default}</CustomTableCell>
                  <CustomTableCell numeric padding="checkbox">{data.user_default}</CustomTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

TrashHistory.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TrashHistory);
