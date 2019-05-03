import './Home.css'

import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import Chat from './Chat'
import Users from './Users'
import firebase from '../libs/Firebase'

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
  constructor() {
    super()

    this.state = {
      isMenuOpend: false,
    }

    this.handlerMenuItemClick = this.handlerMenuItemClick.bind(this)
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.goPage = this.goPage.bind(this)
  }

  handlerMenuItemClick(e) {
    this.goPage(e.currentTarget.dataset.path)
  }

  goPage(path) {
    let { history } = this.props

    console.log(path);

    history.push(`/${path}`)
  }

  toggleDrawer(open) {
    let { isMenuOpend } = this.state

    this.setState({ isMenuOpend: !isMenuOpend })
  }

  render() {
    let { isMenuOpend } = this.state
    let { classes } = this.props
    let { photoURL } = firebase.auth().currentUser

    return (
      <div className="home">
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.appBarText}>Test</Typography>
            <Button color="inherit">Login</Button>
            <Avatar alt="Remy Sharp" src={photoURL} className={classes.avatar} />
          </Toolbar>
        </AppBar>
        <div className={classes.toolbar}></div>
        <Drawer open={isMenuOpend} onClose={this.toggleDrawer}>
          <div onClick={this.toggleDrawer}>
            <List>
              {['Friends', 'Users', 'Setting'].map((text, index) => (
                <ListItem data-path={text.toLowerCase()} button key={text} onClick={this.handlerMenuItemClick}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
        <div className="body">
          <Switch>
            <Route path="/chat" component={Chat}/>
            <Route path='/users' component={Users}/>
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
