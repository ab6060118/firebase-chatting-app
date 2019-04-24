import React from 'react';
import { Switch, Route } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import firebase, { db } from '../libs/Firebase'

import Room from './Room'

const drawerWidth = 220

const styles = theme => ({
  drawer: {
    flexShrink: 0,
    width: drawerWidth,
    borderRight: '1px solid #2f2f2f',
  },
  drawerPaper: {
    flexGrow: 1,
    width: drawerWidth,
  }
})

class Chat extends React.Component {
  constructor() {
    super()

    this.state = { 
      users: []
    }

    this.fetchUser = this.fetchUser.bind(this)
  }

  componentDidMount() {
    this.fetchUser()
  }

  async fetchUser() {
    let usersSnap = await  db.collection('users').get()
    let users = []

    usersSnap.forEach(userSnap => {
      let user = userSnap.data()
      if(user.uid !== firebase.auth().currentUser.uid) users.push(user)
    })

    this.setState({users: users})
  }

  render() {
    let { classes } = this.props

    console.log(this.state);

    return (
      <>
        <div className={classes.drawer}>
          <List>
            {['Chatting room', 'Setting'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
        <div className={classes.content}>
          <Switch>
            <Route path='/chat/:id' component={Room}/>
          </Switch>
        </div>
      </>
    )
  }
}

export default withStyles(styles)(Chat)
