import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: theme.mixins.toolbar,
  button: {
  }
})

class Room extends React.Component {
  render() {
    let { id } = this.props.match.params

    return (
      <div>
        Chatting with {id}
      </div>
    )
  }
}

export default withStyles(styles)(Room)
