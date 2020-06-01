import React from 'react';
import { Image } from 'react-bootstrap';

const ClientItem = ({ client, currentUser }) => (
  <>
    <Image
      className="part-image"
      roundedCircle
      src={client.avatar}
    />
    {(currentUser.username === client.username) ? `${currentUser.username} (You)` : client.username}
  </>
);

export default ClientItem;
