import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  avatar: {
    width: 120,
    height: 120
  },
  name: {
    fontSize: 24,
    marginTop: 10,
  }
}

class UserDetail extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    let { uid } = this.props
  }

  render() {
    let { photoURL, displayName, classes } = this.props

    return (
      <div style={styles.container}>
        <Avatar alt="Remy Sharp" src={photoURL} style={styles.avatar} />
        <Typography style={styles.name}>{displayName}</Typography>
        <Button  variant="contained" color="primary" className={classes.button}>Add friend</Button>
      </div>
    )
  }
}

export default withStyles(styles)(UserDetail)
