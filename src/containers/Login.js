import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom";
import firebase from '../libs/Firebase'
import './Login.css'

const styles = {
  button: {
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false
    }

    this.handleLoginClick = this.handleLoginClick.bind(this)
  }

  async handleLoginClick() {
    const provider = new firebase.auth.GoogleAuthProvider()

    try {
      await firebase.auth().signInWithPopup(provider)
    }
    catch(e) {
      console.log(e);
    }
  }

  render() {
    let { classes } = this.props
    let { isLoading } = this.state

    if(firebase.auth().currentUser) return <Redirect to='/' />

    return (
      <div className="login">
        <Button variant="contained" className={classes.button} onClick={this.handleLoginClick} disabled={isLoading}>
          Login with Google
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(Login)
