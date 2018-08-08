import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '50%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  button: {
    backgroundColor: '#58b0a1',
    margin: '1rem',
    float: 'right',
  },
  center: {
    justifyContent: 'center',
    padding: '1rem',
  },
  right: {
    margin: '1rem',
    float: 'right',
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});


const ModifyUser = (props) => {

  const {
    passwordChangeModal,
    classes,
    changedPassword,
    changedPassword2,
    newPasswordStrengh,
    sameChangedPassword,
    handleChangeAdminPasswordModal,
    handleChangePassword,
    changePassword,
    id,
  } = props;

  return (  
    <Dialog
    open={ passwordChangeModal }
    TransitionComponent={ Transition }
    keepMounted
    onClose={ handleChangeAdminPasswordModal }
    aria-labelledby="form-dialog-title"
    >
    <DialogTitle id="form-dialog-title">Changement de mot de passe</DialogTitle>
      <div className={ classes.center } >
        <FormControl className={classes.formControl} aria-describedby="changedPassword-helper-text">
          <Input id="changedPassword-helper" type='password' value={ changedPassword } onChange={ handleChangePassword } name='changedPassword' />
          <FormHelperText id="changedPassword-helper-text">Nouveau mot de passe</FormHelperText>
        </FormControl>
      </div>
      <div className={ classes.center } >
        <FormControl className={classes.formControl} aria-describedby="changedPassword2-helper-text">
          <Input id="changedPassword2-helper" type='password' value={ changedPassword2 } onChange={ handleChangePassword } name='changedPassword2' />
          <FormHelperText id="changedPassword2-helper-text">Vérification du mot de passe</FormHelperText>
        </FormControl>
      </div>
      <Typography className={ classes.center } >
        { (newPasswordStrengh === 'poor') ?
          'Votre mot  de passe doit contenir au moins 6 caratères' :
          (newPasswordStrengh === 'average') ?
          'Ajouter un caractère spéciale pour améliorer votre mot de passe' :
          'Mot de passe conforme'
        }
      </Typography>
      <Typography className={ classes.center }>
        { !sameChangedPassword ? 'Vos mots de passe sont différents' : '' }
      </Typography>
    <DialogActions>
      <Button onClick={ handleChangeAdminPasswordModal } color="primary">
        Annuler
      </Button>
      <Button onClick={ changePassword.bind(this,id) } disabled={ !sameChangedPassword || (newPasswordStrengh === 'poor') } color="primary">
        Confirmer
      </Button>
    </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(ModifyUser);
