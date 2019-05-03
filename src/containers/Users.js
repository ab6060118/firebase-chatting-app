import React from 'react';
import { connect } from 'react-redux'
import { Switch, Route } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import firebase, { db } from '../libs/Firebase'

import UserDetail from './UserDetail'
import User from '../components/User'
import { loadUsers } from '../actions/Users'

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
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

class Users extends React.Component {
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

    history.push(`/users/${uid}`)
  }

  async fetchUser() {
    let { loadUsers } = this.props
    let usersSnap = await db.collection('users').get()
    let users = []

    usersSnap.forEach(userSnap => {
      let user = userSnap.data()
      if(user.uid !== firebase.auth().currentUser.uid) users.push(user)
    })

    loadUsers(users)
  }

  render() {
    let { classes, users } = this.props

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
            <Route path='/users/:uid' component={UserDetail}/>
          </Switch>
        </div>
      </>
    )
  }
}

const mapStateToProps =(state) => ({
	users: state.Users.list
})

const mapDispatchToProps = (dispatch) => ({
	loadUsers: (list) => dispatch(loadUsers(list))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Users))
