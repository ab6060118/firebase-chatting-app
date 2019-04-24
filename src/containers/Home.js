import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'

import './Home.css'
import firebase from '../libs/Firebase'
import Chat from './Chat'

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: theme.mixins.toolbar,
  body: {
    display: 'flex',
  },
  appBarText: {
    flexGrow: 1,
  }
})

class Home extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    let { classes } = this.props
    let { photoURL } = firebase.auth().currentUser

    return (
      <div className="home">
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.appBarText}>Test</Typography>
            <Button color="inherit">Login</Button>
            <Avatar alt="Remy Sharp" src={photoURL} className={classes.avatar} />
          </Toolbar>
        </AppBar>
        <div className={classes.toolbar}></div>
        <div className="body">
          <Switch>
            <Route path="/chat" component={Chat}/>
            <Redirect to="/chat" />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.User
})

export default connect(mapStateToProps)(withStyles(styles)(Home))
