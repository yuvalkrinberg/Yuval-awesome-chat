import React from 'react';
import { Avatar, Message, MessageText } from '@livechat/ui-kit';

const MyMessage = ({ msg, currentUser }) => {
  const { user, message, time } = msg;

  return (
    (user.username === '')
      ? <div className="user-left">{message}</div>
      : (
        <>
          <Message isOwn={user.username === currentUser} authorName={user.username} date={time}>
            <Avatar imgUrl={user.avatar} />
            <MessageText className={user.username === currentUser ? 'own' : 'not-own'}>{message}</MessageText>
          </Message>
        </>
      )
  );
};

export default MyMessage;
