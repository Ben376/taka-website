import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import orange from '@material-ui/core/colors/orange';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';

import WarningCard from '../../components/home/WarningCard';
import warning from '../../images/maintenance/warning.png'

const decos = [
  {
    src: warning,
    style: {
      card: {
        backgroundColor: yellow[700]
      },
      avatar: {
        margin: 'auto',
      },
      text: {
        padding: 2,
        fontSize: 12,
        color: red[50],
        textAlign: 'center'
      }
    }
  }, {
    src: warning,
    style: {
      card: {
        backgroundColor: orange[700]
      },
      avatar: {
        margin: 'auto',

      },
      text: {
        padding: 2,
        fontSize: 12,
        color: red[50],
        textAlign: 'center'
      }
    }
  }, {
    src: warning,
    style: {
      card: {
        backgroundColor: red[700]
      },
      avatar: {
        margin: 'auto',
      },
      text: {
        padding: 2,
        fontSize: 12,
        color: red[50],
        textAlign: 'center'
      }
    }
  },

];



const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});


class Warning extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      line0: 0,
      type0:"MAINTENANCE AUTOMATIQUE",
      line1: 0,
      type1:"MAINTENANCE MANUELLE",
      line2:0,
      type2:"MAINTENANCE CRITIQUE",

    }
  }

  componentDidMount() {
    fetch('/api/yellowWarning', { headers: { Authorization: 'Bearer ' + this.props.loggedIn.token } })
      .then(res => res.json())
      .then(res => {
        this.setState({
          line0: res.numYellow,
        })
      },
        err => console.log(err)
      );

    fetch('/api/orangeWarning', { headers: { Authorization: 'Bearer ' + this.props.loggedIn.token } })
      .then(res => res.json())
      .then(res => {
        this.setState({
          line1: res.numOrange,
        })
      },
        err => console.log(err)
      );

    fetch('/api/redWarning', { headers: { Authorization: 'Bearer ' + this.props.loggedIn.token } })
      .then(res => res.json())
      .then(res => {
        this.setState({
          line2: res.numRed,
        })
      },
        err => console.log(err)
      );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          {decos.map((value, i) => (
            <Grid key={i} item xs={12} sm={4}>
              <WarningCard style={decos[i].style} src={decos[i].src} line={this.state["line"+i]} type={this.state["type"+i]} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

Warning.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
	return {
		loggedIn: state.loggedIn
	}
}

export default connect(mapStateToProps)(withStyles(styles)(Warning));
