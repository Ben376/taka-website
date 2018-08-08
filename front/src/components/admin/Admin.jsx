
import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import Header from '../../containers/Header';
import Home from '../home/Home';
import Trashes from '../../containers/trashes/Trashes';
import NavBottom from '../navigation/BottomNavbar';
import Maintenance from '../../containers/Maintenance/Maintenance';
import Statistiques from '../stats/Statistiques';
import Administrateurs from './Administrateurs';
import { Route, Switch } from 'react-router-dom';
import Sidebar from '../navigation/Sidebar'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Media from "react-media";
import Grid from '@material-ui/core/Grid';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 5,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 7,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class Admin extends React.Component {
  state = {
    open: false,
  };

  handleDrawerSwitch = () => {
    this.setState({ open: !this.state.open });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes} = this.props;
    return (
      <div>
        <Grid container id="GridPrinc">
          <Grid item xs={12}>
            <Header />
          </Grid>
        </Grid>
        <div className={classes.root}>

          <Media query="(min-width: 1200px)">
            <Drawer
              variant="permanent"
              classes={{
                paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
              }}
              open={this.state.open}
            >
              <div className={classes.toolbar}>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerSwitch}
                >
                  <MenuIcon />
                </IconButton>
              </div>
              <div>

                <Grid item  className={classes.aside}>
                  <Sidebar />
                </Grid>
               
              </div>
            </Drawer>
          </Media>


          <Media query="(max-width: 1200px)">
            <div className={classes.NavBot}>
              <NavBottom id="NavBot" />
            </div>
          </Media>


          <main className={classes.content} style={{maxWidth: "100%",
    overflow: "scroll"}}>
            {/* <div className={classes.toolbar} /> */}
            <Switch>
              <Route exact path='/admin' component={Home} />
              <Route path='/admin/maintenance' component={Maintenance} />
              <Route path='/admin/poubelles' component={Trashes} />
              <Route path='/admin/statistiques' component={Statistiques} />
              <Route path='/admin/administrateurs' component={Administrateurs} />
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Admin);
