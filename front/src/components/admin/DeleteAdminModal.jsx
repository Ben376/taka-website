import React from 'react';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const DetleteAdminModal = (props) => {
  const { admin, deleteAdminModal, handleDeleteAdminModal, clearAdmin } = props;
  return (
    <Dialog
    open={ deleteAdminModal }
    onClose={ handleDeleteAdminModal }
    aria-labelledby="form-dialog-title"
    >
    <DialogTitle id="form-dialog-title">Supprimer un collaborateur</DialogTitle>
    <DialogContent>
      <Typography>
        { admin.firstname } { admin.lastname } n'aura plus accès à l'espace d'administration de TAKA.
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={ handleDeleteAdminModal } color="primary">
        Annuler
      </Button>
      <Button onClick={ clearAdmin.bind(this,admin.id) } color="secondary">
        Supprimer
      </Button>
    </DialogActions>
    </Dialog> 
  );
}
 
export default DetleteAdminModal;
