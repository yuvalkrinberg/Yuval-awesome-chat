import React from 'react';
import { Container, FormControl, InputGroup } from 'react-bootstrap';
import { Button, Icon } from 'semantic-ui-react';
import { Message, MessageText } from '@livechat/ui-kit';
import MyMessage from './MyMessage';

const MessageList = ({ msgHistory, user, currentMsg, handleFormChange, handleSendMessage }) => (
  <>
    <Container className="message-list-container">
      {msgHistory.map((message, i) => ((i > 0 && msgHistory[i - 1].user.username === message.user.username)
        ? <Message isOwn={user.username === message.user.username}><MessageText className={user.username === message.user.username ? 'own' : 'not-own'}>{message.message}</MessageText></Message>
        : <MyMessage key={message.message} msg={message} currentUser={user.username} />))}
    </Container>
    <Container className="message-text-container">
      <InputGroup className="mb-3">
        <FormControl
          className="message-input"
          placeholder="Text a message"
          value={currentMsg}
          maxLength="70"
          onChange={(ev) => handleFormChange(ev)}
        />
        <InputGroup.Append>
          <Button animated onClick={(e) => handleSendMessage(e)} disabled={currentMsg === ''}>
            <Button.Content visible>Send</Button.Content>
            <Button.Content hidden>
              <Icon name="send" />
            </Button.Content>
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Container>
  </>

);

export default MessageList;
