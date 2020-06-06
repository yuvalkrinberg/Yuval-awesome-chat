import {
  FormControl,
  InputGroup,
  Button,
  Modal,
  ButtonGroup,
  ToggleButton,
  Image,
  Row,
  Col,
  Container,
  Alert,
} from 'react-bootstrap';
import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import avatars from '../utilities/avatars';

const MyModal = ({ showModal, handleCloseModal, clientsNames }) => {
  const [showAlert, setShowAlert] = useState(false);
  let avatarUrl = 0;
  let holder = '';

  const handleChange = (ev) => {
    ev.preventDefault();
    holder = ev.target.value;
  };

  const handleSubmit = () => {
    const isNameExists = clientsNames.find((c) => c.username === holder);
    if (isNameExists || holder === '') {
      setShowAlert(true);
    } else {
      const newUser = { username: holder, avatar: avatars[avatarUrl] };
      handleCloseModal(newUser);
    }
  };

  const handleAvatar = (event) => {
    avatarUrl = event.target.value
  };

  return (
    <Modal show={showModal} animation>
      <Modal.Header>
        <Modal.Title className="modal-title">Come chat with us</Modal.Title>
      </Modal.Header>
      <hr />
      <Modal.Body>
        <Container>
          <Row>
            <label><hr />Enter your name</label>
          </Row>
          <Row>
            <InputGroup className="user-form">
              <FormControl
                className="user-form"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={holder.value}
                onChange={(ev) => (handleChange(ev))}
              />
            </InputGroup>
          </Row>
          <Row>
            <Alert className="no-name" show={showAlert}><Icon name="x" />Choose other username</Alert>
          </Row>
          <Row>
            <label><hr />Choose the avatar you like</label>
          </Row>
          <Row>
            <ButtonGroup toggle onChange={(e) => handleAvatar(e)}>
              {avatars.slice(1).map((avatar, i) => (
                <Col xs={2} md={2} key={avatars[i + 1]}>
                  <ToggleButton className="avatar-button" type="radio" defaultChecked value={i + 1}>
                    <Image src={avatars[i + 1]} rounded fluid />
                  </ToggleButton>
                </Col>
              ))}
            </ButtonGroup>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button className="start-button" variant="primary" onClick={handleSubmit}>
          <Icon className="msg-icon" name="chat" />Let`s start talking!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;
