import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ChangeAdminPassword from './ChangeAdminPassword';
import Icon from '@material-ui/core/Icon';
import VpnKey from '@material-ui/icons/VpnKey'

const styles = theme => ({
  button: {
    backgroundColor: '#58b0a1',
    margin: '1rem',
  },
});

const EditAdminModal = (props) => {

  const {
    admin,
    editAdminModal,
    editAdmin,
    handleEditAdminModal,
    handleChange,
    newEmail,
    newFirstname,
    newLastname,
    changedPassword,
    changedPassword2,
    passwordChangeModal,
    newPasswordStrengh,
    sameChangedPassword,
    classes,
    handleChangePassword,
    handleChangeAdminPasswordModal,
    changePassword,
  } = props;

  return (
    <Dialog
    open={ editAdminModal }
    onClose={ handleEditAdminModal }
    aria-labelledby="form-dialog-title"
    >
    <DialogTitle id="form-dialog-title">Modifier un collaborateur</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        name="newEmail"
        label="Adresse mail"
        type="email"
        fullWidth
        value= { newEmail }
        onChange={ handleChange }
      />
      <TextField
        autoFocus
        margin="dense"
        name="newFirstname"
        label="Prénom"
        type="text"
        fullWidth
        value=  { newFirstname }
        onChange={ handleChange }
      />
      <TextField
        autoFocus
        margin="dense"
        name="newLastname"
        label="Nom"
        type="text"
        fullWidth
        value= { newLastname }
        onChange={ handleChange }
      />
    <Button variant="fab" aria-label="send" className={ classes.button } onClick={ handleChangeAdminPasswordModal } >
        <Icon><VpnKey /></Icon>
      </Button>
    </DialogContent>
    <DialogActions>
      <Button onClick={ handleEditAdminModal } color="primary">
        Annuler
      </Button>
      <Button onClick={ editAdmin.bind(this, admin.id ) } color="primary">
        Modifier
      </Button>
    </DialogActions>
    <ChangeAdminPassword 
      passwordChangeModal= { passwordChangeModal}
      changedPassword= { changedPassword }
      changedPassword2= { changedPassword2 }
      newPasswordStrengh= { newPasswordStrengh }
      sameChangedPassword= { sameChangedPassword }
      handleChange= { handleChange }
      handleChangeAdminPasswordModal= { handleChangeAdminPasswordModal }
      handleChangePassword= { handleChangePassword }
      changePassword= { changePassword }
      id= { admin.id }
    />
    </Dialog> 
  );
}
 
export default withStyles(styles)(EditAdminModal);
