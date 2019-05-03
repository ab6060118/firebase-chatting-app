import React from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

import UserDetail from '../components/UserDetail'

const drawerWidth = 220

const styles = theme => ({
})

class UserDetailContainer extends React.Component {
  constructor() {
    super()

    this.state = { 
      user: {}
    }
  }

  componentDidMount() {
    let { match, users } = this.props
    let { uid } = match.params
    let user = users.find(user => user.uid === uid)

    this.setState({ user })
  }

  handleUserClick(uid) {
  }

  render() {
    let { classes } = this.props
    let { user } = this.state
    let { photoUrl, displayName, email } = user

    return (
      <UserDetail {...user}/>
    )
  }
}

const mapStateToProps =(state) => ({
  users: state.Users.list
})

export default connect(mapStateToProps)(withStyles(styles)(UserDetailContainer))
