import React from 'react';
import { Switch, Route } from "react-router-dom";
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

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
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  }
})

class Chat extends React.Component {
  handleUserClick(uid) {
    let { history } = this.props

    history.push(`/chat/${uid}`)
  }

  render() {
    let { classes, friends } = this.props

    return (
      <>
        <div className={classes.drawer}>
          <List>
            {friends.map((friend, index) => (
              <User key={friend.uid} {...friend} onClick={this.handleUserClick}/>
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

const mapStateToProps = (state) => ({
  friends: state.Friends.list
})

export default connect(mapStateToProps)(withStyles(styles)(Chat))
