import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class User extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    let { uid, onClick } = this.props

    onClick(uid)
  }

  render() {
    let { photoURL, displayName, onClick } = this.props

    return (
      <ListItem button onClick={this.handleClick}>
        <Avatar alt="Remy Sharp" src={photoURL} />
        <ListItemText primary={displayName} />
      </ListItem>
    )
  }
}
