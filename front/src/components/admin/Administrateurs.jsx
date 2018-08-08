import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AdminCard from "./AdminCard";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Add from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditAdminModal from './EditAdminModal';
import DeleteAdminModal from './DeleteAdminModal';

const styles = {
  button: {
    backgroundColor: '#58b0a1',
    margin: '1rem',
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  center: {
    justifyContent: 'center',
    padding: '1rem',
  },
};

class Administrateurs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admins: [],
      addAdminModal: false,
      deleteAdminModal: false,
      editAdminModal: false,
      passwordChangeModal: false,
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      newFirstname: '',
      newLastname: '',
      newEmail: '',
      passwordConfirmation: '',
      passwordStrengh: 'poor',
      samePassword: true,
      adminToShow: {},
      changedPassword: '',
      changedPassword2:'',
      newPasswordStrengh: 'poor',
      sameChangedPassword: true,
    }
  this.handleAddAdminModal = this.handleAddAdminModal.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handlePassword = this.handlePassword.bind(this);
  }

componentDidMount() {
  this.getAdmin()
}

getAdmin = () => {
   fetch('/sql/admins')
  .then(res => res.json())
  .then( res => {
    this.setState({
      admins: res
    })
  })
}

handleAddAdminModal = () => {
  this.setState({
    addAdminModal: !this.state.addAdminModal
  })
}

handleChangeAdminPasswordModal = () => {
  this.setState({
    passwordChangeModal: !this.state.passwordChangeModal
  })
}

handleDeleteAdminModal = (index) => {
  const adminToShow = this.state.deleteAdminModal ? {} : this.state.admins[index];
  this.setState({
    deleteAdminModal: !this.state.deleteAdminModal,
    adminToShow,
  })
}

handleEditAdminModal = (index) => {
  const adminToShow = this.state.editAdminModal ? {} : this.state.admins[index];
    let newFirstname = adminToShow.firstname;
    let newLastname = adminToShow.lastname;
    let newEmail = adminToShow.email;
  this.setState({
    editAdminModal: !this.state.editAdminModal,
    adminToShow,
    newFirstname,
    newLastname,
    newEmail,
  })
}

handleChange = event => {
  this.setState({
    [event.target.name] : event.target.value
  })
}

handlePassword = event => {
  let isSame = false;
  let newPasswordStrengh = this.state.passwordStrengh;
  const averageSecurity = new RegExp(/.{6,}/);
  const { name, value } = event.target;
  const goodSecurity = new RegExp(/[^a-zA-Z0-9]{1,}/);

  if (name === 'password') {
    isSame = (value === this.state.passwordConfirmation);
    (value.match(goodSecurity) && value.match(averageSecurity)) ?
    newPasswordStrengh = 'good' :
    value.match(averageSecurity) ?
    newPasswordStrengh = 'average' :
    newPasswordStrengh = 'poor';
  } else {
    isSame = (value === this.state.password);
  }
  this.setState({
    [name] : value,
    samePassword : isSame,
    passwordStrengh : newPasswordStrengh
  });
}

handleChangePassword = event => {
  let isSame = false;
  let newPasswordStrengh = this.state.newPasswordStrengh;
  const averageSecurity = new RegExp(/.{6,}/);
  const { name, value } = event.target;
  const goodSecurity = new RegExp(/[^a-zA-Z0-9]{1,}/);

  if (name === 'changedPassword') {
    isSame = (value === this.state.changedPassword2);
    (value.match(goodSecurity) && value.match(averageSecurity)) ?
    newPasswordStrengh = 'good' :
    value.match(averageSecurity) ?
    newPasswordStrengh = 'average' :
    newPasswordStrengh = 'poor';
  } else {
    isSame = (value === this.state.changedPassword);
  }
  this.setState({
    [name] : value,
    sameChangedPassword : isSame,
    newPasswordStrengh
  });
}

clearAdmin = id => {
  fetch('/sql/deleteAdmin',
  {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type':'application/json'
    }),
    body: JSON.stringify({ id })
  })
  .then(res => res.json())
  .then( res => {
    this.setState({
      deleteAdminModal: false,
      message: res.message,
    })
  })
  .then(() => this.getAdmin())
}

editAdmin = id => {
  fetch('/sql/changeAdmin',
  {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      firstname: this.state.newFirstname,
      lastname: this.state.newLastname,
      email: this.state.newEmail,
      id
    })
  })
  .then( res => res.json())
  .then( res => {
    this.setState({
      editAdminModal: false,
      message: res.message
    })
  })
  .then( ()=> this.getAdmin())
}

