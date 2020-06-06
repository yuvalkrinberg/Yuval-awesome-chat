import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Container } from 'react-bootstrap';
import MyModal from './MyModal';
import MessageList from './MessageList';
import ConnectionsList from './ConnectionsList';

const socket = io('localhost:8080');

const Chat = () => {
  const [currentMsg, setCurrentMsg] = useState('');
  const [msgHistory, setMsgHistory] = useState([]);
  const [user, setUser] = useState({ username: '', avatar: '' });
  const [showModal, setShowModal] = useState(true);
  const [clientsList, setClientsList] = useState([]);

  useEffect(() => {
    socket.on('CONNECTIONS_CHANGE', (connectedClients) => {
      setClientsList(connectedClients);
    });
    socket.on('RECEIVE_MSG', (newMsg) => {
      setMsgHistory((prev) => [...prev, newMsg]);
    });
    document.title = 'Awesome Chat';
    return () => socket.close();
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    const time = new Date().toLocaleTimeString();
    socket.emit('SEND_MSG', { message: currentMsg, time, user });
    setCurrentMsg('');
  };

  const handleCloseModal = (newUser) => {
    setShowModal(false);
    setUser(newUser);
    socket.emit('SEND_USER_DETAILS', newUser);
  };

  const handleFormChange = (ev) => {
    setCurrentMsg(ev.target.value);
  };

  return (
    <Container className="main-page">
      <Container className="main-container">
        <Container className="connections-list-container">
          <ConnectionsList currentUser={user} connList={clientsList} />
        </Container>
        <Container className="inner-container">
          <MessageList
            msgHistory={msgHistory}
            user={user}
            currentMsg={currentMsg}
            handleFormChange={handleFormChange}
            handleSendMessage={sendMessage}
          />
        </Container>
      </Container>
      <MyModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        clientsNames={clientsList}
      />
    </Container>
  );
};

export default Chat;
