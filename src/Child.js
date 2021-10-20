import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Child(props){
      return (
        <div>
          <Modal show={props.show} onHide={props.parentAction} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body >Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.parentAction}>
                Close
              </Button>
              <Button variant="primary" onClick={props.parentAction}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );

  }
