import React from 'react';
import { Switch, Route } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import firebase, { db } from '../libs/Firebase'

import Room from './Room'
import User from '../components/User'

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
    this.handleUserClick = this.handleUserClick.bind(this)
  }

  componentDidMount() {
    this.fetchUser()
  }

  handleUserClick(uid) {
    let { history } = this.props

    history.push(`/chat/${uid}`)
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
		let { users } = this.state

    return (
      <>
        <div className={classes.drawer}>
          <List>
            {users.map((user, index) => (
              <User key={user.uid} {...user} onClick={this.handleUserClick}/>
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
