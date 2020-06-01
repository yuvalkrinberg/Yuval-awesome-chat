const express = require('express');

const app = express();

server = app.listen(8080, () => {
  console.log('server is running on port 8080');
});

const stringSimilarity = require('string-similarity');
const socket = require('socket.io');

io = socket(server);
const connList = [{ username: 'Awesome chat bot', avatar: 'https://res.cloudinary.com/dgmvbx86i/image/upload/v1590862799/hv2xfc43iwt2eyqx9rq8_nxfjhe.png', id: '123' }];
const msgList = [];
const stringToAdd = [
  'Oh, That`s an easy one, ',
  'Don`t you already know it? ',
  'Let me tell you the answer',
  'The answer to life the universe and everything is 42, but only for this one the answer is ',
  'Oh, That`s an easy one, ',
  'Don`t you already know it? ',
  'Let me tell you the answer',
  'The answer to life the universe and everything is 42, but only for this one the answer is ',
  'The answer to life the universe and everything is 42, but only for this one the answer is ',
  'Easy peasy - ',
]

io.on('connection', (socket) => {
  console.log(socket.id.toString());
  socket.on('SEND_USER_DETAILS', (newUser) => {
    const user = { username: newUser.username, avatar: newUser.avatar, id: socket.id.toString() };
    connList.push(user); // add the new user to the list
    io.emit('CONNECTIONS_CHANGE', connList); // update the list to all the clients
  });
  socket.on('SEND_MSG', (msg) => {
    io.emit('RECEIVE_MSG', msg);
    if (msg.message.slice(-1) === '?') {
      const indexOfMessage = msgList.findIndex((m) => stringSimilarity.compareTwoStrings(m, msg.message) > 0.6); // Searching if that msg was already asked
      if (indexOfMessage !== -1) {
        const time = new Date().toLocaleTimeString();
        const botAnswer = `${stringToAdd[Math.floor(Math.random() * 10)]}${msgList[indexOfMessage + 1]}`;
        const serverMsg = { message: botAnswer, time, user: connList[0] };
        io.emit('RECEIVE_MSG', serverMsg); // Spread the msg for all clients
      }
    }
    msgList.push(msg.message);
  });
  socket.on('disconnect', () => {
    const indexToDelete = connList.findIndex((client) => client.id === socket.id.toString());
    if (indexToDelete !== -1) {
      // Update everyone that the client left
      const time = new Date().toLocaleTimeString();
      const { username } = connList[indexToDelete];
      const msg = { message: `${username} has left the chat`, time, user: { username: '', avatar: '' } };
      io.emit('RECEIVE_MSG', msg);
      // Remove the client from the list
      connList.splice(indexToDelete, 1);
      io.emit('CONNECTIONS_CHANGE', connList);
    }
  });
});
