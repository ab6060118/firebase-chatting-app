import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Message from './Message'

const styles = theme => ({
  messageList: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  keyboard: {
    padding: 15,
    flexShrink: 0,
    flexBase: 0,
    display: 'flex',
  },
  typeArea: {
    flexGrow: 1,
    borderRadius: 10,
    outline: 'none',
    fontSize: '16px',
    padding: 15,
  },
})

class Room extends React.Component {
  constructor() {
    super()
    this.state = {
      message: '',
      list: [{
        type: 'text',
        content: 'sdfsdf',
      }],
    }

    this.handleMessageChange = this.handleMessageChange.bind(this)
    this.handleMessageKeydown = this.handleMessageKeydown.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }

  handleMessageChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  handleMessageKeydown(e) {
    if(e.keyCode === 13) {
      if(!e.shiftKey) {
        e.preventDefault()
        this.sendMessage()
      }
    }
  }

  sendMessage() {
    let { message } = this.state
    this.setState({ message: '' })
  }

  render() {
    let { message, list } = this.state
    let { classes, match } = this.props
    let { uid } = match.params

    return (
      <>
        <div className={classes.messageList}>
          {
            list.map((item, index) => <Message key={index} {...item} />)
          }
        </div>
        <div className={classes.keyboard}>
          <OutlinedInput
            multiline
            fullWidth
            value={message}
            rowsMax={3}
            labelWidth={0}
            onKeyDown={this.handleMessageKeydown}
            onChange={this.handleMessageChange}
            placeholder='Press Shift + Enter add new line.'/>
          <IconButton classes={classes.sendIcon}>
            <SendIcon />
          </IconButton>
        </div>
      </>
    )
  }
}

export default withStyles(styles)(Room)
