import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TrashHistory from './TrashHistory';

function TrashHistoryModal(props) {
  const { classes, onClose, selectedValue, handleClose, openTrashHistory, currentSerial, ...other } = props;
  return (
    <Dialog
      fullScreen
      open={ openTrashHistory }
      onClose={ handleClose }
      aria-labelledby="trash-history-title"
      { ...other }
      scroll='body'
    >
      <AppBar color='default' >
        <Toolbar>
          <IconButton color='#58b0a1' onClick={props.handleClose} aria-label="Close">
            <CloseIcon style={ { color: '#58b0a1' } } />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogTitle id="trash-history-title">Historique de la poubelle</DialogTitle>
      <div>
        <TrashHistory serialNumber={ currentSerial } />
      </div>
    </Dialog>
  );
}

TrashHistoryModal.propTypes = {
  classes: PropTypes.object,
  openTrashHistory: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default TrashHistoryModal;
