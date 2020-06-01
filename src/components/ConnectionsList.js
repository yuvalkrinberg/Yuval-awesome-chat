import React from 'react';
import ClientItem from './ClientItem';

const ConnectionsList = ({ connList, currentUser }) => {
  if (connList.length !== 0) {
    return (
      <>
        <h2 className="connections">Participants</h2>
        <ul className="participants">
          {connList.map((client) => <li key={client.user}><ClientItem client={client} currentUser={currentUser} /></li>)}
        </ul>
      </>
    );
  }
  return <></>;
};

export default ConnectionsList;
