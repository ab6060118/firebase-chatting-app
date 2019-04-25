import React from 'react';
import Login from './containers/Login'
import Home from './containers/Home'
import './App.css';
import firebase, { db } from './libs/Firebase'
import { connect } from 'react-redux'
import {
  Switch,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";

// import { updateUser } from './actions/User'

const PrivateRoute = ({ component: Component, ...rest  }) => {
  return (
    <Route {...rest} render={props => firebase.auth().currentUser ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login'
      }} />
    )}/>
  )
}

class App extends React.Component {
  componentDidMount() {
    let { history, /* updateUser */ } = this.props

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        let docRef = db.collection('users').doc(user.uid)
        docRef.get().then(doc => {
          if(!doc.exists) {
            docRef.set({
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              uid: user.uid,
            })
          }
        })
        history.push('/')
      }
      else {
        history.push('/login')
      }
    })
  }

  render() {
    return (
      <Switch>
        <Route path='/login' component={Login}/>
        <PrivateRoute path='/' component={Home}/>
      </Switch>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  // updateUser: (user) => dispatch(updateUser(user))
})

export default connect(undefined, mapDispatchToProps)(withRouter(App));
