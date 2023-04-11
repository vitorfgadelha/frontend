import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewParticipantForm from "./NewParticipantForm";

class NewParticipantModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    const create = this.props.create;

    var title = "Editar Participante";
    var button = <Button onClick={this.toggle}>Editar</Button>;
    if (create) {
      title = "Criar novo participante";

      button = (
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
        >
          Criar Novo Participante
        </Button>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewParticipantForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              participant={this.props.participant}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewParticipantModal;