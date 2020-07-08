import React, { Component } from 'react';
import './createpraxspace.scss';
import { withWebRTC } from 'react-liowebrtc';

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMsg: ''
    };
  }
    
copyAlert = () => {

  var range, selection, worked;
let buttonAlert = document.getElementById("copyAlert")
  if (document.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(buttonAlert);
    range.select();
  } else if (window.getSelection) {
    // selection = buttonAlert
    range = document.createRange();
    range.selectNodeContents(buttonAlert);
  }
  
  try {
    document.execCommand('copy');
    alert('Paste this string in the blue box below, then double-click the Join button! ' + range);
  
  }
  catch (err) {
    alert('unable to copy text');
  }
}

  generateChats = () => {
    if(this.chatBox && this.chatBox.scrollHeight !== undefined || null ) {
      setTimeout(() => { this.chatBox.scrollTop = this.chatBox.scrollHeight; }, 2);
    }
    return this.props.chatLog.map((item) => (
      <div className="chat" key={`chat-${item.name}-${item.timestamp}`}>
        <b className="name" style={{ color: item.alert ? '#f2c84b' : '#38A69B' }}>{item.name}</b> <button id="copyAlert" onClick={()=>this.copyAlert()} className="msg">{item.message}</button>
      </div>
    ));
  }

  handleSend = (chatMsg) => {
    this.props.webrtc.shout('chat', chatMsg);
    this.props.onSend(chatMsg);
  }

  handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      this.handleSend(this.state.inputMsg);
      this.setState({ inputMsg: '' });
    }
  }

  handleInputChange = (evt) => this.setState({ inputMsg: evt.target.value });

  render() {
    const { chatLog } = this.props;
    return (
      <div className="container">
        <div className="chatHeader">
          <h2 className="titleChat">Share Your Room Key</h2>
          <hr />
        </div>
        <div className="chatBox" ref={(div) => this.chatBox = div}>
          {chatLog.length ? this.generateChats() : (
            <div className="info">
              <p>Share your room id with other players in this chat area.</p>
            </div>
          )}
        </div>
        <hr />
        <div className="bottomBar">
          <input className="chatInput" type="text" placeholder="Type a message..." onKeyUp={this.handleKeyUp} onChange={this.handleInputChange} value={this.state.inputMsg} />
        </div>
      </div>
    );
  }
}

export default withWebRTC(ChatBox);