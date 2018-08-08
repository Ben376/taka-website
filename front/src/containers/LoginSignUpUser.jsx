import React from 'react';
import {
  Snackbar,
  TextField,
  Button,
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {checkIdent} from '../actions/index';
import './LoginSignUpUser.css'

class LoginSignUpUser extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.handleForgottenPassword = this.handleForgottenPassword.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password2: '',
      serial: '',
      address: '',
      zip_code: '',
      city: '',
      flash: '',
      permission: 'particulier',
      diffusion: 0,
      pwdSecurity: '',
      pwdSame: '',
      validSignUp: false,
      signInUpToggle: false,
      forgotPassword: '',
      open: false,
      vertical: 'bottom',
      horizontal: 'center',
      pwdForgotMessage: '',
      log: '',
      errorMessage: false,
    }
  }

  handleChange(e) {

    if (e.target.name === 'lastname' || e.target.name ==='firstname' || e.target.name === 'city') {
          let textInput = e.target.value;
          textInput = textInput.replace(/[^A-Za-z]/g, "");
          e.target.value = textInput;
    }

    if (e.target.name === 'zip_code') {
          let numberInput = e.target.value;
          numberInput = numberInput.replace(/[^0-9]/g, "");
          e.target.value = numberInput;

          if (e.target.value.length && e.target.value.length < 5) {
            this.setState({ errorMessage: true });
          } else {
            this.setState({ errorMessage: false });      
          }
    }

    this.setState({ [e.target.name]: e.target.value });
  };

   handleKeyPress (e) {
    const value = e.target.value.split('');
        if ( value.length > 4 ) {
              e.preventDefault();
              e.stopPropagation();
        } else {
              return null
        }
  } 

  handleToggle = () => {
    this.setState({ signInUpToggle: !this.state.signInUpToggle })
  }

  handleValidation (event) {
    let isSame = '';
    let newPasswordStrengh = this.state.pwdSecurity;
    let validation = this.state.validSignUp;
    const averageSecurity = new RegExp(/.{6,}/);
    const goodSecurity = new RegExp(/[^a-zA-Z0-9]{1,}/);

    if (event.target.name === 'password') {
        (event.target.value === this.state.password2) ? 
        isSame = '': 
        isSame = 'Mot de passe différents !';

        (event.target.value.match(goodSecurity) && event.target.value.match(averageSecurity)) ? 
        newPasswordStrengh = 'La sécurité de votre mot de passe est suffisante' : 
        event.target.value.match(averageSecurity) ? 
        newPasswordStrengh = 'Complexifiez votre mot de passe !' : 
        newPasswordStrengh = 'Le mot de passe doit contenir au moins 6 caractères';

    } else { 
      (event.target.value === this.state.password) ? 
      isSame = '' : 
      isSame = 'Mot de passe différents !'; 
     }

    (newPasswordStrengh !== 'Le mot de passe doit contenir au moins 6 caractères') ? 
        validation = true : 
        validation = false;

    this.setState({
        [event.target.name]: event.target.value,
        pwdSame: isSame,
        pwdSecurity: newPasswordStrengh,
        validSignUp: validation,
    });
  }

  handleSubmitSignIn(e) {
      e.preventDefault();
      this.props.checkIdent( this.state.email, this.state.password )
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.validSignUp) {
          fetch('/auth/signup', {
            method: 'POST',
            headers: new Headers({'Content-Type':'application/json'}),
            body: JSON.stringify( this.state ),
        })
        .then(res => res.json())
        .then(
          res => {
            this.setState({ flash: res.flash })

            if(res.flash === 'Bienvenue') {
                this.handleToggle()
            }},

            err => {
                this.setState({ flash: err.flash })
                document.querySelector('form').reset()
            }
          ) 
    } else {
          return null
    }
  }
   

  onClick() {
    this.state.forgotPassword === '' ? 
    this.setState({
        forgotPassword: 
        <div>
            <p> Entrez votre adresse e-mail </p>
            <p style={{marginBottom: '15px'}} > afin de réinitialiser votre mot de passe : </p>
            <form method='post' onSubmit={ this.handleForgottenPassword }>
              <input type="email" name="email" placeholder="Entrez votre adresse e-mail" onChange={this.handleChange} required/>
              <input onClick={this.handleClick({vertical: 'bottom', horizontal: 'center'})} type="submit"/>
            </form>
          </div>
      }) : 
    this.setState({forgotPassword: ''})
  }

  handleForgottenPassword(event) {
    event.preventDefault();

    fetch('/sql/forgetPassword', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({ email: this.state.email }),
    }).then(res => res.json()).then(res => 
      this.setState({ log: res.log }), 
      err => this.setState({log: err.log}));
      this.setState({ forgotPassword: '' });
  }

  handleClick = state => () => {
    const isEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi;
    isEmail.test( this.state.email ) && this.setState({ open: true, ...state });
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {vertical, horizontal, open} = this.state;
    const styleTextField = {margin: '10px', display: 'block'};
    const styleLabel = {marginBottom: '10px', display: 'block', textDecoration: 'underline'};
    const styleSpace = {marginBottom: '20px'};

    return (<Grid container alignItems='center' direction='column' justify='center' style={{
        margin: '1rem'
      }}>

      <Paper style={{
          color: '#565555',
          textAlign: 'center'
        }}>

        <Grid item style={{
            margin: '20px'
          }}>

          <div className='register-box'>
            <input type='checkbox' id='form-switch' checked={this.state.signInUpToggle} onChange={this.handleToggle}/>
            <h2>
              Identifiez-vous
            </h2>
            <AccountCircle style={{
                fontSize: 75,
                color: '#58b0a1'
              }}/>

          <form id='login-form' onSubmit={this.handleSubmitSignIn.bind(this)} method='post'>
            <Typography color='error'>
                {this.props.loggedIn.message}
            </Typography>
            <p>
              Identifiant : 
            </p>
            <TextField style={styleTextField} onChange={this.handleChange.bind(this)} type="email" name="email" placeholder="Adresse e-mail" value={this.state.name} required/>
            <p>
              Mot de passe : 
            </p>
          <TextField style={styleTextField} onChange={this.handleChange.bind(this)} type="password" name="password" placeholder="Votre Mot de Passe" value={this.state.password} required/>
        
        <div>
          <Button color="primary" variant="raised" style={{backgroundColor: '#58b0a1', marginBottom: '15px'}} type='submit'> Connexion  </Button>
        </div>

          <label style={{textDecoration: 'underline'}} htmlFor='form-switch'><span> S'inscrire </span></label>
        </form>

        <form id='register-form' method='post' onSubmit={this.handleSubmit.bind(this)}>
          <Typography color='error'>
            { this.state.flash }
          </Typography>
          <Typography color='error'>
            { this.state.pwdSame }
          </Typography>
          <Typography>
            { this.state.pwdSecurity }
          </Typography>
          <Typography>
            { this.state.errorMessage ? <p style={{color: 'red'}} > Code postal: 12345 </p> : null }
          </Typography>

          <h4> Création d'un compte </h4>
          <div style={styleSpace} >
          <TextField style={styleTextField} onChange={this.handleChange.bind(this)} type="text" placeholder="Nom" name="lastname" value={this.state.lastname} required />
          <TextField style={styleTextField} onChange={this.handleChange.bind(this)} type="text" placeholder="Prénom" name="firstname" value={this.state.firstname} required />
          <TextField style={styleTextField} onChange={this.handleChange.bind(this)} type="email" placeholder="e-mail" name="email" value={this.state.email} required />
          <TextField style={styleTextField} onChange={this.handleChange.bind(this)} type="text" placeholder="Adresse" name="address" value={this.state.address} required />
          <TextField style={styleTextField} onKeyPress={this.handleKeyPress.bind(this)} onChange={this.handleChange.bind(this)} type="text" placeholder="Code Postal" name="zip_code" value={this.state.zip_code} required />
          <TextField style={styleTextField} onChange={this.handleChange.bind(this)} type="text" placeholder="Ville" name="city" value={this.state.city} required />
          <TextField style={styleTextField} onChange={this.handleValidation.bind(this)} type="password" placeholder="Mot de Passe" name="password" value={this.state.password} required />
          <TextField style={styleTextField} onChange={this.handleValidation.bind(this)} type="password" placeholder="Confirmation" name="password2" value={this.state.password2} required />
          </div>

          <label > <p>Acceptez-vous que votre adresse postale soit <br/> utilisée par l'administration Taka à des fins statistiques ?</p> <p> (Celle-ci restera confidentielle) </p> </label>

          <select style={styleSpace} id="mySelect" name='diffusion' onChange={this.handleChange.bind(this)} >
            <option value="0"> Non </option>
            <option value="1"> Oui </option>
          </select>

          <label style={styleTextField} > Vous êtes ? </label>

          <select style={styleSpace}  id="mySelect2" name='permission' onChange={this.handleChange.bind(this)} >
            <option value="particulier"> Particulier </option>
            <option value="professionnel"> Professionnel </option>
          </select>

        <div style={styleTextField} >
        {
         (this.state.pwdSame && this.state.pwdSame === 'Mot de passe différents !') || this.state.pwdSecurity === 'Complexifiez votre mot de passe !' || this.state.errorMessage ?
          <Button disabled= 'false' color="primary" variant="raised" style={{margin:'10px', backgroundColor: '#58b0a1'}} type='submit'> Envoyer </Button> :
          <Button color="primary" variant="raised" style={{margin:'10px', backgroundColor: '#58b0a1'}} type='submit'> Envoyer </Button>
        }
        </div>
            <label style={styleLabel} htmlFor='form-switch'> Déjà membre ? <br/> Cliquez ici </label>
        </form>

      </div>
      <div style={styleTextField}>
          <label style={styleLabel} onClick={this.onClick}> Mot de passe oublié ? </label>
          {this.state.forgotPassword}
      </div>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.state.log}</span>}
      />
      </Grid>
      </Paper>
    </Grid>);
  }
}

const mapStateToProps = state => ({ loggedIn: state.loggedIn });

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ checkIdent }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignUpUser);
