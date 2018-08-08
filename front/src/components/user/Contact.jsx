import React, { Component } from 'react';
import {TextField, Button, Snackbar} from '@material-ui/core';

import './Contact.css'

class Contact extends Component {
  constructor(props) {
    super(props);
    this.updateForm = this.updateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      subject: '',
      message: '',
      open: false,
      vertical: 'bottom',
      horizontal: 'left',
    };
  }

  updateForm(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch("/sql/sendMail", {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        subject: this.state.subject,
        message: this.state.message,
        firstname: this.props.firstname,
        lastname: this.props.lastname,
        email: this.props.email,
        city: this.props.city,
      }),
    })
    document.querySelector('form').reset();
  }

  handleClick = state => () => {
    (this.state.subject && this.state.message) && this.setState({ open: true, ...state });
    setTimeout(() => this.setState({ open: false }),3000);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const classes = this.props
    const { vertical, horizontal, open } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField id="with-placeholder" underlinestyle={{borderColor: 'orange'}} label="Sujet" name="subject" required margin="normal" onChange={this.updateForm}/><br/>
          <TextField id="multiline-static" label="Message" multiline rows="4" name="message" required margin="normal" onChange={this.updateForm}/><br/>
          <p>* Champs requis</p><br/>
          <Button onClick={this.handleClick({ vertical: 'bottom', horizontal: 'left'})} variant="contained" type="submit" className={classes.button} >
            Envoyer
          </Button>
        </form>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Votre message a bien été envoyé !</span>}
        />
      </div>
    )
  }
}

export default Contact;
