import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({})

const MyMessage = ({content}) => (
  <Paper component='span' style={{
    alignSelf: 'flex-end',
    padding: '10px',
    margin: '10px 20px',
    background: 'rgb(141, 232, 138)',
  }}>{content}</Paper>
)

class Message extends React.Component {
  render() {
    let { sender, reciver, type, content } = this.props
    let Component

    if(type === 'text') Component = MyMessage

    return (
      <Component {...this.props} />
    )

  }
}

export default withStyles(styles)(Message)
