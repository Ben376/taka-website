import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Clear from '@material-ui/icons/Clear';
import Create from '@material-ui/icons/Create';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  button: {
    backgroundColor: '#58b0a1',
    margin: '1rem',
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  pos: {
    marginBottom: 12,
  },
};

function AdminCard(props) {
  const { classes, admin, handleEditAdminModal, handleDeleteAdminModal } = props;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline" component="p">
            Identifiant: { admin.email }
          </Typography>
          <Typography variant="headline" component="p">
            Nom: { admin.firstname } { admin.lastname }
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="fab" aria-label="edit" onClick={ handleEditAdminModal.bind(admin) } className={classes.button} >
            <Icon><Create /></Icon>
          </Button>
          <Button variant="fab" aria-label="edit" onClick={ handleDeleteAdminModal.bind(admin) } className={ classes.button } >
            <Icon><Clear /></Icon>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

AdminCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminCard);