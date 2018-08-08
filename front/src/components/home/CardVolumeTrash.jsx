import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const styles = {
	card: {
    maxHeight: '60vh',
		textAlign: 'center'
  }, 
  avatar: {
    margin: 'auto',
    paddingTop: 5,
  },
	media: {

	}
};

function CardVolumeTrash(props) {
  const {image,classes,value} = props;
  return (
    <div>
      <Card className={classes.card}>
        <Avatar src={image} style={styles.avatar}>
        </Avatar>
        <CardMedia
          className={classes.media}
        />
        <CardContent>
        <Typography gutterBottom variant="headline" component="h2"
          style={{
            fontSize: '0.8em',
            fontWeight: 500}}>
          {value.toLocaleString()} m³
          </Typography>
          <Typography 
          style={{
            fontSize: '0.7em',}}
          component="span">
            Vol. total traité
          </Typography>
        </CardContent>
      </Card>
    </div>
  );

}

CardVolumeTrash.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardVolumeTrash);