addAdmin = (firstname, lastname, email, password) => {
  fetch('/sql/addAdmin',
  {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ firstname, lastname, email, password })
  })
  .then(res => res.json())
  .then( res => {
    this.setState({
      message: res.message,
      addAdminModal: false,
    })
  })
  .then( () => this.getAdmin())
}

changePassword = id => {
  fetch('/sql/changeAdminPassword',
  {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      password: this.state.changedPassword,
      id
    })
  })
  .then(res => res.json())
  .then(res => {
    this.setState({
      message: res.message,
      passwordChangeModal: false,
    })
  })
  .then(() => this.getAdmin())
}

  render() {
    const { classes } = this.props;
    const { admins,
      firstname,
      lastname,
      email,
      password,
      newFirstname,
      newLastname,
      newEmail,
      adminToShow,
      passwordStrengh,
      samePassword,
      editAdminModal,
      deleteAdminModal,
      passwordChangeModal,
      sameChangedPassword,
      newPasswordStrengh
    } = this.state;

    return (
	    <div style={{textAlign:'center'}}>
		    <h1 style={{borderStyle:'solid',borderRadius:5,color:'#474747'}}>ADMINISTRATEURS</h1>
          <Button variant="fab" aria-label="edit" onClick={ this.handleAddAdminModal } className={classes.button} >
            <Icon><Add /></Icon>
          </Button>
          <Dialog
            open={this.state.addAdminModal}
            onClose={this.handleAddAdminModal}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Enregistrer un nouveau collaborateur</DialogTitle>
            <Typography className={ classes.center } >
              { (passwordStrengh === 'poor') ?
                'Votre mot  de passe doit contenir au moins 6 caratères' :
                (passwordStrengh === 'average') ?
                'Ajouter un caractère spéciale pour améliorer votre mot de passe' :
                'Mot de passe conforme'
              }
            </Typography>
            <Typography className={ classes.center }>
              { !samePassword ? 'Vos mots de passe sont différents' : '' }
            </Typography>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="firstname"
                label="Prénom"
                type="text"
                fullWidth
                onChange={ this.handleChange }
              />
              <TextField
                autoFocus
                margin="dense"
                name="lastname"
                label="Nom"
                type="text"
                fullWidth
                onChange={ this.handleChange }
              />
              <TextField
                autoFocus
                margin="dense"
                name="email"
                label="Addresse mail"
                type="email"
                fullWidth
                onChange={ this.handleChange }
              />
              <TextField
                autoFocus
                margin="dense"
                name="password"
                label="Mot de passe"
                type="password"
                fullWidth
                onChange={ this.handlePassword }
              />
              <TextField
                autoFocus
                margin="dense"
                name="passwordConfirmation"
                label="Confirmer votre mot de passe"
                type="password"
                fullWidth
                onChange={ this.handlePassword }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={ this.handleAddAdminModal } color="primary">
                Annuler
              </Button>
              <Button onClick={ this.addAdmin.bind(this, firstname, lastname, email, password ) } color="primary" disabled={ !samePassword || (passwordStrengh === 'poor') || (firstname === '') || (lastname=== '') || (email=== '') } >
                Ajouter
              </Button>
            </DialogActions>
          </Dialog>
          <Grid container spacing={ 16 } >
            { admins.length > 0 && admins.map((admin, index) => {
              return <Grid item xs={ 12 } md={ 6 } key={ admin.id } >
                <AdminCard
                  admin={ admin }
                  key={ admin.id }
                  index={ index }
                  editAdminModal= { editAdminModal }
                  handleEditAdminModal= { this.handleEditAdminModal.bind(this, index) }
                  handleDeleteAdminModal= { this.handleDeleteAdminModal.bind(this, index) }
                  handleChange= { this.handleChange }
                  handlePassword= { this.handlePassword }
                />
              </Grid>
            }) }
          </Grid>
          <EditAdminModal
            admin={ adminToShow}
            editAdminModal= { editAdminModal }
            handleEditAdminModal= { this.handleEditAdminModal }
            handleChange= { this.handleChange }
            editAdmin= { this.editAdmin }
            newFirstname= { newFirstname }
            newLastname= { newLastname }
            newEmail= { newEmail }
            handleChangePassword = { this.handleChangePassword }
            handleChangeAdminPasswordModal= { this.handleChangeAdminPasswordModal }
            passwordChangeModal = { passwordChangeModal }
            sameChangedPassword = { sameChangedPassword }
            newPasswordStrengh = { newPasswordStrengh }
            changePassword = { this.changePassword }
          />
          <DeleteAdminModal
            admin={ adminToShow}
            deleteAdminModal= { deleteAdminModal }
            handleDeleteAdminModal= { this.handleDeleteAdminModal }
            clearAdmin = { this.clearAdmin }
          />
      </div>
    );
  }
}

Administrateurs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Administrateurs);
